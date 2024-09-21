import { getCategory, getCategorys, updateCategory } from '@/services/category'
import { useMutation, useQuery } from 'react-query'

export const useCategoryQuery = (categoryId?: string) => {
    const { data, error, ...rest } = useQuery({
        queryKey: categoryId ? ['CATEGORY', categoryId] : ['CATEGORY'],
        queryFn: () => (categoryId ? getCategory(categoryId) : getCategorys()),
        refetchOnReconnect: true,
        onError: (err) => {
            console.error('Error fetching category data:', err)
        }
    })
    return { data, error, ...rest }
}

export const useGetCategoryDetailQuery = (categoryId: string) => {
    const { data, error, ...rest } = useQuery({
        queryKey: ['CATEGORY', categoryId],
        queryFn: () => getCategory(categoryId),
        refetchOnReconnect: true,
        onError: (err) => {
            console.error('Error fetching category data:', err)
        }
    })
    return { data, error, ...rest }
}

export const useUpdateCategoryMutation = (data: any) => {
    return useMutation({
        mutationFn: (data: any) => updateCategory(data),
        onError: (err) => {
            console.error('Error updating category:', err)
        }
    })
}
