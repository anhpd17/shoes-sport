import React from 'react'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
    return (
        <div className='max-w-screen-xl mx-auto min-h-[60vh] flex items-center flex-col justify-center px-3'>
            <img src='/payment-success.png' alt='Payment success' className='block h-28' />

            <h1 className='mt-6 text-2xl font-semibold text-[#1bc27a]'>Đặt hàng thành công</h1>

            <p className='mt-6 text-center'>
                Chúng tôi sẽ liên hệ Quý khách để xác nhận đơn hàng trong thời gian sớm nhất!
            </p>

            <div className='flex items-center justify-center mt-8 gap-2'>
                <Link
                    to='/orders'
                    className='block px-7 py-3 border border-red-500 text-red-500 bg-white outline-none hover:bg-red-500 hover:text-white transition-all rounded-md'
                >
                    Đơn hàng của tôi
                </Link>
                <Link
                    to='/'
                    className='block px-7 py-3 border border-red-500 text-white bg-red-500 outline-none hover:opacity-90 transition-all rounded-md'
                >
                    Tiếp tục mua hàng
                </Link>
            </div>
        </div>
    )
}

export default PaymentSuccess
