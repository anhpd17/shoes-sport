import {
    addAccount,
    blockAccount,
    getAccount,
    getAccounts,
    unblockAccount,
    updateAccount,
    updateUser
} from '@/services/account'
import { useQuery } from 'react-query'
import { useMutation, useQueryClient } from 'react-query'
import { IAccount } from '@/common/type'

type useAccountMutationProps = {
    action: 'ADD' | 'UPDATE' | 'BLOCK' | 'USER_UPDATE' | 'UNBLOCK'
    defaultValues?: IAccount
    onSuccess?: (res?: any) => void
}

export const useAccountQuery = (accountId?: string) => {
    const { data, error, ...rest } = useQuery({
        queryKey: accountId ? ['ACCOUNT', accountId] : ['ACCOUNT'],
        queryFn: () => (accountId ? getAccount(accountId) : getAccounts()),
        refetchOnReconnect: true,
        onError: (err) => {
            console.error('Error fetching account data:', err)
        }
    })
    return { data, error, ...rest }
}

export const useAccountMutation = ({ action, onSuccess }: useAccountMutationProps) => {
    const queryClient = useQueryClient()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data: any) => {
            switch (action) {
                case 'ADD':
                    return await addAccount(data)
                case 'UPDATE':
                    return await updateAccount(data)
                case 'USER_UPDATE':
                    return await updateUser(data)
                case 'BLOCK':
                    return await blockAccount(data)
                case 'UNBLOCK':
                    return await unblockAccount(data)
                default:
                    return null
            }
        },
        onSuccess: (res?: any) => {
            onSuccess && onSuccess(res)
            queryClient.invalidateQueries({
                queryKey: ['ACCOUNT']
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
