import { IOrderStatus, IPaymentStatus } from '@/common/interfaces/order'
import instance from '@/core/api'

export interface GetOrdersParams {
    status: IOrderStatus[]
}

export const getOrders = async (params?: GetOrdersParams) => {
    const response = await instance.get('api/order/orders', {
        params
    })
    return response.data
}

export const getOrder = async (orderId: string) => {
    const response = await instance.get(`api/order/orders/${orderId}`)
    return response.data
}

export interface UpdateOrderBody {
    orderStatus?: IOrderStatus
    note?: string
    // paymentStatus?: IPaymentStatus
}

export const updateOrder = async (orderId: string, order: UpdateOrderBody) => {
    // const response = await instance.patch(`api/order/update-order/${orderId}`, order)
    // return response.data
    const newOrder =
        order.orderStatus == 'done'
            ? {
                  orderStatus: order.orderStatus,
                  paymentStatus: 'paid'
              }
            : order
    const response = await instance.patch(`api/order/update-order/${orderId}`, newOrder)
    return response.data
}

export const getOrderHistory = async (orderId: string) => {
    const response = await instance.get(`api/order/order-history/${orderId}`)
    return response.data
}

interface IProductBestSellerResponse {
    message: string
    data: {
        date: string
        totalRevenue: number
    }[]
}

/**
 *
 * @param startDate YYYY-MM-DD
 * @param endDate YYYY-MM-DD
 */
export const getOrdersByDateRange = async ({
    startDate,
    endDate
}: {
    startDate: string
    endDate: string
}): Promise<IProductBestSellerResponse> => {
    const response = await instance.get(`api/order/product-best-seller`, {
        params: {
            startDate,
            endDate
        }
    })
    return response.data
}
