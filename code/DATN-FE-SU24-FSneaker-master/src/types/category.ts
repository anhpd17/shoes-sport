export interface IFPRODUCT_DETAIL {
    productDetailId: string
    quantity: number
    price: number
    importPrice: number
    promotionalPrice: number
    size: number
}

export interface IFCATEGORY_DETAIL {
    nameProduct: string
    productId: string
    categoryId: string
    nameCategory: string
    descript: string
    filteredBySize: string
    filteredByCategory: string
    images: Array<{ imageUrl: string; type: string }>
    filteredByMinPrice: string
    filteredByMaxPrice: string
    productDetails: Array<IFPRODUCT_DETAIL>
}

