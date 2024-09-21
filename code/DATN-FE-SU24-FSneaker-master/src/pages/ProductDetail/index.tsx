import BreadCrumb, { IBreadCrumb } from '@/components/breadcrumb'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carosel'
import ProductItem from '@/features/product/_components/product-item'
import { cn, onMutateError } from '@/lib/utils'
import { FacebookIcon, MessageCircleIcon, MinusIcon, PlusIcon, TwitterIcon, Zap } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import ProductComment from './ProductComment'
import ProductDescription from './ProductDescription'
import Pagination from '@/components/ui/pagination'
import { useQuery } from 'react-query'
import { getInfoProductById, getProductDetailById, getRelatedProductsInfo } from '@/services/product/request'
import { IProduct, IProductSize } from '@/services/product/types'
import instance from '@/core/api'
import { useDispatch } from 'react-redux'
import { updateCartQuantityStore } from '../../store/actions'
import { cartActions } from '@/store/slices/cartSlice'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { useProductFavoriteMutation, useProductFavoriteQuery } from '@/hooks/useProductFavorite'
import { message } from 'antd'
import { toast } from 'react-toastify'
import { Rate } from 'antd'

const ProductDetail = () => {
    const { data: favoriteProduct, refetch } = useProductFavoriteQuery()

    const { mutate: onFavorite } = useProductFavoriteMutation({
        action: 'ADD',
        onSuccess: () => {
            message.success('Đã thêm SP vào danh sách yêu thích')
            refetch()
        }
    })

    const { mutate: onRemoveFavorite } = useProductFavoriteMutation({
        action: 'DELETE',
        onSuccess: () => {
            message.success('Đã xoá SP khỏi danh sách yêu thích')
            refetch()
        }
    })

    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState(0)
    const [variant, setVariant] = useState<IProductSize | undefined>()

    const { id: productId, detail: detailID } = useParams()

    const isFavorite = useMemo(() => {
        return favoriteProduct?.data.find((it) => it.productId === productId)
    }, [productId, favoriteProduct?.data])

    const onToggleFavorite = () => {
        if (!getUserID()) {
            message.info('Vui lòng đăng nhập tài khoản!')
            return
        }

        if (isFavorite) {
            onRemoveFavorite(productId)
        } else {
            onFavorite(productId)
        }
    }

    const { data: infoProduct, refetch: refetchProductDetail } = useQuery({
        queryFn: () => getInfoProductById(String(productId)),
        enabled: !!productId,
        onError: onMutateError
    })

    const { data: relatedProducts, refetch: refetchProductRelated } = useQuery({
        queryFn: () => getRelatedProductsInfo(String(productId)),
        enabled: !!productId,
        queryKey: ['/productDetail/related', detailID],
        onError: onMutateError
    })
    const { data: productDetail } = useQuery({
        queryFn: () => getProductDetailById(String(detailID)),
        queryKey: ['/productDetail', detailID],
        enabled: !!detailID,
        onError: onMutateError
    })

    useEffect(() => {
        refetchProductDetail()
        refetchProductRelated()
    }, [productId])

    const getUserID = () => {
        const storedUser = localStorage.getItem('user')
        const user = storedUser ? JSON.parse(storedUser) : {}
        const userID = user?._id || ''
        return userID
    }
    const addToCart = (quantity: number) => {
        console.log(variant)
        const fetchData = async (dataX: any) => {
            try {
                await instance.post(`api/cart`, dataX)

                variant?.productDetailId && dispatch(cartActions.addToCart(variant?.productDetailId))
                toast.success('Thêm sản phẩm vào giỏ hàng thành công')
            } catch (error) {
                console.log(error)
                toast.error('Số lượng yêu cầu vượt quá số lượng trong kho')
            }
        }
        fetchData({
            idUser: getUserID(), //id user
            productDetailId: variant?.productDetailId, // productDetailId khi getAllProductDetail
            quantity: quantity
        })
    }
    const breadcrumb: IBreadCrumb[] = [
        {
            title: infoProduct?.data?.nameCategory,
            link: '/'
        },
        {
            title: infoProduct?.data?.nameProduct || ''
        }
    ]
    const tabs = ['Mô Tả Sản Phẩm', 'Đánh Giá - Nhận Xét Từ Khách Hàng']
    useEffect(() => {
        if (!infoProduct) return
        let isSetVariant = false
        for (let index = 0; index < infoProduct?.data?.productDetails.length; index++) {
            const element = infoProduct?.data?.productDetails[index]
            if (element.quantity > 0) {
                setVariant(element)
                isSetVariant = true
                break
            }
        }
        if (!isSetVariant) {
            setVariant(undefined)
        }
    }, [infoProduct])
    return (
        <div className='pb-10'>
            <BreadCrumb links={breadcrumb} />
            <div className='app-container text-[#333]'>
                <div className='flex flex-col md:flex-row'>
                    <div className='flex-1 img-product-container relative group py-5 px-3'>
                        <Carousel>
                            <CarouselContent>
                                {infoProduct?.data?.images?.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <img src={image.imageUrl} alt='product' />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                    <div className='w-full md:w-[64%] py-5 px-3 border-l border-neutral-200 flex flex-col lg:flex-row gap-5'>
                        <div className='flex-1'>
                            <h1 className='text-2xl font-semibold'>{infoProduct?.data?.nameProduct}</h1>
                            <div className='mt-1 mb-5 text-sm'>
                                <span>Tình trạng: {variant?.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}</span>
                                <span className='mx-2 text-neutral-200'>|</span>
                                <span>Thương hiệu: {infoProduct?.data?.nameCategory}</span>
                            </div>
                            <Rate allowHalf className='mb-2' disabled value={Number.parseFloat(infoProduct?.data?.averageRating)} />
                            <div className='p-4 bg-neutral-50 rounded-md flex items-center'>
                                <span className='w-[120px]'>Giá:</span>
                                <span className='text-red-500 font-medium text-xl mr-2'>
                                    {variant?.promotionalPrice.toLocaleString() ||
                                        infoProduct?.data?.productDetails[0].promotionalPrice.toLocaleString()}
                                    ₫
                                </span>
                                <span className='line-through text-neutral-500 mr-4'>
                                    {variant?.price.toLocaleString() ||
                                        infoProduct?.data?.productDetails[0].price.toLocaleString()}
                                    ₫
                                </span>
                                {/* <span className='text-xs p-1 bg-red-500 rounded-lg inline-flex item-center gap-1 text-white items-center w-fit'>
                                    <Zap size={10} />
                                    -53%
                                </span> */}
                            </div>
                            <div className='flex items-center justify-center mt-5'>
                                <span className='w-[120px]'>Kích thước:</span>
                                <div className='flex-1 flex flex-wrap gap-2'>
                                    {infoProduct?.data &&
                                        infoProduct?.data?.productDetails &&
                                        infoProduct?.data?.productDetails
                                            ?.filter(
                                                (size: any, index: any, self: any) =>
                                                    index === self.findIndex((t) => t.size === size.size)
                                            )
                                            .sort((a, b) => a.size - b.size)
                                            .map((size, index) => {
                                                return (
                                                    <span
                                                        className={cn(
                                                            'inline-block bg-neutral-50 px-5 text-sm py-2 rounded-md cursor-pointer border border-neutral-300 relative',
                                                            variant?.sizeId === size.sizeId && 'item-sale',
                                                            size.quantity == 0 && 'size-disabled'
                                                        )}
                                                        key={index}
                                                        onClick={() => {
                                                            if (size.quantity > 0) {
                                                                setVariant(size)
                                                            }
                                                        }}
                                                    >
                                                        {size.size}
                                                    </span>
                                                )
                                            })}

                                    {!infoProduct?.data?.productDetails && (
                                        <p className='text-sm text-sky-500 font-semibold'>
                                            Chưa có thông tin kích thước cho sản phẩm này !
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className='flex items-center justify-between mt-5'>
                                <div className='flex items-center'>
                                    <span className='w-[120px]'>Số lượng:</span>
                                    <div
                                        className='w-10 h-10 group border border-neutral-200 bg-neutral-100 cursor-pointer flex items-center justify-center'
                                        onClick={() => setQuantity(quantity == 1 ? 1 : quantity - 1)}
                                    >
                                        <MinusIcon className='size-10 text-neutral-400 group-hover:text-neutral-800' />
                                    </div>
                                    <input
                                        type='number'
                                        value={quantity}
                                        id='quantity-detail'
                                        min={1}
                                        defaultValue={quantity}
                                        max={variant?.quantity}
                                        className='w-10 h-10 text-center'
                                        onChange={(event) => {
                                            if (Number.parseInt(event.target.value) > variant?.quantity) {
                                                toast.error('Vượt quá số lượng còn lại của sản phẩm')
                                                return
                                            }
                                            setQuantity(Number.parseInt(event.target.value))
                                        }}
                                    />
                                    {/* <div className='w-10 h-10 border border-neutral-200 bg-white cursor-pointer flex items-center justify-center text-sm'>
                                        {quantity}
                                    </div> */}
                                    <div
                                        className='w-10 h-10 group border border-neutral-200 bg-neutral-100 cursor-pointer flex items-center justify-center'
                                        onClick={() =>
                                            setQuantity((prev) => {
                                                if (prev < variant?.quantity) {
                                                    return prev + 1
                                                }
                                                toast.error('Không được vượt quá số lượng sản phẩm đang có')
                                                return prev
                                            })
                                        }
                                    >
                                        <PlusIcon className='text-sm size-5 text-neutral-400 group-hover:text-neutral-800' />
                                    </div>
                                    <p className='text-red-500 ml-5'>Còn {variant?.quantity || 0} sản phẩm</p>
                                </div>

                                <div
                                    onClick={onToggleFavorite}
                                    className='cursor-pointer text-black inline-block h-auto text-2xl group-hover:opacity-100 transition'
                                >
                                    {isFavorite ? <HeartFilled className='text-red-500' /> : <HeartOutlined />}
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-x-4 mt-5'>
                                <button
                                    onClick={() => addToCart(quantity)}
                                    className='px-7 py-3 border border-red-500 text-red-500 bg-white outline-none hover:bg-red-500 hover:text-white transition-all rounded-md w-full'
                                >
                                    THÊM VÀO GIỎ
                                </button>
                                <Link
                                    to={`/checkout-now/${variant?.productDetailId}?sizeId=${variant?.sizeId}&quantity=${quantity}`}
                                >
                                    <button className='px-7 py-3 border border-red-500 text-white bg-red-500 outline-none hover:opacity-90 transition-all rounded-md w-full'>
                                        MUA NGAY
                                    </button>
                                </Link>
                            </div>
                            {/* ẨN khuyến mại */}
                            <div className='flex items-center justify-center mt-5 gap-2'>
                                <p className='px-6 py-2 text-gray-700 transition-all w-full text-sm italic '>
                                    * Bạn sẽ nhận được 1 đôi tất và 1 bình vệ sinh giày sau khi đặt hàng thành công
                                </p>
                            </div>
                            {/* Ẩn chia sẻ */}
                            {/* <div className='flex items-center justify-center mt-5 gap-2'>
                                <span className='mr-4'>Chia sẻ:</span>
                                <div className='flex-1 flex space-x-4'>
                                    <Link
                                        to='/'
                                        className='hover:opacity-90 w-8 h-8 bg-blue-600 rounded-full p-1 text-white'
                                    >
                                        <FacebookIcon className='size-6' />
                                    </Link>
                                    <Link
                                        to='/'
                                        className='hover:opacity-90 mx-4 w-8 h-8 bg-blue-700 rounded-full p-1 text-white'
                                    >
                                        <MessageCircleIcon className='size-6' />
                                    </Link>
                                    <Link
                                        to='/'
                                        className='hover:opacity-90 w-8 h-8 bg-sky-600 rounded-full p-1 text-white'
                                    >
                                        <TwitterIcon className='size-6' />
                                    </Link>
                                </div>
                            </div> */}
                        </div>
                        <div className='lg:w-[240px] w-full flex flex-col gap-2 md:pt-[70px] text-sm'>
                            <p className='font-bold text-[15px]'>Chính sách bán hàng</p>
                            <span className='flex items-center gap-2'>
                                <img src='/ship.webp' alt='' className='w-8 h-8' />
                                <p className='flex-1'>Miễn phí vận chuyển toàn quốc cho đơn hàng từ 1.000.000 vnđ</p>
                            </span>
                            <span className='flex items-center gap-2'>
                                <img src='/insurance.webp' alt='' className='w-8 h-8' />
                                <p className='flex-1'>Miễn phí bảo hành trọn đời</p>
                            </span>
                            <span className='flex items-center gap-2'>
                                <img src='/call.webp' alt='' className='w-8 h-8' />
                                <p className='flex-1'>Miễn phí đổi hàng</p>
                            </span>
                            <p className='my-2 font-bold text-[15px]'>Thông tin thêm</p>
                            <span className='flex items-center gap-2'>
                                <img src='/change.webp' alt='' className='w-8 h-8' />
                                <p className='flex-1'>Đổi hàng trong 30 ngày nếu không hài lòng</p>
                            </span>
                            <span className='flex items-center gap-2'>
                                <img src='/verify.webp' alt='' className='w-8 h-8' />
                                <p className='flex-1'>Nhận hàng thanh toán</p>
                            </span>
                            <span className='flex items-center gap-2'>
                                <img src='/payment.webp' alt='' className='w-8 h-8' />
                                <p className='flex-1'>Có cà thẻ visa/ master/ jcb</p>
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <ul className='w-full lg:w-fit flex border-b border-neutral-400 gap-2 mt-10 mb-5 overflow-auto'>
                        {tabs.map((tab, index) => {
                            return (
                                <li
                                    key={tab}
                                    className={twMerge(
                                        'cursor-pointer whitespace-nowrap text-neutral-400 p-3 w-fit text-lg font-semibold',
                                        activeTab == index && 'text-neutral-800 border-b border-neutral-800'
                                    )}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {tab}
                                </li>
                            )
                        })}
                    </ul>
                    {activeTab == 0 && <ProductDescription description={infoProduct?.data?.descript} />}
                    {activeTab == 1 && <ProductComment productID={productId} />}
                    {activeTab == 2 && (
                        <div className='text-sm'>
                            <p>1. Điều kiện đổi hàng</p> <br />
                            <p>
                                Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả lại hàng ngay
                                tại thời điểm giao/nhận hàng trong những trường hợp sau:
                            </p>
                            <p>
                                Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt. <br />
                                Không đủ số lượng, không đủ bộ như trong đơn hàng.
                                <br />
                                Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể vỡ…
                                <br />
                                Khách hàng vui lòng quay video mở gói hàng chứng minh sự thiếu sót trên để hoàn thành
                                việc hoàn trả/đổi trả hàng hóa khi đặt hàng online. Hoặc kiểm tra hàng kỹ trước khi
                                thanh toán tại quầy khi mua sắm trực tiếp tại cửa hàng.{' '}
                            </p>
                            <br /> <br />
                            <p>2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả</p> <br />
                            <p>
                                Thời gian thông báo đổi trả: trong vòng 48h kể từ khi nhận sản phẩm đối với trường hợp
                                sản phẩm thiếu phụ kiện, quà tặng hoặc bể vỡ. <br />
                                Thời gian gửi chuyển trả sản phẩm: trong vòng 07 ngày kể từ khi nhận sản phẩm. <br />
                                Địa điểm đổi trả sản phẩm: Khách hàng có thể mang hàng trực tiếp đến văn phòng/ cửa hàng
                                của chúng tôi hoặc chuyển qua đường bưu điện. <br />
                                Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất lượng
                                sản phẩm, Quý Khách hàng vui lòng liên hệ đường dây chăm sóc khách hàng của chúng tôi.
                            </p>
                        </div>
                    )}
                    {activeTab == 3 && (
                        <div>
                            <p>Chưa có thông tin</p>
                        </div>
                    )}
                    {activeTab == 4 && (
                        <div>
                            <Accordion type='single' collapsible>
                                <AccordionItem value='item-1'>
                                    <AccordionTrigger>
                                        Khách hàng cũ, khách đã từng mua hàng tại TheBasic.vn thì có được ưu đãi gì
                                        không?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Có. Với khách hàng đã từng mua hàng tại TheBasic.vn và có lưu thông tin trên hệ
                                        thống của chúng tôi: <br />
                                        - Được giảm ngay 50.000 vnđ khi mua hóa đơn từ 200.000 vnđ trở lên ( không áp
                                        dụng cho sản phẩm thanh lý, bỏ mẫu, mua 1 tặng 1 hay giảm từ 40%). <br />- Được
                                        MUA 1 TẶNG 1 toàn bộ sản phẩm trong tháng sinh nhật của khách ( áp dụng trên giá
                                        gốc của sản phẩm).
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <Accordion type='single' collapsible>
                                <AccordionItem value='item-1'>
                                    <AccordionTrigger>Làm sao để tôi đặt hàng online?</AccordionTrigger>
                                    <AccordionContent>
                                        Khách hàng vui lòng tham khảo chính sách đổi trả sản phẩm của TheBasic.vn để
                                        được cung cấp thông tin đầy đủ và chi tiết nhất.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <Accordion type='single' collapsible>
                                <AccordionItem value='item-1'>
                                    <AccordionTrigger>
                                        Khách hàng cũ, khách đã từng mua hàng tại TheBasic.vn thì có được ưu đãi gì
                                        không?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Có. Với khách hàng đã từng mua hàng tại TheBasic.vn và có lưu thông tin trên hệ
                                        thống của chúng tôi: <br />
                                        - Được giảm ngay 50.000 vnđ khi mua hóa đơn từ 200.000 vnđ trở lên ( không áp
                                        dụng cho sản phẩm thanh lý, bỏ mẫu, mua 1 tặng 1 hay giảm từ 40%). <br />- Được
                                        MUA 1 TẶNG 1 toàn bộ sản phẩm trong tháng sinh nhật của khách ( áp dụng trên giá
                                        gốc của sản phẩm).
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <Accordion type='single' collapsible>
                                <AccordionItem value='item-1'>
                                    <AccordionTrigger>
                                        Khách hàng cũ, khách đã từng mua hàng tại TheBasic.vn thì có được ưu đãi gì
                                        không?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Có. Với khách hàng đã từng mua hàng tại TheBasic.vn và có lưu thông tin trên hệ
                                        thống của chúng tôi: <br />
                                        - Được giảm ngay 50.000 vnđ khi mua hóa đơn từ 200.000 vnđ trở lên ( không áp
                                        dụng cho sản phẩm thanh lý, bỏ mẫu, mua 1 tặng 1 hay giảm từ 40%). <br />- Được
                                        MUA 1 TẶNG 1 toàn bộ sản phẩm trong tháng sinh nhật của khách ( áp dụng trên giá
                                        gốc của sản phẩm).
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <Accordion type='single' collapsible>
                                <AccordionItem value='item-1'>
                                    <AccordionTrigger>Làm sao để tôi đặt hàng online?</AccordionTrigger>
                                    <AccordionContent>
                                        Khách hàng vui lòng tham khảo chính sách đổi trả sản phẩm của TheBasic.vn để
                                        được cung cấp thông tin đầy đủ và chi tiết nhất.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <Accordion type='single' collapsible>
                                <AccordionItem value='item-1'>
                                    <AccordionTrigger>
                                        Khách hàng cũ, khách đã từng mua hàng tại TheBasic.vn thì có được ưu đãi gì
                                        không?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Có. Với khách hàng đã từng mua hàng tại TheBasic.vn và có lưu thông tin trên hệ
                                        thống của chúng tôi: <br />
                                        - Được giảm ngay 50.000 vnđ khi mua hóa đơn từ 200.000 vnđ trở lên ( không áp
                                        dụng cho sản phẩm thanh lý, bỏ mẫu, mua 1 tặng 1 hay giảm từ 40%). <br />- Được
                                        MUA 1 TẶNG 1 toàn bộ sản phẩm trong tháng sinh nhật của khách ( áp dụng trên giá
                                        gốc của sản phẩm).
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    )}
                </div>

                <div className='mt-20 md:mb-20 mb-10 px-10'>
                    <h2 className='text-4xl text-center font-bold mb-10'>Sản phẩm liên quan</h2>
                    <Carousel>
                        <CarouselContent className='-ml-2 md:-ml-4'>
                            {relatedProducts?.data?.map((item, index) => {
                                return (
                                    <CarouselItem
                                        key={index}
                                        className='basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/4 pl-2 md:pl-4'
                                    >
                                        <ProductItem
                                            IdImages={item.images.map((x) => x.imageUrl)}
                                            sizeId={item.productDetails.map((x) => x.size)}
                                            _id={item._id}
                                            name={item.name}
                                            price={item.productDetails[0].price}
                                            promotionalPrice={item.productDetails[0].promotionalPrice}
                                            ratingStar={Number.parseFloat(item.averageRating)}
                                        />
                                    </CarouselItem>
                                )
                            })}
                            {/* <CarouselItem className='basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4'>
                                <ProductItem />
                            </CarouselItem> */}
                        </CarouselContent>
                        <CarouselPrevious className='absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2' />
                        <CarouselNext className='absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2' />
                    </Carousel>

                    {/* <div className='mt-10'>
                        <Pagination currentPage={1} totalCount={40} pageSize={10} onPageChange={() => {}} />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
