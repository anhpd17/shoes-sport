import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGetCategoryDetailQuery } from '@/hooks/useAdmCategoryQuery'
import { updateCategory } from '@/services/category'
import { Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const categories = [
    {
        id: 'jjkglhkgjgkhjh1',
        name: 'hehe'
    },
    {
        id: 'jjkglhkgjgkhjh2',
        name: 'gkhlj'
    }
]

const EditCategory = ({ id, name }: any) => {
    console.log(id, name)
    const { id: categoryId } = useParams()
    // console.log(categoryId)
    const navigate = useNavigate()
    const [categoryEditStatus, setCategoryEditStatus] = useState(false)
    const { data: category, isLoading } = useGetCategoryDetailQuery(categoryId!)
    console.log('data - ', category?.data)

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors }
    } = useForm({})

    useEffect(() => {
        if (category) {
            setValue('name', category?.data?.name)
        }
    }, [category])
    // Tìm danh mục tương ứng với id trong danh sách
    // const category = categories.find((category) => category.id === id)

    // useEffect(() => {
    //     // Reset form và đặt giá trị từ danh mục vào input khi danh mục thay đổi
    //     reset(category)
    // }, [reset, category])

    // const onSubmit = (data: any) => {
    //     // Xử lý dữ liệu khi form được submit
    //     console.log(data)
    // }
    // const onHandleSubmit: SubmitHandler<FormControlType> = (values) => {
    //     console.log('abc - ', values)
    //     onSubmit({ ...values })
    // }

    const onHandleSubmit = async (values: any) => {
        try {
            if (values.name === '') {
                setError('name', {
                    type: 'required',
                    message: 'Tên không được để trống'
                })
                return
            }
            await updateCategory({ _id: categoryId, name: values?.name, slug: category?.data?.slug })
            toast.success('Cập nhật thành công')
            navigate('/admin/category')
        } catch (error) {
            toast.error('Cập nhật thất bại')
        }
    }

    return (
        <div>
            {/* <SheetContent> */}
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <SheetHeader>
                    <SheetTitle>SỬA LOẠI DANH MỤC</SheetTitle>
                </SheetHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid items-center grid-cols-4 gap-4'>
                        <Label htmlFor='name' className='text-right'>
                            Tên
                        </Label>
                        <Input
                            id='name'
                            defaultValue={name}
                            {...register('name')}
                            onChange={(e) => {
                                console.log(e.target.value)
                                setValue('name', e.target.value)
                            }}
                            className='col-span-3'
                        />
                    </div>
                </div>
                <SheetFooter>
                <SheetClose asChild>
                <Button type='submit'>Lưu thay đổi</Button>
                </SheetClose>
                </SheetFooter>
            </form> */}
            <div className='p-4 mt-6 border rounded-md bg-slate-100'>
                <div className='flex items-center justify-between font-medium'>
                    Kích thước
                    <Button variant='ghost' onClick={() => setCategoryEditStatus(!categoryEditStatus)}>
                        {categoryEditStatus ? (
                            <>Hủy</>
                        ) : (
                            <>
                                <Pencil className='w-4 h-4 mr-2' />
                                Chỉnh sửa
                            </>
                        )}
                    </Button>
                </div>
                {/* {!categoryEditStatus && <p className='mt-2 text-sm'>{data?.size}</p>} */}
                {categoryEditStatus && (
                    // <Form {...form}>
                    <form className='flex flex-col gap-y-8' onSubmit={handleSubmit(onHandleSubmit)}>
                        {/* <FormField
                            control={form.control}
                            name='size'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <Input {...register('name')} type='text' placeholder='Cập nhật danh mục' />
                        {errors?.name && (
                            <span className='-mt-6 text-sm text-red-500'>{errors?.name?.message as any}</span>
                        )}{' '}
                        <div className='flex items-center gap-x-2'>
                            <Button type='submit'>Lưu</Button>
                        </div>
                    </form>
                    // </Form>
                )}
            </div>
            {/* </SheetContent> */}
        </div>
    )
}

export default EditCategory
