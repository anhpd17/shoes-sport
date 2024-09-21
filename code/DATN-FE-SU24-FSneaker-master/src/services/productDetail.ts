import { IProductDetail } from '@/common/interfaces/productDetail'
import instance from '@/core/api'

export const addProductDetail = async (products: IProductDetail[]) => {
    const response = await instance.post(`api/productDetail/`, {
        productDetails: products
    })

    return response.data
}

export const updateProductDetail = async (data: any) => {
    try {
        const response = await instance.put(`api/productDetail/`, data)

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteProductDetail = async (id: string) => {
    try {
        const response = await instance.delete(`api/productDetail/${id}`)

        return response.data
    } catch (error) {
        console.log(error)
    }
}
