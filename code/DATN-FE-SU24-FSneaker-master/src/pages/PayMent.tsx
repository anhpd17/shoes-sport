import instance from '@/core/api'
import { Icon } from '@iconify/react'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'


const PayMent = () => {
    const [CheckTypePayment, setCheckTypePayment] = useState('cod');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const handPaymentMethods = async () => {
        try {
            if (CheckTypePayment === 'vnpay') {
                const response = await axios.post('http://localhost:8000/api/order/create-order-vnpay', {
                    total: 100000,
                }, {
                    withCredentials: true // Đảm bảo thông tin đăng nhập được bao gồm trong yêu cầu
                });
                window.location.href = response.data.data; // Redirect to the VNPAY URL
            }
        } catch (error) {
            console.log("run herere ");
            console.error('Error creating payment URL:', error);
        }
    }
    const onCheckTypePayment = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCheckTypePayment(e.target.value);
    }

    const expire = queryParams.get('expire');
    const amount = queryParams.get('vnp_Amount');
    const bankCode = queryParams.get('vnp_BankCode');
    const bankTranNo = queryParams.get('vnp_BankTranNo');
    const cardType = queryParams.get('vnp_CardType');
    const orderInfo = queryParams.get('vnp_OrderInfo');
    const payDate = queryParams.get('vnp_PayDate');
    const responseCode = queryParams.get('vnp_ResponseCode');
    const tmnCode = queryParams.get('vnp_TmnCode');
    const transactionNo = queryParams.get('vnp_TransactionNo');
    const transactionStatus = queryParams.get('vnp_TransactionStatus');
    const txnRef = queryParams.get('vnp_TxnRef');
    const secureHash = queryParams.get('vnp_SecureHash');
    //   console.log(expire,amount, bankCode, bankCode, bankTranNo, cardType, orderInfo, payDate,responseCode);
    //   console.log(tmnCode,transactionNo, transactionStatus, txnRef, secureHash);
    useEffect(() => {
        if (transactionStatus === '00') {
            console.log("HELLO WROLD");

        }
    }, [transactionStatus])

    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vnpay'>('cod')
    const exmapleBody = {
        address: 'Nghệ An',
        phone: '0987754123',
        user_id: '66671b3baa76694e64bf608c',
        products: [
            { product_id: '6665ebfbaeb64196d817c50c', quantity: 2 },
            { product_id: '666678c9fc5976b672b49918', quantity: 1 }
        ],
        total_price: 200000
        // payment_type: 'cod'
    }


    return (
        <div className='my-[50px]'>
            <div className="max-w-screen-xl m-auto text-[20px]">
                <div className="cart grid grid-cols-4 gap-5 my-5 mx-0">
                    <div className="cart__content col-span-2">
                        <div className="nav__link flex items-center gap-2 text-[18px]">
                            <Link to='/cart' className="flex items-center gap-2 text-sky-500">Giỏ hàng
                                <Icon className='text-gray-400 text-[18px]' icon="mingcute:right-line" /></Link>
                            <Link to='/formaddress' className="flex items-center gap-2 text-sky-500">
                                Thông tin giao hàng
                                <Icon className='text-gray-400 text-[18px]' icon="mingcute:right-line" />
                            </Link>
                            <p className="flex items-center text-gray-400">
                                Phương thức thanh toán
                            </p>
                        </div>


                        <h2 className="mt-8 mb-5 text-[20px] font-normal">Phương thức thanh toán</h2>
                        <div className="border-2 border-solid rounded py-4 ">
                            <div className="pl-4 flex items-center gap-2 pb-4">
                                <input type="radio" checked={CheckTypePayment === 'cod'} value={"cod"} onChange={(e) => onCheckTypePayment(e)} />
                                <img src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6" alt="" />
                                <p className="text-gray-500 text-[18px]">Thanh toán khi giao hàng (COD)</p>
                            </div>
                            <hr />
                            <div className="pl-4 flex items-center gap-2 pt-4">
                                <input type="radio" checked={CheckTypePayment === 'vnpay'} value={'vnpay'} onChange={(e) => onCheckTypePayment(e)} />
                                <img src="https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=6" alt="" />
                                <p className="text-gray-500 text-[18px]">Chuyển khoản ngân hàng</p>
                            </div>
                        </div>


                        <div className="pay__info">
                            <div className="form__profile">
                                <div className="pay__router flex justify-between items-center mt-4">
                                    <Link to='/cart' className="text-sky-600 text-[18px]">Giỏ hàng</Link>
                                    <button className="text-white bg-sky-700 px-5 py-3 rounded text-[18px]" onClick={handPaymentMethods} >
                                        Hoàn tất đơn hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr className="mt-[50px]" />
                        <p className=" text-center text-[18px] text-gray-500 mt-3">Powered by Haravan</p>
                    </div>
                    <div className="cart__info border-l border-slate-400 col-span-2 ">
                        <div className="desc flex gap-4 items-center ml-8 relative ">
                            <div className="oder--item-img w-[100px] h-[100px]overflow-hidden">
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
                        <hr className="mt-4 border-dashed mx-4" />
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

export default PayMent
