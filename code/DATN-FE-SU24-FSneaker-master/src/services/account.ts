import { IAccount } from '@/common/type'
import instance from '@/core/api'

export const getAccounts = async () => {
    try {
        const response = await instance.get('api/auth/get-all-account')
        return response.data.users
    } catch (error) {
        console.log(`['ACCOUNTS_ERROR']`, error)
    }
}

export const getAccount = async (id: string) => {
    try {
        const response = await instance.get(`api/auth/get-detail-account/${id}`)
        return response.data
    } catch (error) {
        console.log(`['FETCH_ACCOUNT_ERROR']`, error)
    }
}

export const addAccount = async (data: IAccount) => {
    try {
        const response = await instance.post('api/account/accounts', data)
        return response.data
    } catch (error) {
        console.log(`['ADD_ACCOUNT_ERROR']`, error)
    }
}

export const updateAccount = async ({ _id, ...data }: IAccount) => {
    try {
        const response = await instance.put(`api/auth/user-admin/${_id}`, data)
        return response.data
    } catch (error) {
        console.log(`['UPDATE_ACCOUNT_ERROR']`, error)
    }
}

export const updateUser = async ({ _id, ...data }: IAccount) => {
    try {
        const response = await instance.put(`api/auth/users/${_id}`, data)
        return response.data
    } catch (error) {
        console.log(`['UPDATE_ACCOUNT_ERROR']`, error)
    }
}

export const blockAccount = async (userId: string) => {
    try {
        const response = await instance.put(`api/auth/user-block/${userId}`)
        return response.data
    } catch (error) {
        console.log(`['BLOCK_ACCOUNT_ERROR']`, error)
    }
}

export const unblockAccount = async (userId: string) => {
    try {
        const response = await instance.put(`api/auth/user-unblock/${userId}`)
        return response.data
    } catch (error) {
        console.log(`['BLOCK_ACCOUNT_ERROR']`, error)
    }
}

export const changeAccountPassword = async ({ userId, ...data }: any) => {
    return instance.put(`api/auth/change-password/${userId}`, {
        ...data
    })
}
