import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'

const FormAddress = () => {
    return (
        <div className='my-[50px]'>
            <div className="max-w-screen-xl m-auto text-[20px]">
                <div className="cart grid grid-cols-4 gap-5 my-5 mx-0">
                    <div className="cart__content col-span-2">
                        
                        <div className="nav__link flex items-center gap-2 text-[18px]">
                            <a href="" className="flex items-center gap-2 text-sky-500">Giỏ hàng
                                <Icon className='text-gray-400 text-[18px]' icon="mingcute:right-line" /></a>
                            <p className="flex items-center gap-2">
                                Thông tin giao hàng
                                <Icon className='text-gray-400 text-[18px]' icon="mingcute:right-line" />
                            </p>
                            <p className="flex items-center text-gray-400">
                                Phương thức thanh toán
                            </p>
                        </div>

                        <h2 className="my-4 text-[20px] font-normal">Thông tin giao hàng</h2>
                        <div className="pay__info">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="img__pay w-[80px] h-[80px] rounded-md overflow-hidden">
                                    <img src="https://picsum.photos/200/300" alt="" />
                                </div>
                                <div className="info__profile">
                                    <p className="text-gray-600 text-[18px] flex gap-1">
                                        <span>Bui Ngoc Son</span>
                                        <span>(buingocson@fsneaker.com)</span>
                                    </p>
                                    <button className="text-sky-600 text-[16px]">Đăng xuất</button>
                                </div>
                            </div>

                            <div className="form__profile">
                                <form className="">
                                    <div className="relative z-0 w-full mb-5 group border rounded">
                                        <select
                                            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                            <option>Địa chỉ lưu trữ</option>
                                            <option>0123456789, FPT, 7000, Hà Nội, Viet Nam</option>
                                        </select>
                                        <div
                                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                        <label
                                            className="peer-focus:font-medium absolute px-3 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white">Thêm
                                            địa chỉ mới</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-5 group border rounded">
                                        <input type="text" name="floating_email" id="floating_email"
                                            className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" " required />
                                        <label
                                            className="peer-focus:font-medium absolute px-3 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white">Họ
                                            và tên</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-5 group border rounded">
                                        <input type="text" name="floating_email" id="floating_email"
                                            className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" " required />
                                        <label
                                            className="peer-focus:font-medium absolute px-3 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white">Số
                                            điện thoại</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-5 group border rounded">
                                        <input type="text" name="floating_email" id="floating_email"
                                            className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" " required />
                                        <label
                                            className="peer-focus:font-medium absolute px-3 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white">Địa
                                            chỉ</label>
                                    </div>
                                    <div className="grid md:grid-cols-3 md:gap-6">
                                        <div className="relative z-0 w-full mb-5 group border rounded">
                                            <select
                                                className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                                <option>Chọn tỉnh / thành</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                            </select>
                                            <div
                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20">
                                                    <path
                                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </div>
                                            <label
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 px-3 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white">Tỉnh
                                                / thành</label>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group border rounded">
                                            <select
                                                className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                                <option>Chọn quận / huyện</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                            </select>
                                            <div
                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20">
                                                    <path
                                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </div>
                                            <label
                                                className="peer-focus:font-medium absolute px-3 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white">Quận
                                                / huyện</label>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group border rounded">
                                            <select
                                                className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                                <option>Chọn phường / xã</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                            </select>
                                            <div
                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20">
                                                    <path
                                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </div>
                                            <label
                                                className="peer-focus:font-medium absolute px-3 bg-white text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phường
                                                / xã</label>
                                        </div>
                                    </div>
                                    <div className="pay__router flex justify-between items-center mt-4">
                                        <Link to='/cart' className="text-sky-600 text-[18px]">Giỏ hàng</Link>
                                        <Link to='/payment' className="text-white bg-sky-700 px-5 py-3 rounded text-[18px]">
                                            Tiếp tục đến phương thức thanh toán
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <hr className="mt-[50px]"/>
                            <p className=" text-center text-[18px] text-gray-500 mt-3">Powered by Haravan</p>
                    </div>
                    <div className="cart__info border-l border-slate-400 col-span-2 ">
                        <div className="desc flex gap-4 items-center ml-8 relative ">
                            <div className="oder--item-img w-[100px] h-[100px] overflow-hidden">
                                <img src="https://product.hstatic.net/200000690551/product/br4_a36fe1712e2c4fb09fbc18e6de41c154_medium.jpg"
                                    alt="" className="imgfluid rounded-lg" />
                                <p
                                    className="absolute bottom-[80px] left-[80px] bg-gray-200 border border-solid border-slate-400 rounded-full flex justify-center text-[16px] px-3 py-1">
                                    1</p>
                            </div>
                            <div className="item-desc-inf flex justify-between items-center gap-8">
                                <div>
                                    <p className="desc-inf-title text-[15px]">
                                        [CHÍNH HÃNG] Giày Sneaker Revo Gen 1 Low - Brown
                                    </p>
                                    <p className="mb-4 text-[16px] font-normal text-gray-500">38</p>
                                </div>
                                <p className="text-gray-600 font-medium text-[16px]">750.000đ</p>
                            </div>
                        </div>
                        <hr className="mt-4 border-dashed mx-4" />
                            <div className="pay__provisional mx-4 mt-4">
                                <div className="payy__provisional--money flex justify-between mb-3">
                                    <p className="text-[18px] text-gray-500">Tạm tính</p>
                                    <p className="text-[18px] text-gray-500">750.000đ</p>
                                </div>
                                <div className="payy__provisional--transport flex justify-between">
                                    <p className="text-[18px] text-gray-500">Phí vận chuyển</p>
                                    <p className="text-[18px] text-gray-500"><Icon icon="bi:dash" /></p>
                                </div>
                            </div>
                            <hr className="mt-4 border-dashed mx-4"/>
                                <div className="payy__provisional--total flex justify-between mx-4 mt-4">
                                    <p className="text-[18px] text-gray-500">Tổng cộng</p>
                                    <p><span className="text-[16px] text-gray-500 mr-2">VNĐ</span> 750.000đ</p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            
            )
}

export default FormAddress