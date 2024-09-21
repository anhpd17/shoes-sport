import { ISize } from '@/common/type'
import { addSize, deleteSize, updateSize } from '@/services/size'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

type formControlDataType = {
    size: number
    slug: number
}

const formSchema = Joi.object({
    size: Joi.number().positive().messages({
        'number.base': 'Kích thước phải là một số',
        'number.empty': 'Vui lòng không bỏ trống',
        'number.positive': 'Kích thước phải lớn hơn 0',
        'any.required': 'Vui lòng không bỏ trống'
    }),
    slug: Joi.number().positive().messages({
        'number.base': 'Slug phải là một số',
        'number.empty': 'Vui lòng không bỏ trống',
        'number.positive': 'Slug phải lớn hơn 0',
        'any.required': 'Vui lòng không bỏ trống'
    })
})
type useSizeMutationProps = {
    action: 'ADD' | 'UPDATE' | 'DELETE'
    defaultValues?: ISize
    onSuccess?: () => void
}

export const useSizeMutation = ({ action, defaultValues = { size: 0, slug: 0 }, onSuccess }: useSizeMutationProps) => {
    const queryClient = useQueryClient()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (size: ISize) => {
            switch (action) {
                case 'ADD':
                    return await addSize(size)
                case 'UPDATE':
                    return await updateSize(size)
                case 'DELETE':
                    return await deleteSize(size)

                default:
                    return null
            }
        },
        onSuccess: () => {
            onSuccess && onSuccess()
            queryClient.invalidateQueries({
                queryKey: ['SIZE']
            })
        }
    })
    const form = useForm({
        resolver: joiResolver(formSchema),
        defaultValues
    })
    const onSubmit: SubmitHandler<formControlDataType> = (values) => {
        mutate(values)
    }

    const onRemove = (size: ISize) => {
        console.log(size)
        mutate(size)
    }
    return {
        form,
        onSubmit,
        onRemove,
        ...rest
    }
}
