import React from 'react';
import { Link } from 'react-router-dom';


const formatCurrency = (amount) => {
    // Định dạng số thành tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // Tối thiểu số lẻ là 0
    });

    return formatter.format(amount);
};
const HighestRevenueProducts = ({ products }) => {
    // Kiểm tra xem products.data có phải là mảng không và có dữ liệu hay không
    if (!Array.isArray(products?.data) || products.data.length === 0) {
        return <div>No data available</div>;
    }
    return (
        <div className="max-w-2xl mx-auto bg-white p-4 shadow-md rounded-lg">

            <div className="grid grid-cols-2 mb-2 font-semibold text-gray-700">
                <div className="text-left">Sản Phẩm</div>
                <div className="text-right">Doanh Thu</div>
            </div>
            <ul className="space-y-2">
                {products.data.map((product, index) => (
                    <li key={index} className="flex items-center p-2 bg-gray-50 hover:bg-gray-100 shadow-sm rounded-lg transition duration-300">
                        <div className="flex items-center w-full">
                            <Link to={`/admin/products/detail/${product.productId}`} className="flex items-center w-full">
                                <img className="w-12 h-12 object-cover rounded mr-4" src={product.image} alt={product.name} />
                                <div className="flex-grow">
                                    <h3 className="text-sm w-4/5 font-semibold text-gray-800 line-clamp-2">{product.productName}</h3>
                                    <p className="text-sm text-gray-600">Size: {product.sizeName}</p>
                                </div>
                                <div className="text-sm font-bold text-right text-green-700">
                                    {formatCurrency(product.totalRevenue)}
                                </div>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HighestRevenueProducts;