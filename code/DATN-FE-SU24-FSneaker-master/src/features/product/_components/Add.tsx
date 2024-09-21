import { useProductMutation } from '@/hooks/useProductMutation'
import { useToast } from '../../../components/ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'

const Add = () => {
    const { toast } = useToast()
    const { form, onSubmit } = useProductMutation({
        action: 'ADD',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Chuc mung thanh nien',
                description: 'Them san pham thanh cong'
            })
            form.reset()
        }
    })
    return (
        <div className='border p-6'>
            <h2 className='text-xl font-bold'>Them san pham</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Ten San Pham</FormLabel>
                                <FormControl>
                                    <Input placeholder='Ten san pham' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='price'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Gia San Pham</FormLabel>
                                <FormControl>
                                    <Input placeholder='Gia san pham' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <Button type='submit'>Them</Button>
                </form>
            </Form>
        </div>
    )
}

export default Add
