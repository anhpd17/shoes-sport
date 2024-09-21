import { IImageType } from './common'
import { IProductDetail } from './productDetail'

export interface IInfoProduct {
    nameProduct: string
    productId: string
    categoryId: string
    nameCategory: string
    descript?: string
    description?: string
    images: { imageUrl: string; type: IImageType; _id?: string }[]
    productDetails: Array<
        Omit<IProductDetail, '_id'> & {
            productDetailID: string
        }
    >
}
