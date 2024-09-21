import ProductItem from '@/features/product/_components/product-item2'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HomePageButton } from './HomePage'
import { ICategory } from '@/common/type'

type Props = {
    data: ICategory[];
    handgetProduct: (id: string) => void,
    category: any[]
}

const ListCategory: React.FC<Props> = ({ data, handgetProduct, category }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [activeTabIDcate, setActiveTabIDcate] = useState("");
    const [showAllCategories, setShowAllCategories] = useState(false);

    const displayedCategories = showAllCategories ? category : category.slice(0, 4);
    console.log(data, activeTab);

    return (
        <div className='app-container'>
            <div className=' py-16 px-2'>
                <div>
                    <ul className='flex justify-center gap-8 '>
                        {/* {category.length > 0 && category?.map((category, index) => (
                            <li
                                className={cn(
                                    'relative text-3xl text-neutral-400 hover:text-neutral-800 transition-all duration-500 after:absolute after:content-[""] after:left-0 after:right-full after:-bottom-1 after:h-[6px] after:bg-neutral-800 hover:after:right-0 after:transition-all cursor-pointer whitespace-nowrap',
                                    activeTab == index ? 'text-neutral-800 after:right-0' : ''
                                )}
                                key={category._id}
                                onClick={() => {
                                    setActiveTab(index)
                                    setActiveTabIDcate(category._id)
                                    handgetProduct(category._id as string)
                                }}
                            >
                                {category.name}
                            </li>
                        ))} */}
                        {displayedCategories.map((category, index) => (
                            <li
                                className={cn(
                                    'relative text-3xl text-neutral-400 hover:text-neutral-800 transition-all duration-500 after:absolute after:content-[""] after:left-0 after:right-full after:-bottom-1 after:h-[6px] after:bg-neutral-800 hover:after:right-0 after:transition-all cursor-pointer whitespace-nowrap',
                                    activeTab == index ? 'text-neutral-800 after:right-0' : ''
                                )}
                                key={category._id}
                                onClick={() => {
                                    setActiveTab(index)
                                    setActiveTabIDcate(category._id)
                                    handgetProduct(category._id as string)
                                }}
                            >
                                {category.name}
                            </li>
                        ))}
                        {category.length > 4 && (
                            <li
                                className='relative text-3xl text-neutral-400 hover:text-neutral-800 transition-all duration-500 cursor-pointer whitespace-nowrap'
                                onClick={() => setShowAllCategories(!showAllCategories)}
                            >
                                {showAllCategories ? '<<' : '>>'}
                            </li>
                        )}
                    </ul>
                </div>
                <div className='mt-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-5'>
                    {data?.length > 0 && data?.map((product, index) => <ProductItem key={index} product={product} />)}
                </div>
                <Link to={data[0]?.categoryId && '/collections/' + data[0]?.categoryId || "/"}>
                    <HomePageButton className='mt-10'>Xem tất cả</HomePageButton>
                </Link>
            </div>
        </div>
    )
}

export default ListCategory