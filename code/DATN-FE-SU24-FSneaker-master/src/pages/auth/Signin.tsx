import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SigninForm, signinSchema } from '../../common/Schema'
import { signin } from '../../core/auth'
import { useLocalStorage } from '../../hook'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from '../../assets/logoFSneaker.png'

type Props = {}

const Signin = (props: Props) => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SigninForm>({
        resolver: yupResolver(signinSchema)
    })

    const [user, setUser] = useLocalStorage('user', null)

    const onSubmit = async (data: SigninForm) => {
        try {
            const {
                data: { accessToken, user }
            } = await signin(data)
            setUser({
                accessToken,
                ...user
            })
            if (user.role === 'admin') {
                navigate('/admin')
            } else {
                window.location.href = '/'
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                toast.error('Email hoặc mật khẩu không đúng')
            } else {
                toast.error(error?.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.')
            }
        }
    }

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <img className='mx-auto h-10 w-auto w-[200px] h-[200px]' src={logo} alt='Your Company' />
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                    Sign in to your account
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
                                {...register('email')}
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3'
                            />
                        </div>
                        <p className='text-red-600 text-[14px]'>{errors.email && errors.email.message}</p>
                    </div>

                    <div>
                        <div className='flex items-center justify-between'>
                            <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                                Mật khẩu
                            </label>
                            <div className='text-sm'>
                                <Link
                                    to='/forgot-password'
                                    className='font-semibold text-indigo-600 hover:text-indigo-500'
                                >
                                    Quên mật khẩu
                                </Link>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <input
                                placeholder='Mật khẩu'
                                {...register('password')}
                                type='password'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3'
                            />
                        </div>
                        <p className='text-red-600 text-[14px]'>{errors.password && errors.password.message}</p>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>

                <p className='mt-10 text-center text-sm text-gray-500'>
                    Nếu bạn chưa có tài khoản?{' '}
                    <Link to='/signup' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
                        Đăng ký
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signin
