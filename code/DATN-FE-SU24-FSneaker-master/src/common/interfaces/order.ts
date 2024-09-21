export type IPaymentMethod = 'cod' | 'vnpay'

export type IOrderStatus = 'pending' | 'waiting' | 'delivering' | 'done' | 'cancel' | 'fail'

export type IPaymentStatus = 'unpaid' | 'paid'

export interface IOrder {
    _id: string
    name: string
    address: string
    phone: number
    user_id: {
        email: string
        userName: string
        _id: string
    }
    isRated: boolean
    productDetails: {
        image: string
        price: number
        productDetailId: string
        productId: string
        productName: string
        quantityOrders: number
        sizeId: string
        sizeName: string
    }[]
    codeOrders: string
    createdAt: Date
    orderStatus: IOrderStatus
    paymentMethod: IPaymentMethod
    paymentStatus: IPaymentStatus
    total_amount_paid: number
    total_price: number
    updatedAt: Date
}

export interface IOderByDateRange {
    productId: string
    productDetailId: string
    productName: string
    totalQuantity: number
    price: number
    promotionalPrice: number
    importPrice: number
    image: string
    date: Date
    // profit: number
    totalRevenue: number
}
