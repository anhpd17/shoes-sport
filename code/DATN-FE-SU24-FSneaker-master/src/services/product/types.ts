export interface IProduct {
    _id: string
    name: string
    price: number
    description: string
    image: string
    categoryId: any
    sizeId: { size: string }[]
    IdImages: string[]
    color: string
    importPrice: number
    promotionalPrice: number
    createdAt: Date
    updatedAt: Date
    detailID: string
}

export interface IProductDetail {
    _id: string,
    name: string,
    sizes: IProductSize[]
    productDetails: IProductDetailInfo[]
}
export interface IProductDetailInfo {
    importPrice: number,
    price: number,
    productDetailId: string,
    promotionalPrice: number
    quantity: number
    size: number
}

export interface IProductSize {
    "_id": string,
    "size": number,
    "quantity": number,
    "price": number,
    "importPrice": number,
    "promotionalPrice": number,
    "productDetailId": string
}
export interface IFNewOutStand {
    productId: string
    productDetailId: string
    productName: string
    totalQuantity: number
    price: number
    promotionalPrice: number
    image: string
}