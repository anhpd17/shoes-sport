import instance from '@/core/api'

const storedUser = localStorage.getItem('user')
const user = storedUser ? JSON.parse(storedUser) : {}
const userId = user?._id

interface IProductFavoriteRes {
    message: string
    data: IProductFavorite[]
}

export interface IProductFavorite {
    nameProduct: string
    imageProduct: string
    price: number
    productId: string
    promotionalPrice: number
}

export const getProductFavorites = async (): Promise<IProductFavoriteRes> => {
    if (!userId) {
        return Promise.resolve() as any
    }

    const data = await instance.get(`/api/favourite/${userId}`)

    return data.data
}

export const favoriteProduct = (productId: string) => {
    return instance.post('/api/favourite/create-favorite', { productId, userId })
}

export const deleteProductFavorite = (productId: string) => {
    return instance.delete('/api/favourite/delete-favorite', { data: { productId, userId } })
}
