import { IImageType } from './common'

export interface IImage {
    _id: string
    image: string
    productId: string
    type: IImageType
    createdAt: Date
    updatedAt: Date
}

export type IAddImageBody = Required<Pick<IImage, 'image' | 'productId' | 'type'>>

export interface IAddImageResponse {
    message: string
    data: IImage[]
}
