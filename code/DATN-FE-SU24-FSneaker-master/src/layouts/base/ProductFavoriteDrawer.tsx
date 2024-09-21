import { formatPrice } from '@/lib/utils'
import { IProductFavorite } from '@/services/favoriteProduct'
import { Drawer, Empty, message, Popconfirm } from 'antd'

import { DeleteOutlined } from '@ant-design/icons'
import { useProductFavoriteMutation } from '@/hooks/useProductFavorite'
import { Link } from 'react-router-dom'

interface IProductFavoriteDrawerProps {
    open: boolean
    onClose: () => void
    data?: IProductFavorite[]
    refresh: () => void
}

const ProductFavoriteDrawer = (props: IProductFavoriteDrawerProps) => {
    const { open, onClose, data, refresh } = props

    const { mutate } = useProductFavoriteMutation({
        action: 'DELETE',
        onSuccess: () => {
            message.success('Xoá SP khỏi danh sách yêu thích')
            refresh()
        }
    })

    return (
        <Drawer title='Sản phẩm yêu thích' open={open} onClose={onClose}>
            {!data?.length && <Empty description='Không có SP yêu thích nào' />}

            {data?.map((it, index) => (
                <div className='flex items-center gap-x-2 mb-3' key={index}>
                    <Link to={`/products/${it.productId}`} className='block w-20 h-20'>
                        <img
                            src={it.imageProduct}
                            alt={it.nameProduct}
                            className='w-full h-full rounded object-cover border'
                        />
                    </Link>

                    <div className='flex-1'>
                        <Link to={`/products/${it.productId}`}>
                            <p className='font-medium'>{it.nameProduct}</p>
                        </Link>
                        <p className='mt-1'>{formatPrice(it.promotionalPrice)}</p>
                    </div>

                    <Popconfirm
                        onConfirm={() => mutate(it.productId)}
                        title='Xoá SP yêu thích'
                        description='Xác nhận xoá SP khỏi danh sách yêu thích'
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                </div>
            ))}
        </Drawer>
    )
}

export default ProductFavoriteDrawer
