
import { formatPrice } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { IProduct } from '@/common/type'

export const getColumns = (removeProduct: any): ColumnDef<IProduct>[] => [
    {
        accessorKey: 'name',
        header: () => <span className='font-bold'>Tên sản phẩm</span>
    },
    {
        accessorKey: 'price',
        header: 'Giá',
        cell: ({ row }) => {
            const formattedPrice = formatPrice(row.getValue('price') || 0)

            return <div dangerouslySetInnerHTML={{ __html: formattedPrice }} />
        }
    },
    {
        accessorKey: '',
        header: 'Hành động',
        cell: ({ row }) => {
            return (
                <>
                    <Link to={`/admin/products/${row?.original.id}/edit`}>Chỉnh sửa</Link>
                    <Button
                        onClick={() => {
                            window.confirm('Ban co chac muon xoa khong?') && removeProduct(row?.original!)
                        }}
                    >
                        Xóa
                    </Button>
                </>
            )
        }
    }
]
