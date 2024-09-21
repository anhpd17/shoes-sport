import { IFProducts } from '@/types/product'

export const sortUpAscending = (arrayProduct: IFProducts[]) => {
    // Create a copy of the array before sorting
    const newArray = [...arrayProduct]
    newArray.sort((itemSortBefore: IFProducts, itemSortAfter: IFProducts) => {
        return itemSortBefore.productDetails[0].promotionalPrice - itemSortAfter.productDetails[0].promotionalPrice
    })
    return newArray // Return the new sorted array
}

export const sortDescending = (arrayProduct: IFProducts[]) => {
    // Create a copy of the array before sorting
    const newArray = [...arrayProduct]
    newArray.sort((itemSortBefore: IFProducts, itemSortAfter: IFProducts) => {
        return itemSortAfter.productDetails[0].promotionalPrice - itemSortBefore.productDetails[0].promotionalPrice
    })
    return newArray // Return the new sorted array
}
export const sortAtoZ = (arrayProduct: IFProducts[]) => {
    const newArray = [...arrayProduct]
    newArray.sort((a, b) => a.nameProduct.toLowerCase().localeCompare(b.nameProduct.toLowerCase()))
    return newArray
}
