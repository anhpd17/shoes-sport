import { deleteProductFavorite, favoriteProduct, getProductFavorites } from '@/services/favoriteProduct'
import { useMutation, useQuery, useQueryClient } from 'react-query'

type useProductFavoriteMutationProps = {
    action: 'ADD' | 'DELETE'
    onSuccess?: (res?: any) => void
}

export const useProductFavoriteQuery = () => {
    const { data, error, ...rest } = useQuery({
        queryKey: ['PRODUCT_FAVORITE'],
        queryFn: () => getProductFavorites(),
        refetchOnReconnect: true,
        onError: (err: any) => {
            console.error('Error fetching product favorite data:', err)
        }
    })
    return { data, error, ...rest }
}

export const useProductFavoriteMutation = ({ action, onSuccess }: useProductFavoriteMutationProps) => {
    const queryClient = useQueryClient()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data: any) => {
            switch (action) {
                case 'ADD':
                    return await favoriteProduct(data)
                case 'DELETE':
                    return await deleteProductFavorite(data)
                default:
                    return null
            }
        },
        onSuccess: (res?: any) => {
            onSuccess && onSuccess(res)
            queryClient.invalidateQueries({
                queryKey: ['PRODUCT_FAVORITE']
            })
        },
        onError: () => {
            console.log('error')
        }
    })
    return {
        ...rest,
        mutate
    }
}
