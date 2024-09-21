import { IOrderStatus, IPaymentMethod, IPaymentStatus } from '@/common/interfaces/order'

export const STATUS_PRODUCT = [
    {
        label: 'Hiện',
        value: 'Hiện'
    },
    {
        label: 'Ẩn',
        value: 'Ẩn'
    }
]

export const ORDER_STATUS_NAMES: Record<IOrderStatus, string> = {
    pending: 'Chờ xác nhận',
    waiting: 'Đã xác nhận',
    delivering: 'Đang giao hàng',
    done: 'Giao hàng thành công',
    fail: 'Giao hàng thất bại',
    cancel: 'Huỷ bỏ'
}

export const ORDER_STATUS_COLORS: Record<IOrderStatus, string> = {
    pending: 'warning',
    waiting: 'processing',
    delivering: 'cyan',
    done: 'success',
    cancel: 'error',
    fail: 'volcano'
}

export const ORDER_PAYMENT_NAMES: Record<IPaymentMethod, string> = {
    cod: 'Cod',
    vnpay: 'Vnpay'
}

export const ORDER_PAYMENT_STATUS_NAMES: Record<IPaymentStatus, string> = {
    unpaid: 'Chưa trả',
    paid: 'Đã trả'
}
