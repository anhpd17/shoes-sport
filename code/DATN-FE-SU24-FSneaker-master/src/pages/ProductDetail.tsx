// import BreadCrumb, { IBreadCrumb } from '@/components/breadcrumb'
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carosel'
// import ProductItem from '@/features/product/_components/product-item'
// import { FacebookIcon, MinusIcon, PlusIcon, Zap } from 'lucide-react'
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { twMerge } from 'tailwind-merge'

// const ProductDetail = () => {
//     const [quantity, setQuantity] = useState(1)
//     const [activeTab, setActiveTab] = useState(0)
//     const breadcrumb: IBreadCrumb[] = [
//         {
//             title: 'Giày',
//             link: '/'
//         },
//         {
//             title: 'Giày Nike AF1 All Trắng'
//         }
//     ]
//     const tabs = ['Mô tả sản phẩm', 'Đánh Giá - Nhận Xét Từ Khách Hàng', 'Chính sách đổi trả', 'Chính sách bảo hành', 'Câu hỏi thường gặp']
//     return (
//         <div className='pb-10'>
//             <BreadCrumb links={breadcrumb} />
//             <div className='app-container text-[#333]'>
//                 <div className='flex flex-col md:flex-row'>
//                     <div className='flex-1'>
//                         <img
//                             src='https://product.hstatic.net/200000690551/product/af1_all_trang_14a353fa01e74fa1a9c1a41460705557_master.png'
//                             alt='product'
//                         />
//                     </div>
//                     <div className='w-full md:w-[64%] py-5 px-3 border-l border-neutral-200 flex flex-col lg:flex-row  gap-5'>
//                         <div className='flex-1'>
//                             <h1 className='text-2xl font-semibold'>Giày Nike AF1 All Trắng</h1>
//                             <div className='mt-1 mb-5 text-sm'>
//                                 <span>Tình trạng: Còn hàng</span>
//                                 <span className='mx-2 text-neutral-200'>|</span>
//                                 <span>Thương hiệu: Nike</span>
//                             </div>
//                             <div className='p-4 bg-neutral-50 rounded-md flex items-center'>
//                                 <span className='w-[120px]'>Giá:</span>
//                                 <span className='text-red-500 font-medium text-xl mr-2'>450,000₫</span>
//                                 <span className='line-through text-neutral-500 mr-4'>950,000₫</span>
//                                 <span className='text-xs p-1 bg-red-500 rounded-lg inline-flex item-center gap-1 text-white items-center w-fit'>
//                                     <Zap size={10} />
//                                     -53%
//                                 </span>
//                             </div>
//                             <div className='flex items-center justify-center mt-5'>
//                                 <span className='w-[120px]'>Kích thước:</span>
//                                 <div className='flex-1 flex flex-wrap gap-2'>
//                                     {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map((size) => {
//                                         return (
//                                             <span
//                                                 className='inline-block bg-neutral-50 px-5 text-sm py-2 rounded-md cursor-pointer border border-neutral-300'
//                                                 key={size}
//                                             >
//                                                 {size}
//                                             </span>
//                                         )
//                                     })}
//                                 </div>
//                             </div>
                            
