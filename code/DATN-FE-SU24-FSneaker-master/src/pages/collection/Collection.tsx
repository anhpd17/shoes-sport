import { useEffect, useState } from 'react'

import { FilterIcon } from 'lucide-react'
import ReactSlider from 'react-slider'

import BreadCrumb, { IBreadCrumb } from '@/components/breadcrumb'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Pagination from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import ProductItem from '@/features/product/_components/product-item'
import { getProducts } from '@/services/product'
import { IProduct } from '@/common/interfaces/product'

const PAGE_SIZE = 10

const Collection = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [products, setProducts] = useState<IProduct[]>([])

    const breadcrumb: IBreadCrumb[] = [
        {
            title: 'Giày Nike'
        }
    ]

    const fetchProducts = async () => {
        const response = await getProducts({ _page: currentPage, _limit: PAGE_SIZE })
        setProducts(response.datas.docs)
        setTotalCount(response.datas.totalDocs)
    }

    useEffect(() => {
        fetchProducts()
    }, [currentPage])

    const renderProductList = () => {
        if (products.length == 0) return null
        else
            return (
                <>
                    <div className='mt-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-5'>
                        {products?.map((item, index) => <ProductItem item={item} key={index} />)}
                    </div>
                    <br />
                    <Pagination
                        totalCount={totalCount}
                        pageSize={PAGE_SIZE}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </>
            )
    }

    return (
        <div className='pb-10'>
            <BreadCrumb links={breadcrumb} />
            <div className='app-container text-[#333] flex gap-10    pt-5'>
                <div className='w-[300px] h-20 md:block hidden'>
                    <FilerSection />
                </div>
                <div className='flex-1'>
                    <div className='flex md:items-center gap-3 flex-col md:flex-row'>
                        <div className='flex-1 flex items-center gap-3'>
                            <h1 className='text-2xl'>Giày Nike</h1>
                            <p className='text-sm relative top-1 flex-1'>5 sản phẩm</p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <div className='flex-1 md:hidden'>
                                <Sheet>
                                    <SheetTrigger>
                                        <button className='outline-none flex gap-2 items-center border border-neutral-200 py-2 px-4 rounded-md text-sm'>
                                            Bộ Lọc
                                            <FilterIcon size={16} />
                                        </button>
                                    </SheetTrigger>
                                    <SheetContent side={'left'}>
                                        <FilerSection />
                                    </SheetContent>
                                </Sheet>
                            </div>
                            <div className='flex gap-3 items-center justify-center'>
                                <p className='text-base relative top-1 flex-1'>Sắp xếp theo</p>
                                <Select>
                                    <SelectTrigger className='w-[180px]'>
                                        <SelectValue placeholder='Tên A-Z' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='1'>
                                            <div className='cursor-pointer hover:text-teal-900'>Tên A-Z</div>
                                        </SelectItem>
                                        {/* <SelectItem value='2'>Sản phẩm nổi bật</SelectItem> */}
                                        <SelectItem value='3'>
                                            <div className='cursor-pointer hover:text-teal-900'>Giá tăng dần</div>
                                        </SelectItem>
                                        <SelectItem value='4'>
                                            <div className='cursor-pointer hover:text-teal-900'>Giá giảm dần</div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    {renderProductList()}
                </div>
            </div>
        </div>
    )
}

const FilerSection = () => {
    return (
        <>
            <h1 className='text-2xl'>Bộ lọc</h1>
            <div>
                {/* <Accordion type='single' collapsible defaultValue='1'>
                    <AccordionItem value='1' className='border-none'>
                        <AccordionTrigger className='text-left text-lg hover:no-underline'>
                            Thương hiệu
                        </AccordionTrigger>
                        <AccordionContent className='flex flex-col gap-3 '>
                            <div className='flex items-center space-x-2'>
                                <Checkbox id='terms2' />
                                <label
                                    htmlFor='terms2'
                                    className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                >
                                    Nike
                                </label>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <Checkbox id='terms3' />
                                <label
                                    htmlFor='terms3'
                                    className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                >
                                    Khác
                                </label>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion> */}
                <Accordion type='single' collapsible defaultValue='1'>
                    <AccordionItem value='1' className='border-none'>
                        <AccordionTrigger className='text-left text-lg hover:no-underline'>Khoảng giá</AccordionTrigger>
                        <AccordionContent className='py-4'>
                            <ReactSlider
                                className='horizontal-slider'
                                thumbClassName='w-4 h-4 bg-neutral-700 rounded-full hidden'
                                trackClassName='pt-3'
                                defaultValue={[0, 100000]}
                                ariaValuetext={(state: any) => `Thumb value ${state.valueNow}`}
                                renderThumb={(props: any, state: any) => <div {...props}>{state.valueNow}</div>}
                                pearling
                                minDistance={10}
                            />
                            <Slider defaultValue={[33]} max={100} step={1} min={20} />

                            <div className='mt-4 flex items-center justify-between'>
                                <span className='text-sm font-bold'>1.000.000 đ</span>
                                <span className='text-sm font-bold'>5.000.000 đ</span>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type='single' collapsible defaultValue='1'>
                    <AccordionItem value='1' className='border-none'>
                        <AccordionTrigger className='text-left text-lg hover:no-underline'>Size</AccordionTrigger>
                        <AccordionContent className='flex flex-wrap gap-3'>
                            {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map((size, index) => (
                                <div
                                    key={index}
                                    className='flex items-center space-x-2 w-12 h-12 border rounded-md border-neutral-400 justify-center text-neutral-700 cursor-pointer hover:bg-neutral-700 hover:text-white'
                                >
                                    {size}
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    )
}
export default Collection
