import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { SetStateAction, useState } from 'react'

type Props = {
    products: any[],
    productsPerPage: number,  // Số sản phẩm mỗi trang
    setCurrentPage: React.Dispatch<SetStateAction<number>>,
    totalPage: number
}

const Pagination2: React.FC<Props> = ({ products, productsPerPage, setCurrentPage: setCurrentPageParent, totalPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Tính toán các chỉ số để lấy sản phẩm cho trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Hàm thay đổi trang
    const totalPagination = Math.ceil(totalPage / productsPerPage);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handNextpage = () => {
        paginate(currentPage + 1);
        setCurrentPageParent(currentPage + 1)
    }
    const handPrevpage = () => {
        paginate(currentPage - 1);
        setCurrentPageParent(currentPage - 1)
    }
    const handClickCurrentPage = (index: number) => {
        paginate(index + 1);
        setCurrentPageParent(index + 1)
    }

    return (
        <div>

            <ul>
                {currentProducts.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
            <div className='flex justify-center mt-5'>
                <button
                    className='px-3 py-1 border rounded mx-1 flex items-center'
                    onClick={() => handPrevpage()}
                    disabled={currentPage === 1}
                >
                    <ChevronLeftIcon className='w-4 h-4' />
                </button>
                {Array.from({ length: Math.ceil(totalPage / productsPerPage) }, (_, index) => (
                    <button key={index}
                        className={`px-3 py-1 border rounded mx-1 ${currentPage === index + 1 ? 'bg-gray-300' : ''}`}
                        onClick={() => handClickCurrentPage(index)}>
                        {index + 1}
                    </button>
                ))}
                <button
                    className='px-3 py-1 border rounded mx-1 flex items-center'
                    onClick={() => handNextpage()}
                    disabled={currentPage === totalPagination}
                >
                    <ChevronRightIcon className='w-4 h-4' />
                </button>
            </div>
            <div>
            </div>
        </div>
    );
}

export default Pagination2