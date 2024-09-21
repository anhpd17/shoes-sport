
import { useToast } from '../../../components/ui/use-toast'
import { useEffect, useState } from 'react'
import { useProductMutation } from '@/hooks/useProductMutation'
import { SubmitHandler } from 'react-hook-form'
import { Button } from '../../../components/ui/button'
import { Pencil } from 'lucide-react'
import { Form, FormControl, FormField, FormItem } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { IProduct } from '@/common/type'

type NameFormProps = {
    data: IProduct
}

type FormControlType = {
    name: string
}

const NameForm = ({ data }: NameFormProps) => {
    const { toast } = useToast()
    const [productEditStatus, setProductEditStatus] = useState(false)
    const { form, onSubmit } = useProductMutation({
        action: 'UPDATE',
        onSuccess: () => {
            setProductEditStatus(false)
            toast({
                variant: 'success',
                title: 'Chuc mung thanh nien',
                description: 'Cap nhat ten san pham thanh cong'
            })
        }
    })
    useEffect(() => {
        if (data && form) {
            form.reset({
                name: data.name || '',
                price: data.price || 0
            })
        }
    }, [data, form])
    const onHandleSubmit: SubmitHandler<FormControlType> = (values) => {
        onSubmit({ ...data, ...values })
    }
    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Tên sản phẩm
                <Button variant='ghost' onClick={() => setProductEditStatus(!productEditStatus)}>
                    {productEditStatus ? (
                        <>Hủy</>
                    ) : (
                        <>
                            <Pencil className='h-4 w-4 mr-2' />
                            Chỉnh sửa
                        </>
                    )}
                </Button>
            </div>
            {!productEditStatus && <p className='text-sm mt-2'>{data?.name}</p>}
            {productEditStatus && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} className='flex flex-col gap-y-8'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder='Nhập tên sản phẩm' />
                                    </FormControl>
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
export default NameForm
