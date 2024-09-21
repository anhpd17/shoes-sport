import instance from '@/core/api'
import { IFProducts } from '@/types/product'
import { IFSize } from '@/types/size.type'

export const getAllSize = async (): Promise<IFSize[]> => {
    const { data } = await instance.get('api/size')
    return data.data
}

export const getProductbySize = async (id: string, minPrice: number, maxPrice: number): Promise<IFProducts[]> => {
    const { data } = await instance.get(`api/infoProduct?minPrice=${minPrice}&maxPrice=${maxPrice}&size=${id}`)
    return data.data
}

export const filterCategoryBySize = async (
    idCate: string,
    idSize: string | null,
    minPrice: number,
    maxPrice: number
): Promise<IFProducts[]> => {
    if (idSize) {
        const { data } = await instance.get(
            `api/infoProduct?category=${idCate}&minPrice=${minPrice}&maxPrice=${maxPrice}&size=${idSize}`
        )
        return data.data
    } else {
        const { data } = await instance.get(
            `api/infoProduct?category=${idCate}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        )
        return data.data
    }
}
