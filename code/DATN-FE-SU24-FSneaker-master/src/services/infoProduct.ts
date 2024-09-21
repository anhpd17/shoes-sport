import instance from '@/core/api'

export const getInfoProduct = async (productId: string) => {
    const response = await instance.get(`api/infoProduct/${productId}`)
    return response.data
}
