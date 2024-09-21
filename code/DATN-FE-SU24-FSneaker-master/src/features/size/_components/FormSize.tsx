import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Button } from '../../../components/ui/button'
import { Pencil } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../components/ui/form'
import { ISize } from '@/common/type'
import { useSizeMutation } from '@/hooks/useSizeMutation'
import { toast } from 'react-toastify'
import { Input } from '@/components/ui/input'

type SizeFormProps = {
    data: ISize
}

type FormControlType = {
    size: number
}

const FormSize = ({ data }: SizeFormProps) => {
    console.log('data size - ', data)
    const [sizeEditStatus, setSizeEditStatus] = useState(false)
    const { form, onSubmit } = useSizeMutation({
        action: 'UPDATE',
        onSuccess: () => {
            setSizeEditStatus(false)
            toast.success('Cập nhật thành công')
        }
    })
    useEffect(() => {
        if (data && form) {
            form.reset({
                size: data.size || 0,
                slug: data.slug || 0
            })
        }
    }, [data, form])
    const onHandleSubmit: SubmitHandler<FormControlType> = (values) => {
        console.log('abc - ', data, values)
        onSubmit({ ...data, ...values })
    }
    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Kích thước
                <Button variant='ghost' onClick={() => setSizeEditStatus(!sizeEditStatus)}>
                    {sizeEditStatus ? (
                        <>Hủy</>
                    ) : (
                        <>
                            <Pencil className='h-4 w-4 mr-2' />
                            Chỉnh sửa
                        </>
                    )}
                </Button>
            </div>
            {!sizeEditStatus && <p className='text-sm mt-2'>{data?.size}</p>}
            {sizeEditStatus && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} className='flex flex-col gap-y-8'>
                        <FormField
                            control={form.control}
                            name='size'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type='number' {...field} placeholder='Cập nhật kích thước' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex items-center gap-x-2'>
                            <Button type='submit'>Lưu</Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}
export default FormSize
