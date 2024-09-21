import { getProduct, getProducts } from '@/services/product'
import { useQuery } from 'react-query'

export const useProductQuery = (productId?:  string) => {
    const { data, ...rest } = useQuery({
        queryKey: productId ? ['PRODUCT', productId] : ['PRODUCT'],
        queryFn: () => (productId ? getProduct(productId) : getProducts()),
        refetchOnReconnect: true
        // refetchOnWindowFocus: false,
        // refetchOnMount: false
    })
    return { data, ...rest }
}