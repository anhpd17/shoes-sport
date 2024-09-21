export interface IFProductDetail {
    productDetailId: string
    quantity: number
    price: number
    importPrice: number
    promotionalPrice: number
    size: number
}

export interface IFProducts {
    nameProduct: string
    productId: string
    categoryId: string
    nameCategory: string
    descript: string
    filteredBySize: string
    filteredByCategory: string
    filteredByMinPrice: string
    filteredByMaxPrice: string
    images: Array<{ imageUrl: string; type: string }>
    productDetails: Array<IFProductDetail>
}
