import { formSchema } from '@/common/Schema'
import { IUser } from '@/common/type'
import { signup } from '@/services/auth'
import { joiResolver } from '@hookform/resolvers/joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useLocalStorage } from './useStorage'
import { toast } from 'react-toastify'

type FormAuthType = {
    fullName: string
    tel: string
    email: string
    address: string
    password: string
    confirmPassword: string
}

type useAuthMutationProps = {
    action: 'SIGN IN' | 'SIGN UP'
    defaultValues?: FormAuthType
    onSuccess?: () => void
}

const useAuthMutation = ({
    action,
    defaultValues = { fullName: '', tel: '', email: '', address: '', password: '', confirmPassword: '' },
    onSuccess
}: useAuthMutationProps) => {
    const queryClient = useQueryClient()
    const [, setUser] = useLocalStorage('user', {})

    const { mutate, ...rest } = useMutation({
        mutationFn: async (user: IUser) => {
            switch (action) {
                case 'SIGN IN':
                    return
                case 'SIGN UP':
                    return await signup(user)
                default:
                    return null
            }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['auth'] })
            onSuccess && onSuccess()
            setUser(data)
        },
        onError: (error: any) => {
            toast.error(error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.')
        }
    })

    const form = useForm<FormAuthType>({
        resolver: joiResolver(formSchema),
        defaultValues
    })

    const onSubmit: SubmitHandler<FormAuthType> = (values) => {
        mutate(values as any)
    }

    return {
        form,
        onSubmit,
        ...rest
    }
}

export default useAuthMutation
