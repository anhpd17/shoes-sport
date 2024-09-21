
import { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { ICategory } from '@/common/type'

export const getColumns = (removeCategory: any): ColumnDef<ICategory>[] => [
    {
        accessorKey: 'STT',
        header: () => <span className='font-bold'>STT</span>,
        cell: ({ row }) => <span>{row.index + 1}</span>, // Display the row index + 1 for serial number
    },{
        accessorKey: 'name',
        header: () => <span className='font-bold'>Thương Hiệu</span>,
    },
    {
        accessorKey: '',
        header: 'Hành động',
        cell: ({ row }) => {
            return (
                <>
                    <Link className='text-white bg-sky-700 hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-red-90 rounded' to={`/admin/category/${row?.original._id}`}>Chỉnh sửa</Link>
                    <Button className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-90 ml-3'
                        onClick={() => {
                            window.confirm('Bạn có chắc muốn xóa không?') && removeCategory(row?.original!)
                        }}
                    >
                        Xóa
                    </Button>
                </>
            )
        }
    }
]