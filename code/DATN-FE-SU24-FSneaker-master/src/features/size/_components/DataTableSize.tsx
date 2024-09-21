import React, { useEffect } from 'react'
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Icon } from '@iconify/react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSizeMutation } from '@/hooks/useSizeMutation'
import { ToastContainer, toast } from 'react-toastify'
import { Button } from '@/components/ui/button'

interface DataTableProps<TData> {
    columns: any[]
    data: TData[]
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    const [showModal, setShowModal] = React.useState(false)
    //add
    const { form, onSubmit } = useSizeMutation({
        action: 'ADD',
        onSuccess: () => {
            form.reset()
        }
    })

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === 'size') {
                form.setValue('slug', value.size)
            }
        })
        return () => subscription.unsubscribe()
    }, [form])
    return (
        <div className='rounded-md border'>
            <ToastContainer />
            <div>
                <button
                    className='float-right text-white active:bg-pink-600 border-black mt-3 mr-3 border text-sm px-6 py-3 rounded  hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => setShowModal(true)}
                >
                    <Icon className='text-black' icon='material-symbols:add' />
                </button>
                {showModal ? (
                    <>
                        <div className='fixed inset-0 z-50 left-1/3 outline-none focus:outline-none'>
                            <div className='my-6 mx-auto'>
                                {/*content*/}
                                <div className='border-0 rounded-lg shadow-lg max-w-screen-sm bg-white focus:outline-none'>
                                    {/*header*/}
                                    <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                                        <h3 className='text-3xl font-semibold'>Thêm thông tin</h3>
                                        <button
                                            className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                                            onClick={() => setShowModal(false)}
                                        ></button>
                                    </div>
                                    {/*body*/}
                                    <div className='relative p-6 flex-auto'>
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                                                <FormField
                                                    control={form.control}
                                                    name='size'
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className='font-bold'>Kích cỡ:</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type='number'
                                                                    placeholder='Kích cỡ giày ....'
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className='hidden'>
                                                    <FormField
                                                        control={form.control}
                                                        name='slug'
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>slug</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type='text'
                                                                        placeholder='Kích cỡ giày ....'
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className='flex justify-end gap-2'>
                                                    <Button type='submit' className='bg-sky-500 hover:bg-sky-600'>
                                                        Thêm
                                                    </Button>
                                                    <Button type='button' onClick={() => setShowModal(false)}>
                                                        Đóng
                                                    </Button>
                                                </div>
                                            </form>
                                        </Form>
                                    </div>
                                    {/*footer*/}
                                </div>
                            </div>
                        </div>
                        <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
                    </>
                ) : null}
            </div>
            <div className='table-content'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} style={{ width: '33.33%', paddingLeft: '50px' }}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} style={{ width: '33.33%', paddingLeft: '50px' }}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    Không có dữ liệu
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