//                             <div className='flex items-center justify-center mt-5'>
//                                 <span className='w-[120px]'>Số lượng:</span>
//                                 <div className='flex-1 flex'>
//                                     <div
//                                         className='w-10 h-10 group border border-neutral-200 bg-neutral-100 cursor-pointer flex items-center justify-center'
//                                         onClick={() => setQuantity(quantity == 1 ? 1 : quantity - 1)}
//                                     >
//                                         <MinusIcon className='size-10 text-neutral-400 group-hover:text-neutral-800' />
//                                     </div>
//                                     <div className='w-10 h-10 border border-neutral-200 bg-white cursor-pointer flex items-center justify-center text-sm'>
//                                         {quantity}
//                                     </div>
//                                     <div
//                                         className='w-10 h-10 group border border-neutral-200 bg-neutral-100 cursor-pointer flex items-center justify-center'
//                                         onClick={() => setQuantity((prev) => prev + 1)}
//                                     >
//                                         <PlusIcon className='text-sm size-5 text-neutral-400 group-hover:text-neutral-800' />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='flex items-center justify-center mt-5 gap-2'>
//                                 <button className='px-7 py-3 border border-red-500 text-red-500 bg-white outline-none hover:bg-red-500 hover:text-white transition-all rounded-md w-full'>
//                                     THÊM VÀO GIỎ
//                                 </button>
//                                 <button className='px-7 py-3 border border-red-500 text-white bg-red-500 outline-none hover:opacity-90 transition-all rounded-md w-full'>
//                                     MUA NGAY
//                                 </button>
//                             </div>
//                             <div className='flex items-center justify-center mt-5 gap-2'>
//                                 <button className='px-7 py-3 border border-neutral-800 text-white bg-neutral-800 outline-none hover:opacity-90 transition-all rounded-md w-full text-sm'>
//                                     CLICK VÀO ĐÂY ĐỂ NHẬN ƯU ĐÃI
//                                 </button>
//                             </div>
//                             <div className='flex items-center justify-center mt-5 gap-2'>
//                                 <span className='w-[120px]'>Chia sẻ:</span>
//                                 <div className='flex-1 flex'>
//                                     <Link to='/' className='w-8 h-8 bg-blue-600 rounded-full p-1 text-white'>
//                                         <FacebookIcon className='size-6' />
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className='lg:w-[240px] w-full flex flex-col gap-2 md:pt-[70px]'>
//                             <p className='font-bold text-[20px]'>Chính sách bán hàng</p>
//                             <span className='flex items-center gap-2'>
//                                 <img src='/ship.webp' alt='' className='w-8 h-8' />
//                                 <p className='flex-1'>
//                                     Miễn phí vận chuyển nội thành HCM cho đơn hàng từ 1.000.000 vnđ
//                                 </p>
//                             </span>
//                             <span className='flex items-center gap-2'>
//                                 <img src='/insurance.webp' alt='' className='w-8 h-8' />
//                                 <p className='flex-1'>Miễn phí bảo hành trọn đời</p>
//                             </span>
//                             <span className='flex items-center gap-2'>
//                                 <img src='/call.webp' alt='' className='w-8 h-8' />
//                                 <p className='flex-1'>Miễn phí đổi hàng</p>
//                             </span>
//                             <p className='font-bold text-[20px]'>Thông tin thêm</p>
//                             <span className='flex items-center gap-2'>
//                                 <img src='/change.webp' alt='' className='w-8 h-8' />
//                                 <p className='flex-1'>Đổi hàng trong 30 ngày nếu không hài lòng</p>
//                             </span>
//                             <span className='flex items-center gap-2'>
//                                 <img src='/verify.webp' alt='' className='w-8 h-8' />
//                                 <p className='flex-1'>Nhận hàng thanh toán</p>
//                             </span>
//                             <span className='flex items-center gap-2'>
//                                 <img src='/payment.webp' alt='' className='w-8 h-8' />
//                                 <p className='flex-1'>Có cà thẻ visa/ master/ jcb</p>
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div>
//                     <ul className='w-full lg:w-fit flex border-b border-neutral-400 gap-2 mt-10 mb-5 overflow-auto'>
//                         {tabs.map((tab, index) => {
//                             return (
//                                 <li
//                                     key={tab}
//                                     className={twMerge(
//                                         'cursor-pointer whitespace-nowrap text-neutral-400 p-3 w-fit text-lg font-semibold',
//                                         activeTab == index && 'text-neutral-800 border-b border-neutral-800'
//                                     )}
//                                     onClick={() => setActiveTab(index)}
//                                 >
//                                     {tab}
//                                 </li>
//                             )
//                         })}
//                     </ul>
//                     {activeTab == 0 && (
//                         <div>
//                             <p>Chưa có mô tả cho sản phẩm này</p>
//                         </div>
//                     )}
//                     {activeTab == 1 && (
//                         <div>
//                             <p>Chưa có nhận xét nào</p>
//                         </div>
//                     )}
//                     {activeTab == 2 && (
//                         <div className='text-sm'>
//                             <p>1. Điều kiện đổi hàng</p> <br />
//                             <p>
//                                 Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả lại hàng ngay
//                                 tại thời điểm giao/nhận hàng trong những trường hợp sau:
//                             </p>
//                             <p>
//                                 Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt. <br />
//                                 Không đủ số lượng, không đủ bộ như trong đơn hàng.
//                                 <br />
//                                 Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể vỡ…
//                                 <br />
//                                 Khách hàng vui lòng quay video mở gói hàng chứng minh sự thiếu sót trên để hoàn thành
//                                 việc hoàn trả/đổi trả hàng hóa khi đặt hàng online. Hoặc kiểm tra hàng kỹ trước khi
//                                 thanh toán tại quầy khi mua sắm trực tiếp tại cửa hàng.{' '}
//                             </p>
//                             <br /> <br />
//                             <p>2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả</p> <br />
//                             <p>
//                                 Thời gian thông báo đổi trả: trong vòng 48h kể từ khi nhận sản phẩm đối với trường hợp
//                                 sản phẩm thiếu phụ kiện, quà tặng hoặc bể vỡ. <br />
//                                 Thời gian gửi chuyển trả sản phẩm: trong vòng 07 ngày kể từ khi nhận sản phẩm. <br />
//                                 Địa điểm đổi trả sản phẩm: Khách hàng có thể mang hàng trực tiếp đến văn phòng/ cửa hàng
//                                 của chúng tôi hoặc chuyển qua đường bưu điện. <br />
//                                 Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất lượng
//                                 sản phẩm, Quý Khách hàng vui lòng liên hệ đường dây chăm sóc khách hàng của chúng tôi.
//                             </p>
//                         </div>
//                     )}
//                     {activeTab == 3 && (
//                         <div>
//                             <p>Chưa có thông tin</p>
//                         </div>
//                     )}
//                     {activeTab == 4 && (
//                         <div>
//                             <Accordion type='single' collapsible>
//                                 <AccordionItem value='item-1'>
//                                     <AccordionTrigger>
//                                         Khách hàng cũ, khách đã từng mua hàng tại TheBasic.vn thì có được ưu đãi gì
//                                         không?
//                                     </AccordionTrigger>
//                                     <AccordionContent>
//                                         Có. Với khách hàng đã từng mua hàng tại TheBasic.vn và có lưu thông tin trên hệ
//                                         thống của chúng tôi: <br />
//                                         - Được giảm ngay 50.000 vnđ khi mua hóa đơn từ 200.000 vnđ trở lên ( không áp
//                                         dụng cho sản phẩm thanh lý, bỏ mẫu, mua 1 tặng 1 hay giảm từ 40%). <br />- Được
//                                         MUA 1 TẶNG 1 toàn bộ sản phẩm trong tháng sinh nhật của khách ( áp dụng trên giá
//                                         gốc của sản phẩm).
//                                     </AccordionContent>
//                                 </AccordionItem>
//                             </Accordion>
//                             <Accordion type='single' collapsible>
//                                 <AccordionItem value='item-1'>
//                                     <AccordionTrigger>Làm sao để tôi đặt hàng online?</AccordionTrigger>
//                                     <AccordionContent>
//                                         Khách hàng vui lòng tham khảo chính sách đổi trả sản phẩm của TheBasic.vn để
//                                         được cung cấp thông tin đầy đủ và chi tiết nhất.
//                                     </AccordionContent>
//                                 </AccordionItem>
//                             </Accordion>
//                             <Accordion type='single' collapsible>
//                                 <AccordionItem value='item-1'>
//                                     <AccordionTrigger>
//                                         Khách hàng cũ, khách đã từng mua hàng tại TheBasic.vn thì có được ưu đãi gì
//                                         không?
//                                     </AccordionTrigger>
//                                     <AccordionContent>
//                                         Có. Với khách hàng đã từng mua hàng tại TheBasic.vn và có lưu thông tin trên hệ
//                                         thống của chúng tôi: <br />
//                                         - Được giảm ngay 50.000 vnđ khi mua hóa đơn từ 200.000 vnđ trở lên ( không áp
//                                         dụng cho sản phẩm thanh lý, bỏ mẫu, mua 1 tặng 1 hay giảm từ 40%). <br />- Được
//                                         MUA 1 TẶNG 1 toàn bộ sản phẩm trong tháng sinh nhật của khách ( áp dụng trên giá
//                                         gốc của sản phẩm).
//                                     </AccordionContent>
//                                 </AccordionItem>
//                             </Accordion>
//                             <Accordion type='single' collapsible>
//                                 <AccordionItem value='item-1'>
//                                     <AccordionTrigger>
//                                         Khách hàng cũ, khách đã từng mua hàng tại TheBasic.vn thì có được ưu đãi gì
//                                         không?
//                                     </AccordionTrigger>
//                                     <AccordionContent>
//                                         Có. Với khách hàng đã từng mua hàng tại TheBasic.vn và có lưu thông tin trên hệ
//                                         thống của chúng tôi: <br />
//                                         - Được giảm ngay 50.000 vnđ khi mua hóa đơn từ 200.000 vnđ trở lên ( không áp
//                                         dụng cho sản phẩm thanh lý, bỏ mẫu, mua 1 tặng 1 hay giảm từ 40%). <br />- Được
//                                         MUA 1 TẶNG 1 toàn bộ sản phẩm trong tháng sinh nhật của khách ( áp dụng trên giá
//                                         gốc của sản phẩm).
//                                     </AccordionContent>
//                                 </AccordionItem>
//                             </Accordion>
//                             <Accordion type='single' collapsible>
//                                 <AccordionItem value='item-1'>
//                                     <AccordionTrigger>Làm sao để tôi đặt hàng online?</AccordionTrigger>
//                                     <AccordionContent>
//                                         Khách hàng vui lòng tham khảo chính sách đổi trả sản phẩm của TheBasic.vn để
//                                         được cung cấp thông tin đầy đủ và chi tiết nhất.
//                                     </AccordionContent>
//                                 </AccordionItem>
//                             </Accordion>
//                             <Accordion type='single' collapsible>
//                                 <AccordionItem value='item-1'>
//                                     <AccordionTrigger>
//                                         Khách hàng cũ, khách đã từng mua hàng tại TheBasic.vn thì có được ưu đãi gì
//                                         không?
//                                     </AccordionTrigger>
//                                     <AccordionContent>
//                                         Có. Với khách hàng đã từng mua hàng tại TheBasic.vn và có lưu thông tin trên hệ
//                                         thống của chúng tôi: <br />
//                                         - Được giảm ngay 50.000 vnđ khi mua hóa đơn từ 200.000 vnđ trở lên ( không áp
//                                         dụng cho sản phẩm thanh lý, bỏ mẫu, mua 1 tặng 1 hay giảm từ 40%). <br />- Được
//                                         MUA 1 TẶNG 1 toàn bộ sản phẩm trong tháng sinh nhật của khách ( áp dụng trên giá
//                                         gốc của sản phẩm).
//                                     </AccordionContent>
//                                 </AccordionItem>
//                             </Accordion>
//                         </div>
//                     )}
//                 </div>

//                 <div className='mt-20 md:mb-40 mb-10 px-10'>
//                     <h2 className='text-4xl text-center font-bold mb-10'>Sản phẩm liên quan</h2>
//                     <Carousel>
//                         <CarouselContent className='-ml-2 md:-ml-4'>
//                             <CarouselItem className='basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4'>
//                                 <ProductItem />
//                             </CarouselItem>
//                             <CarouselItem className='basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4'>
//                                 <ProductItem />
//                             </CarouselItem>
//                             <CarouselItem className='basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4'>
//                                 <ProductItem />
//                             </CarouselItem>
//                             <CarouselItem className='basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4'>
//                                 <ProductItem />
//                             </CarouselItem>
//                             <CarouselItem className='basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4'>
//                                 <ProductItem />
//                             </CarouselItem>
//                             <CarouselItem className='basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4'>
//                                 <ProductItem />
//                             </CarouselItem>
//                             <CarouselItem className='basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4'>
//                                 <ProductItem />
//                             </CarouselItem>
//                         </CarouselContent>
//                         <CarouselPrevious />
//                         <CarouselNext />
//                     </Carousel>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductDetail
