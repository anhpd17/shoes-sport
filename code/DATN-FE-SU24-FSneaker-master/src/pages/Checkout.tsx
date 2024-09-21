import instance from '@/core/api'
import { useLocalStorage } from '@/hooks/useStorage'
import { store } from '@/store/store'
import { Icon } from '@iconify/react'
import classNames from 'classnames'
import React, { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { itemsActions } from '@/store/slices/cartSlice'
import { log } from 'console'
import { useSelector } from 'react-redux'

type Inputs = {
    address: string
    phone: string
    paymentMethod: 'cod' | 'vnpay'
    name: string
}

interface CartItem {
    idCart: string
    nameProduct: string
    price: number
    promotionalPrice: number
    totalQuantity: number
    size: number
    totalPrice: number
    imageProduct: string
    productId: string
    sizeId: string
    productDetailId?: string
    importPrice: number
}

interface ICreateOrderBody {
    address: string
    user_id: string
    phone: string
    productDetails: {
        productId: string
        price: number
        quantityOrders: number
        sizeId: string
        image: string
        sizeName: string
        productDetailId?: string
        productName: string
        promotionalPrice: number
        importPrice: number
    }[]
    name: string
    // total_price: number
    paymentMethod?: 'cod' | 'vnpay'
    codeOrders: string
}

const getUserID = (): string => {
    const storedUser = localStorage.getItem('user')
    const user = storedUser ? JSON.parse(storedUser) : {}
    const userID = user?._id || ''
    return userID
}

const Checkout = () => {
    const items = useSelector((state) => state.itemsSelected) // Select data from counter slice
    const [user] = useLocalStorage('user', null)
    const navigate = useNavigate()
    const [step, setStep] = useState<'CHECKOUT' | 'PAYMENT'>('CHECKOUT')
    const [cartList, setCartList] = useState<CartItem[]>([])
    const queryParams = new URLSearchParams(location.search)
    const transactionStatus = queryParams.get('vnp_TransactionStatus')
    const txnRef = queryParams.get('vnp_TxnRef')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>()

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        reset({
            name: user?.fullName,
            address: user?.address,
            phone: user?.tel
        })
    }, [user])

    const totalPrice = useMemo(() => {
        const totalPrice = cartList?.reduce((total, item) => {
            return (total += item.promotionalPrice * item.totalQuantity)
        }, 0)

        return totalPrice
    }, [cartList?.length])

    const convertCart = () => {
        const data = cartList.map((item) => {
            return {
                productId: item.productId,
                price: item.price,
                quantityOrders: item.totalQuantity,
                sizeId: item.sizeId,
                image: item.imageProduct,
                sizeName: `${item.size}`,
                productDetailId: item.productDetailId,
                productName: item.nameProduct,
                promotionalPrice: item.promotionalPrice,
                importPrice: item.importPrice
            }
        })
        return data
    }

    useEffect(() => {
        if (transactionStatus === '00') {
            // toast.success("Thanh toán thành công")
            // window.location.href = '/';
            const dataLocal = JSON.parse(localStorage.getItem('dataFormSelf')!)
            instance
                .post('http://localhost:8000/api/order/create-order', {
                    name: dataLocal.name,
                    address: dataLocal.address,
                    phone: dataLocal.phone,
                    user_id: getUserID(),
                    productDetails: dataLocal.productDetails,
                    codeOrders: txnRef,
                    paymentMethod: 'vnpay',
                    paymentStatus: 'unpaid'
                })
                .then(() => {
                    console.log('RUNNING HERE')
                    localStorage.removeItem('dataFormSelf')
                    // toast.success('Đặt hàng thành công')
                    setTimeout(() => {
                        window.location.href = 'http://localhost:5173/payment-success'
                    }, 1000)
                })
                .catch((error) => {
                    console.error('Error creating order:', error)
                    toast.error('Sản phẩm đã hết size của bạn!')
                })
        }
    }, [transactionStatus])

    const fetchData = async () => {
        // const response = await instance.get(`api/cart/${getUserID()}`)
        // Thay vì gọi API getAll cart thì lấy các sản phẩm được chọn trong store ra

        console.log(items)
        setCartList(items)
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (step === 'CHECKOUT') {
            setStep('PAYMENT')
            return
        }

        if (data.paymentMethod === 'vnpay') {
            try {
                localStorage.setItem(
                    'dataFormSelf',
                    JSON.stringify({
                        name: data.name,
                        address: data.address,
                        phone: data.phone,
                        productDetails: convertCart(),
                        total_price: totalPrice
                    })
                )
                const { data: response } = await instance.post(
                    'api/order/create-order-vnpay',
                    {
                        user_id: getUserID(),
                        total_price: totalPrice
                    },
                    {
                        withCredentials: true // Đảm bảo thông tin đăng nhập được bao gồm trong yêu cầu
                    }
                )
                window.location.href = response.url // Redirect to the VNPAY URL
            } catch (error) {
                console.log('run herere ')
                // console.error('Error creating payment URL:', error)
            }
        } else {
            handleCreateOrder({
                phone: data.phone,
                address: data.address,
                user_id: getUserID(),
                productDetails: convertCart(),
                name: data.name,
                paymentMethod: 'cod',
                codeOrders: ''
                // total_price: totalPrice
            })
        }
    }

    const handleCreateOrder = async (data: ICreateOrderBody) => {
        try {
            await instance.post('/api/order/create-order', data)
            navigate('/payment-success')
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message
                // Trích xuất thông tin sản phẩm từ payload
                const productDetail = data.productDetails.find(
                    (detail) => detail.productDetailId === errorMessage.match(/ID (\w+)/)[1]
                )
                if (productDetail) {
                    toast.error(
                        `Đặt hàng không thành công do sản phẩm "${productDetail.productName}" size "${productDetail.sizeName}" đã hết!`
                    )
                } else {
                    toast.error('Sản phẩm đã hết size của bạn!')
                }
            } else {
                toast.error('Sản phẩm đã hết size của bạn!')
            }
        }
    }

    return (
        <div className='my-[50px]'>
            <div className='max-w-screen-xl m-auto text-[20px]'>
                <div className='cart grid grid-cols-4 gap-5 my-5 mx-0'>
                    <div className='cart__content col-span-2'>
                        <div className='nav__link flex items-center gap-2 text-[18px]'>
                            <a href='' className='flex items-center gap-2'>
                                Giỏ hàng
                                <Icon className='text-gray-400 text-[18px]' icon='mingcute:right-line' />
                            </a>
                            <p
                                className={classNames('flex items-center gap-2', {
                                    'text-sky-500': step === 'CHECKOUT'
                                })}
                            >
                                Thông tin giao hàng
                                <Icon className='text-gray-400 text-[18px]' icon='mingcute:right-line' />
                            </p>
                            <p
                                className={classNames('flex items-center', {
                                    'text-gray-400': step === 'CHECKOUT',
                                    'text-sky-500': step === 'PAYMENT'
                                })}
                            >
                                Phương thức thanh toán
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div
                                className={classNames({
                                    hidden: step === 'PAYMENT'
                                })}
                            >
                                <h2 className='my-4 text-[20px] font-normal'>Thông tin giao hàng</h2>
                                <div className='pay__info'>
                                    <div className='flex items-center gap-4 mb-8'>
                                        <div className='img__pay w-[80px] h-[80px] rounded-md overflow-hidden'>
                                            <img src='https://picsum.photos/200/300' alt='' />
                                        </div>
                                        <div className='info__profile'>
                                            <p className='text-gray-600 text-[18px] flex gap-1'>
                                                <span>{user.fullName}</span>
                                                <span>({user.email})</span>
                                            </p>
                                            <button className='text-sky-600 text-[16px]'>Đăng xuất</button>
                                        </div>
                                    </div>

                                    <div className='form__profile'>
                                        <div>
                                            <div className='mb-5'>
                                                <div className='relative z-0 w-full group border rounded'>
                                                    <input
                                                        type='text'
                                                        className='block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                                        placeholder=''
                                                        {...register('name', {
                                                            required: 'Vui lòng nhập họ tên'
                                                        })}
                                                    />
                                                    <label className='peer-focus:font-medium absolute  px-3 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white'>
                                                        Tên người nhận
                                                    </label>
                                                </div>
                                                {errors?.name?.message && (
                                                    <p className='text-red-500 text-sm mb-3 mt-1'>
                                                        {errors?.name?.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div className='mb-5'>
                                                <div className='relative z-0 w-full group border rounded'>
                                                    <input
                                                        type='text'
                                                        className='block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                                        placeholder=''
                                                        {...register('phone', {
                                                            required: 'Vui lòng nhập số điện thoại',
                                                            pattern: {
                                                                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                                                                message: 'Số điện thoại không đúng định dạng'
                                                            }
                                                        })}
                                                    />
                                                    <label className='peer-focus:font-medium absolute px-3 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white'>
                                                        Số điện thoại
                                                    </label>
                                                </div>
                                                {errors?.phone?.message && (
                                                    <p className='text-red-500 text-sm mb-3 mt-1'>
                                                        {errors?.phone?.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div className='mb-5'>
                                                <div className='relative z-0 w-full group border rounded'>
                                                    <input
                                                        type='text'
                                                        className='block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                                        placeholder=''
                                                        {...register('address', {
                                                            required: 'Vui lòng nhập địa chỉ'
                                                        })}
                                                    />
                                                    <label className='peer-focus:font-medium absolute px-3 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white'>
                                                        Địa chỉ
                                                    </label>
                                                </div>
                                                {errors?.address?.message && (
                                                    <p className='text-red-500 text-sm mb-3 mt-1'>
                                                        {errors?.address?.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div className='pay__router flex justify-between items-center mt-4'>
                                                <Link to='/cart' className='text-sky-600 text-[18px]'>
                                                    Giỏ hàng
                                                </Link>
                                                <button
                                                    className={classNames(
                                                        'text-white bg-sky-700 px-5 py-3 rounded text-[18px]'
                                                    )}
                                                >
                                                    Tiếp tục đến phương thức thanh toán
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className='mt-[50px]' />
                                <p className=' text-center text-[18px] text-gray-500 mt-3'>Powered by Haravan</p>
                            </div>

                            <div
                                className={classNames({
                                    hidden: step === 'CHECKOUT'
                                })}
                            >
                                <h2 className='mt-8 mb-5 text-[20px] font-normal'>Phương thức thanh toán</h2>
                                <div className='py-4 border-2 border-solid rounded '>
                                    <div className='flex items-center gap-2 pb-4 pl-4'>
                                        <input
                                            value={'cod'}
                                            type='radio'
                                            defaultChecked
                                            // onChange={(e) => {
                                            //     setPaymentMethod(e.target.value as 'cod')
                                            // }}
                                            {...register('paymentMethod')}
                                        />
                                        <img
                                            src='https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6'
                                            alt=''
                                        />
                                        <p className='text-gray-500 text-[18px]'>Thanh toán khi giao hàng (COD)</p>
                                    </div>
                                    <hr />
                                    <div className='flex items-center gap-2 pt-4 pl-4'>
                                        <input
                                            type='radio'
                                            {...register('paymentMethod')}
                                            value={'vnpay'}
                                            // onChange={(e) => {
                                            //     setPaymentMethod(e.target.value as 'vnpay')
                                            // }}
                                        />
                                        <img
                                            src='https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=6'
                                            alt=''
                                        />
                                        <p className='text-gray-500 text-[18px]'>Chuyển khoản ngân hàng</p>
                                    </div>
                                </div>

                                <div className='pay__info'>
                                    <div className='form__profile'>
                                        <div className='flex items-center justify-between mt-4 pay__router'>
                                            <Link to='/cart' className='text-sky-600 text-[18px]'>
                                                Giỏ hàng
                                            </Link>
                                            <button
                                                type='submit'
                                                className='text-white bg-sky-700 px-5 py-3 rounded text-[18px]'
                                            >
                                                Hoàn tất đơn hàng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr className='mt-[50px]' />
                                <p className=' text-center text-[18px] text-gray-500 mt-3'>Powered by Haravan</p>
                            </div>
                        </form>
                    </div>

                    <div className='cart__info border-l border-slate-400 col-span-2 '>
                        {cartList?.map((it, index) => (
                            <div className='desc flex gap-4 items-center ml-8 relative mb-6' key={index}>
                                <div className='oder--item-img w-[100px] h-[100px] overflow-hidden'>
                                    <img src={it.imageProduct} alt='' className='imgfluid rounded-lg' />
                                    <p className='absolute bottom-[80px] left-[80px] bg-gray-200 border border-solid border-slate-400 rounded-full flex justify-center text-[16px] px-3 py-1'>
                                        {it.totalQuantity}
                                    </p>
                                </div>
                                <div className='item-desc-inf flex justify-between items-center gap-8 flex-1'>
                                    <div>
                                        <p className='desc-inf-title text-[15px]'>{it.nameProduct}</p>
                                        <p className='mb-4 text-[16px] font-normal text-gray-500'>{it.size}</p>
                                    </div>
                                    <p className='text-gray-600 font-medium text-[16px] ml-auto'>
                                        {(it.promotionalPrice * it.totalQuantity).toLocaleString()}₫
                                    </p>
                                </div>
                            </div>
                        ))}

                        <hr className='mt-4 border-dashed mx-4' />
                        <div className='pay__provisional mx-4 mt-4'>
                            <div className='payy__provisional--money flex justify-between mb-3'>
                                <p className='text-[18px] text-gray-500'>Tạm tính</p>
                                <p className='text-[18px] text-gray-500'>{totalPrice.toLocaleString()}₫</p>
                            </div>
                            <div className='payy__provisional--transport flex justify-between'>
                                <p className='text-[18px] text-gray-500'>Phí vận chuyển</p>
                                <p className='text-[18px] text-gray-500'>
                                    <Icon icon='bi:dash' />
                                </p>
                            </div>
                        </div>
                        <hr className='mt-4 border-dashed mx-4' />
                        <div className='payy__provisional--total flex justify-between mx-4 mt-4'>
                            <p className='text-[18px] text-gray-500'>Tổng cộng</p>
                            <p>
                                <span className='text-[16px] text-gray-500 mr-2'></span> {totalPrice.toLocaleString()}₫
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
