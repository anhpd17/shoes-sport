import { IUser } from '@/common/type'
import instance from '@/core/api'

export const signup = async (user: IUser) => {
    try {
        const response = await instance.post(`api/auth/signup`, user)
        return response.data
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            throw new Error(error.response.data.message || 'Signup failed')
        }
        throw error
    }
}
