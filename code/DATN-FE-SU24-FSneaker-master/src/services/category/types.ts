import { IProduct } from '../product/types'

export interface ICategory {
    createdAt: string
    name: string
    products?: IProduct[]
    slug: string
    updatedAt: string
    _id: string
}
