import { FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ContactButton from "./ContactButton";

export default function Footer() {
    return (
        <footer className='bg-[#f5f5f5] '>
            <ContactButton />
            <div className='app-container grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 '>
                <div className='text-neutral-500 px-4 md:px-8 md:border-r md:border-neutral-200 py-4 md:py-16'>
                    <h3 className='text-lg text-neutral-800 mb-5 font-semibold'>Giới thiệu</h3>
                    <p className='text-sm'>
                        HỘ KINH DOANH FNEAKER SPORT <br />
                        GPKD số: 123AB456 do Bộ ban ngành cấp ngày ../ ../ .... <br /> <br />
                        Fsneaker Sport tự hào với nhiều năm kinh doanh về các loại giày Sneaker. Uy tín và chất lượng
                        luôn là hai thứ mà Fsneaker Sport hướng đến.
                    </p>
                </div>
                <div className='text-neutral-500 px-4 md:px-8 md:border-r md:border-neutral-200 py-4 md:py-16'>
                    <h3 className='text-lg text-neutral-800 mb-5 font-semibold'>Thông tin liên hệ</h3>
                    <p className='text-sm'>
                        <strong>Địa chỉ: </strong>Số 1, Trịnh Văn Bô, Phương Canh, Nam Từ Liêm, Hà Nội
                    </p>
                    <p className='text-sm my-2'>
                        <strong>Điện thoại: </strong> (+84) 377 485 926
                    </p>
                    <p className='text-sm'>
                        <strong>Email:</strong> fsneakershop@gmail.com
                    </p>
                    {/* <p className="text-md mt-3">Phương thức vận chuyển</p>
                <div className="flex gap-3 mt-2">
                    <img className="border border-neutral-200" src="/img-ship-01.webp" alt="" />
                    <img className="border border-neutral-200" src="/img-ship-02.webp" alt="" />
                    <img className="border border-neutral-200" src="/img-ship-03.webp" alt="" />
                </div> */}
                </div>
                <div className='text-neutral-500 px-4 md:px-8 md:border-r md:border-neutral-200 py-4 md:py-16'>
                    <h3 className='text-lg text-neutral-800 mb-5 font-semibold'>Chính sách</h3>
                    <ul className='text-sm flex-col flex gap-2'>
                        <li>・Chính sách đặt hàng và thanh toán</li>
                        <li>・Chính sách đổi trả và bảo hành</li>
                        <li>・Chính Sách Bảo Mật Thông Tin</li>
                    </ul>
                </div>
                <div className='text-neutral-500 px-4 md:px-8 md:border-r md:border-neutral-200 py-4 md:py-16'>
                    <div>
                        <img src='http://localhost:5173/src/assets/1-01.png' alt='' />
                    </div>
                    <div className='flex gap-2 justify-center  mt-2'>
                        <Link
                            to='/'
                            className='w-8 h-8 border rounded-md border-neutral-200 flex items-center justify-center hover:opacity-90'
                        >
                            <FacebookIcon size={16} />
                        </Link>
                        <Link
                            to='/'
                            className='w-8 h-8 border rounded-md border-neutral-200 flex items-center justify-center hover:opacity-90'
                        >
                            <InstagramIcon size={16} />
                        </Link>
                        <Link
                            to='/'
                            className='w-8 h-8 border rounded-md border-neutral-200 flex items-center justify-center hover:opacity-90'
                        >
                            <YoutubeIcon size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
