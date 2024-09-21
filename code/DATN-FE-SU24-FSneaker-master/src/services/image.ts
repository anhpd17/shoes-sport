import { IAddImageBody, IAddImageResponse } from '@/common/interfaces/image'
import instance from '@/core/api'

export const addImageProduct = async (data: IAddImageBody[]): Promise<IAddImageResponse> => {
    const response = await instance.post(`api/image`, {
        images: data
    })
    return response.data
}

export const getAllImageProductById = async (productId: string) => {
    try {
        const response = await instance.get(`api/image/${productId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteImageProduct = async (imageIds: string[]) => {
    console.log(imageIds)
    try {
        const response = await instance.delete(`api/image/deleteImages`, {
            data: {
                imageIds
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}
