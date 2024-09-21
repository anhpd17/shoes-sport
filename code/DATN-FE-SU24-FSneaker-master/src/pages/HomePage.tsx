// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carosel'
// import ProductItem from '@/features/product/_components/product-item'
// import { cn } from '@/lib/utils'
// import { ArrowRight, PlusIcon } from 'lucide-react'
// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useOnClickOutside } from 'usehooks-ts'

// type Props = {}

const HomePage = (props: Props) => {
  const [activeTab, setActiveTab] = useState(0)
  const [activeTab1, setActiveTab1] = useState(0)
  const tabs = ["sản phẩm khuyến mãi", "sản phẩm nổi bật", "hàng chính hãng"]
  const tabs1 = ["MLB", "NIKE", "ADIDAS", "CROON"]
  return (
    <main className=''>
      <div className='app-container'>
        <div>
          <Carousel opts={{ loop: true, duration: 10 }}>
            <CarouselContent className="">
              <CarouselItem className="">
                <img src="/slide_1_img.jpg" alt="Slider" />
              </CarouselItem>
              <CarouselItem className="">
                <img src="/slide1.jpeg" alt="Slider" />
              </CarouselItem>
              <CarouselItem className="">
                <img src="/slide2.jpeg" alt="Slider" />
              </CarouselItem>
              <CarouselItem className="">
                <img src="/slide3.webp" alt="Slider" />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className='absolute top-1/2 left-4  -translate-y-1/2 z-10' />
            <CarouselNext className='absolute top-1/2 right-4  -translate-y-1/2 z-10' />
          </Carousel>
        </div>
        {/* // ẨN DANH MỤC NỔI BẬT */}
        {/* <div className='py-16 px-2'>
          <h1 className='text-4xl font-bold text-neutral-700 relative mb-10 px-5'>
            Danh mục nổi bật
          </h1>
          <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-4'>
            <Link to="/collections/nike" className='relative group'>
              <div className='h-fit overflow-hidden'>
                <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_category_1_img.jpg?v=292" alt="" className='group-hover:scale-125 transition-all duration-300' />
              </div>
              <div className='absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-center bg-white/60'>
                <p className='flex-1'>Nike</p>
                <button className='w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-neutral-900 hover:text-white'>
                  <ArrowRight size={24} />
                </button>
              </div>
            </Link>
            <Link to="/collections/new-balance-fila" className='relative group'>
              <div className='h-fit overflow-hidden'>
                <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_category_2_img.jpg?v=292" alt="" className='group-hover:scale-125 transition-all duration-300' />
              </div>
              <div className='absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-center bg-white/60'>
                <p className='flex-1'>New Balance</p>
                <button className='w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-neutral-900 hover:text-white'>
                  <ArrowRight size={24} />
                </button>
              </div>
            </Link>
            <Link to="/collections/adidas" className='relative group'>
              <div className='h-fit overflow-hidden'>
                <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_category_3_img.jpg?v=292" alt="" className='group-hover:scale-125 transition-all duration-300' />
              </div>
              <div className='absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-center bg-white/60'>
                <p className='flex-1'>Adidas</p>
                <button className='w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-neutral-900 hover:text-white'>
                  <ArrowRight size={24} />
                </button>
              </div>
            </Link>
            <Link to="/collections/mlb" className='relative group'>
              <div className='h-fit overflow-hidden'>
                <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_category_4_img.jpg?v=292" alt="" className='group-hover:scale-125 transition-all duration-300' />
              </div>
              <div className='absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-center bg-white/60'>
                <p className='flex-1'>MLB</p>
                <button className='w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-neutral-900 hover:text-white'>
                  <ArrowRight size={24} />
                </button>
              </div>
            </Link>
          </div>
        </div> */}
      </div>
      {/* // ẨN MUA 1 TẶNG 1
      <div className="bg-pink-50">
        <div className='app-container bg-pink-50 relative'>
          <div className='py-16 px-2'>
            <h1 className='text-4xl font-bold text-neutral-700 relative mb-10 px-5'>
              <span className="animate-ping inline-flex w-2 h-2 rounded-full bg-yellow-500 opacity-75 align-middle relative bottom-1 mr-5"></span>
              Mua 1 tặng 1
            </h1>
            <div className='px-5'>
              <Carousel>
                <CarouselContent className="-ml-2 md:-ml-4">
                  <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4"><ProductItem /></CarouselItem>
                  <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4"><ProductItem /></CarouselItem>
                  <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4"><ProductItem /></CarouselItem>
                  <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4"><ProductItem /></CarouselItem>
                  <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4"><ProductItem /></CarouselItem>
                  <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4"><ProductItem /></CarouselItem>
                  <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4"><ProductItem /></CarouselItem>
                </CarouselContent>
                <CarouselPrevious className='absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2' />
                <CarouselNext className='absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2' />
              </Carousel>
            </div>
          </div>
        </div>
      </div> */}
      <div className='app-container'>
        <div className=' py-16 px-2'>
          <div>
            <ul className='flex justify-center gap-8 '>
              {tabs1.map((tab, index) => <li className={cn('relative text-3xl text-neutral-400 hover:text-neutral-800 transition-all duration-500 after:absolute after:content-[""] after:left-0 after:right-full after:-bottom-1 after:h-[6px] after:bg-neutral-800 hover:after:right-0 after:transition-all cursor-pointer whitespace-nowrap', activeTab1 == index ? 'text-neutral-800 after:right-0' : '')} key={tab} onClick={() => setActiveTab1(index)}>{tab}</li>)}
            </ul>
          </div>
          <div className='mt-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-5'>
            {
              activeTab1 == 0 && new Array(4).fill(0).map((_, index) => <ProductItem key={index} />)
            }
            {
              activeTab1 == 1 && new Array(6).fill(0).map((_, index) => <ProductItem key={index} />)
            }
            {
              activeTab1 == 2 && new Array(8).fill(0).map((_, index) => <ProductItem key={index} />)
            }
            {
              activeTab1 == 3 && new Array(12).fill(0).map((_, index) => <ProductItem key={index} />)
            }
          </div>
          <HomePageButton className='mt-10'>Xem tất cả&nbsp;{tabs1[activeTab1]}</HomePageButton>
        </div>
      </div>
      <div className="bg-pink-50">
        <div className='app-container bg-pink-50 relative'>
          <div className='py-16 px-2'>
            {/* // ẨN SẢN PHẨM BÁN CHẠY */}
            {/* <h1 className='text-4xl font-bold text-neutral-700 relative mb-10 px-5'>
              Sản phẩm bán chạy
            </h1>
            <div className='md:px-5 grid md:grid-cols-3 grid-cols-1 gap-5'>
              <SellProduct
                img="https://theme.hstatic.net/200000690551/1001033677/14/home_set_combo_1_img.jpg?v=292"
                tooltipImg="https://product.hstatic.net/200000690551/product/liner_den_d4f3ec1946f844d68eeacc9dfff3091f_small.png"
                name="Giày MLB Chunky Liner Đen"
                price="750,000₫"
                collection="MLB LINER"
                salePrice="1,150,000₫"
                plusStyle={{ top: '73%', right: '55%' }}
              />
              <SellProduct
                img="https://theme.hstatic.net/200000690551/1001033677/14/home_set_combo_2_img.jpg?v=292"
                tooltipImg="https://product.hstatic.net/200000690551/product/af1_black_swoosh_817e5e5312f54235a925fa3c9a9f6aae_small.png"
                name="Giày Nike AF1 Black Swoosh"
                price="750,000₫"
                collection="NIKE AIRFORCE 1"
                salePrice="1,090,000₫"
                plusStyle={{ top: '73%', right: '55%' }}
              />
              <SellProduct
                img="https://theme.hstatic.net/200000690551/1001033677/14/home_set_combo_3_img.jpg?v=292"
                tooltipImg="https://product.hstatic.net/200000690551/product/liner_trang_426bd25c95ec41d69f77dc2b47abd908_small.png"
                name="Giày MLB Chunky Liner Trắng"
                price="750,000₫"
                collection="MLB LINER"
                salePrice="1,150,000₫"
                plusStyle={{ top: '73%', right: '55%' }}
              />
            </div> */}
            <h1 className='text-4xl font-bold text-neutral-700 relative mb-10 px-5'>
              SẢN PHẨM NEW
            </h1>
            <div className='mt-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-5'>
              {
                new Array(8).fill(0).map((_, index) => <ProductItem key={index} />)
              }
            </div>
          </div>
        </div>
      </div>
      <div className='app-container'>
        <div className=' py-16 px-2'>
          <div>
            <ul className='flex justify-center gap-8 '>
              {tabs.map((tab, index) => <li className={cn('relative text-3xl text-neutral-400 hover:text-neutral-800 transition-all duration-500 after:absolute after:content-[""] after:left-0 after:right-full after:-bottom-1 after:h-[6px] after:bg-neutral-800 hover:after:right-0 after:transition-all cursor-pointer whitespace-nowrap uppercase', activeTab == index ? 'text-neutral-800 after:right-0' : '')} key={tab} onClick={() => setActiveTab(index)}>{tab}</li>)}
            </ul>
          </div>
          <div className='mt-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-5'>
            {
              activeTab == 0 && new Array(4).fill(0).map((_, index) => <ProductItem key={index} />)
            }
            {
              activeTab == 1 && new Array(6).fill(0).map((_, index) => <ProductItem key={index} />)
            }
            {
              activeTab == 2 && new Array(8).fill(0).map((_, index) => <ProductItem key={index} />)
            }
          </div>
          <HomePageButton className='mt-10'>
            Xem tất cả&nbsp;{tabs[activeTab]}
          </HomePageButton>
        </div>
        <div className='py-16 px-2'>
          <h1 className='text-4xl font-bold text-neutral-700 relative mb-10 px-5'>
            Bài viết mới nhất
          </h1>
          <div className='px-5'>
            <Carousel>
              <CarouselContent className="-ml-2 md:-ml-4">
                <CarouselItem className="md:basis-1/2 lg:basis-1/4 pl-2 md:pl-4"><NewsItem /></CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/4 pl-2 md:pl-4"><NewsItem /></CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/4 pl-2 md:pl-4"><NewsItem /></CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/4 pl-2 md:pl-4"><NewsItem /></CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/4 pl-2 md:pl-4"><NewsItem /></CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/4 pl-2 md:pl-4"><NewsItem /></CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/4 pl-2 md:pl-4"><NewsItem /></CarouselItem>
              </CarouselContent>
              <CarouselPrevious className='absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-10' />
              <CarouselNext className='absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10' />
            </Carousel>
          </div>
        </div>
        <div className='py-16 px-2 grid lg:grid-cols-4 md:grid-cols-2 gap-4'>
          <div className='flex justify-center items-start gap-3'>
            <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_policy_icon_1.png?v=292" alt="" className='block w-14' />
            <div className='flex-1'>
              <p className='mb-1'>Miễn phí vận chuyển</p>
              <p className='text-sm'>Miễn phí vận chuyển nội thành HCM cho đơn hàng từ 1000k</p>
            </div>
          </div>
          <div className='flex justify-center items-start gap-3'>
            <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_policy_icon_2.png?v=292" alt="" className='block w-14' />
            <div className='flex-1'>
              <p className='mb-1'>Đổi dễ dàng</p>
              <p className='text-sm'>Đổi hàng sau 30 ngày nếu không hài lòng</p>
            </div>
          </div>
          <div className='flex justify-center items-start gap-3'>
            <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_policy_icon_3.png?v=292" alt="" className='block w-14' />
            <div className='flex-1'>
              <p className='mb-1'>Hỗ trợ</p>
              <p className='text-sm'>Gọi hotline 0977 826 896 để được tư vấn</p>
            </div>
          </div>
          <div className='flex justify-center items-start gap-3'>
            <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_policy_icon_4.png?v=292" alt="" className='block w-14' />
            <div className='flex-1'>
              <p className='mb-1'>Thanh toán đa dạng</p>
              <p className='text-sm'>Nhiều phương thức thanh toán đa dạng như: Tiền Mặt, Cà Thẻ, Chuyển Khoản, Apple Pay, Momo...</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

interface SellProcuctProps {
  img: string,
  tooltipImg: string,
  name: string,
  price: string,
  collection: string,
  salePrice: string,
  plusStyle?: {
    top: string,
    right: string
  },
}
const SellProduct = ({
  img,
  name,
  tooltipImg,
  price,
  collection,
  salePrice,
  plusStyle,
}: SellProcuctProps) => {
  const [isShow, setIsShow] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => { setIsShow(false) })

  return <div className='w-full'>
    <div className='relative'>
      <img src={img} alt="" />
      <div className='w-5 h-5 bg-white rounded-full flex items-center justify-center absolute top-[73%] right-[55%] cursor-pointer' style={plusStyle} onClick={() => setIsShow(prev => !prev)} ref={ref}>
        <PlusIcon size={16}></PlusIcon>
        <div className='absolute inset-0 rounded-full bg-white animate-ping'></div>
        {/* Tooltip above with caret */}
        {isShow && <div className='absolute bottom-[120%] right-1/2 translate-x-1/2 bg-white rounded-sm shadow-md w-[276px] h-[100px] flex items-center p-[10px]'>
          <img src={tooltipImg} alt="" className='max-h-full' />
          <div>
            <p className='text-sm text-neutral-900'>{name}</p>
            <p>
              <span className="text-[15px] text-red-500">{price}</span>
              <span className="text-[12px] ml-1 line-through text-neutral-500">{salePrice}</span>
            </p>
          </div>
          <div className='absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-[5px] border-solid border-transparent border-t-white'></div>
        </div>}
      </div>
    </div>
    <div className='relative'>
      <h3 className='text-lg mt-4 mb-4'>{collection}</h3>
      <HomePageButton className='w-fit m-0 text-sm'>XEM NHIỀU HƠN</HomePageButton>
    </div>
  </div>
}

const NewsItem = () => {
  return <div className='bg-white rounded-md shadow-sm border border-neutral-100'>
    <div className='relative overflow-hidden rounded-tl-md rounded-tr-md'>
      <img src="https://file.hstatic.net/200000690551/article/thum-bai-viet-web_aed17445226844b78c7ce5a7918dad9a_large.jpg" alt="" className='w-full aspect-video' />
    </div>
    <div className='px-4 py-3 text-neutral-400'>
      <div className='border-b border-neutral-100 pb-4 '>
        <p className='text-base font-semibold text-neutral-800'>Back To School Đồng Giá 399k cho toàn bộ sản phẩm tại TheBasic.vn</p>
        <p className='text-sm mt-2'>Nổi tiếng là một trong những thương hiệu mang phong cách thời trang đường phố sành điệu, tiếp cận với khách hàng thông qua nhiều...</p>
      </div>
      <div className='pt-4 flex items-center justify-between text-sm'>
        <span>19 tháng 04,2023</span>
        <span>Xem thêm</span>
      </div>
    </div>
  </div>
}

const HomePageButton = ({ className, children }: {
  className?: string,
  children?: React.ReactNode
}) => {
  return <button className={cn('w-full max-w-[400px] mx-auto text-black bg-white rounded-md border border-black py-3 px-8 hover:text-white hover:bg-black transition-all duration-500 block', className)}>
    {children}
  </button>
}
export default HomePage