import { ICategory } from "@/common/type"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { useCategoryMutation } from "@/hooks/useAdmCategoryMutation"
import Input from "antd/es/input/Input"
import { Pencil } from "lucide-react"
import { useEffect, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"


type CategoryFormProps = {
    data: ICategory
}
type FormControlType = {
    name: string
}

const FormCategory = ({ data }: CategoryFormProps) => {
    console.log('data category - ', data)
    const [categoryEditStatus, setCategoryEditStatus] = useState(false)
    const { form, onSubmit } = useCategoryMutation({
        action: 'UPDATE',
        onSuccess: () => {
            setCategoryEditStatus(false)
            toast.success("Cập nhật thành công")
        }
    })
    useEffect(() => {
        if (data && form) {
            form.reset({
                name: data.name || '',
                slug: data.slug || '',
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
                Tên Thương Hiệu
                <Button variant='ghost' onClick={() => setCategoryEditStatus(!categoryEditStatus)}>
                    {categoryEditStatus ? (
                        <>Hủy</>
                    ) : (
                        <>
                            <Pencil className='h-4 w-4 mr-2' />
                            Chỉnh sửa
                        </>
                    )}
                </Button>
            </div>
            {!categoryEditStatus && <p className='text-sm mt-2'>{data?.name}</p>}
            {categoryEditStatus && (
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
export default FormCategory