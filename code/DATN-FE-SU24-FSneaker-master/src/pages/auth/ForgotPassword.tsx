import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from '../../assets/logoFSneaker.png'
import instance from '@/core/api'

type Inputs = {
    email: string
}

const ForgotPassword = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const res = await instance.post('api/auth/forgot-password', { email: data?.email })
            toast.success(res?.data?.message)
            navigate('/signin')
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.')
        }
    }

    return (
        <div className='flex min-h-screen flex-1 flex-col justify-center px-6 pb-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <img className='mx-auto w-[200px] h-[200px]' src={logo} alt='Your Company' />
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                    Forgot password
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                            Email
                        </label>
                        <div className='mt-2'>
                            <input
                                placeholder='Email của bạn'
                                {...register('email', {
                                    required: 'Vui lòng nhập email',
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: 'Email không đúng định dạng'
                                    }
                                })}
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3'
                            />
                        </div>
                        <p className='text-red-600 text-[14px]'>{errors.email && errors.email.message}</p>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            Đặt lại mật khẩu
                        </button>
                    </div>
                </form>

                <p className='mt-10 text-center text-sm text-gray-500'>
                    Bạn đã có tài khoản?{' '}
                    <Link to='/signup' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
                        Đăng nhập ngay
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPassword
