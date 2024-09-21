import { type ClassValue, clsx } from 'clsx'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export const formatPrice = (price: number) => {
    const formattedPrice = Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        currencyDisplay: 'code'
    }).format(price)
    const formattedPriceWithoutVND = formattedPrice.replace('VND', '')
    return `${formattedPriceWithoutVND}`
}

export const range = (start: number, end: number) => {
    const length = end - start + 1

    return Array.from({ length }, (_, idx) => idx + start)
}

export const onMutateError = (err: any) => {
    return toast.error(err.message)
}
