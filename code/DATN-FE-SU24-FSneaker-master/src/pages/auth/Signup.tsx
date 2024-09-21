import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useAuthMutation from '@/hooks/useAuthMutation'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logoFSneaker.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'

const Signup = () => {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false) // State to manage checkbox
    const { form, onSubmit } = useAuthMutation({
        action: 'SIGN UP',
        onSuccess: () => {
            toast.success('Đăng ký thành công')
            form.reset()
            setTimeout(() => {
                navigate('/signin')
            }, 3000)
        }
    })

    const handleFormSubmit = (event) => {
        if (!agree) {
            toast.error('Bạn phải đồng ý với điều khoản trước khi đăng ký tài khoản')
            event.preventDefault() // Prevent form submission
            return
        }
        form.handleSubmit(onSubmit)(event)
    }

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
            <ToastContainer />
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <img className='mx-auto h-10 w-auto w-[200px] h-[200px]' src={logo} alt='Your Company' />
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                    Welcome to FSneaker Sport
                </h2>
            </div>
            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <Form {...form}>
                    <form onSubmit={handleFormSubmit} className='space-y-6'>
                        <FormField
                            name='fullName'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='block text-sm font-medium leading-6 text-gray-900'>
                                        Họ tên
                                    </FormLabel>
                                    <FormControl className='mt-2'>
                                        <Input
                                            type='text'
                                            {...field}
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            placeholder='Full name'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='tel'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='block text-sm font-medium leading-6 text-gray-900'>
                                        Số điện thoại
                                    </FormLabel>
                                    <FormControl className='mt-2'>
                                        <Input
                                            type='text'
                                            {...field}
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            placeholder='Số điện thoại'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='email'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='block text-sm font-medium leading-6 text-gray-900'>
                                        Email
                                    </FormLabel>
                                    <FormControl className='mt-2'>
                                        <Input
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            type='email'
                                            {...field}
                                            placeholder='Email'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='address'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='block text-sm font-medium leading-6 text-gray-900'>
                                        Địa chỉ
                                    </FormLabel>
                                    <FormControl className='mt-2'>
                                        <Input
                                            type='text'
                                            {...field}
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            placeholder='Address'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='password'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='block text-sm font-medium leading-6 text-gray-900'>
                                        Mật khẩu
                                    </FormLabel>
                                    <FormControl className='mt-2'>
                                        <Input
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            type='password'
                                            {...field}
                                            placeholder='Mật khẩu'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='confirmPassword'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='block text-sm font-medium leading-6 text-gray-900'>
                                        Xác nhận mật khẩu
                                    </FormLabel>
                                    <FormControl className='mt-2'>
                                        <Input
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            type='password'
                                            {...field}
                                            placeholder='Xác nhận mật khẩu'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex items-center'>
                            <input
                                type='checkbox'
                                id='agree'
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                                className='h-4 w-4 text-indigo-600 border-gray-300 rounded'
                            />
                            <label htmlFor='agree' className='ml-2 block text-sm text-gray-900'>
                                Bạn đồng ý với
                                <Link to='/pages/policy' className='underline'>
                                    {' '}
                                    Chính sách{' '}
                                </Link>
                                của chúng tôi.
                            </label>
                        </div>
                        <Button
                            variant='destructive'
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            Đăng kí
                        </Button>
                    </form>
                </Form>
                <p className='mt-10 text-center text-sm text-gray-500'>
                    Bạn đã có tài khoản?{' '}
                    <Link to='/signin' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
                        Đăng nhập ngay
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup
