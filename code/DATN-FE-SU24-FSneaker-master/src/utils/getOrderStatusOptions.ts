import { IOrder, IOrderStatus } from '@/common/interfaces/order'
import { ORDER_STATUS_NAMES } from '@/constants/data'

interface StatusFilterItem {
    value: IOrderStatus
    text: string
}

const ORDER_STATUS_FILTERS: StatusFilterItem[] = [
    { text: ORDER_STATUS_NAMES.pending, value: 'pending' },
    { text: ORDER_STATUS_NAMES.waiting, value: 'waiting' },
    { text: ORDER_STATUS_NAMES.delivering, value: 'delivering' },
    { text: ORDER_STATUS_NAMES.done, value: 'done' },
    { text: ORDER_STATUS_NAMES.fail, value: 'fail' },
    { text: ORDER_STATUS_NAMES.cancel, value: 'cancel' }
]

export const getOrderStatusOptions = (currentOrder: IOrder) => {
    return ORDER_STATUS_FILTERS.map((e) => {
        const validTransitions: Record<IOrderStatus, IOrderStatus[]> = {
            pending: ['waiting','cancel'],
            waiting: ['delivering'],
            delivering: ['done', 'fail'],
            done: [],
            fail: [],
            cancel: []
        }

        const disabled = !(currentOrder && validTransitions[currentOrder.orderStatus].includes(e.value))

        return {
            ...e,
            disabled: disabled
        }
    })
}
