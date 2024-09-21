import { ICategory } from "@/common/type"
import { addCategory, deleteCategory, updateCategory } from "@/services/category"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"


type formControlDataType = {
    name:  string
    slug: string
    
}

const formSchema = Joi.object({
    name: Joi.string().trim().messages({
        'any.required': 'Vui lòng không bỏ trống'
    }),
    slug: Joi.string().trim().messages({
        'any.required': 'Vui lòng không bỏ trống'
    }),
})

type useCategoryMutationProps = {
    action: 'ADD' | 'UPDATE' | 'DELETE'
    defaultValues?: ICategory
    onSuccess?: () => void
}

export const useCategoryMutation = ({
    action,
    defaultValues = { name: '', slug: '' },
    onSuccess
}: useCategoryMutationProps) => {
    const queryClient = useQueryClient()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (category: ICategory) => {
            switch (action) {
                case 'ADD':
                    return await addCategory(category)
                case 'UPDATE':
                    return await updateCategory(category)
                case 'DELETE':
                    return await deleteCategory(category)

                default:
                    return null
            }
        },
        onSuccess: () => {
            onSuccess && onSuccess()
            queryClient.invalidateQueries({
                queryKey: ['CATEGORY']
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

    const onRemove = (category: ICategory) => {
        console.log(category)
        mutate(category)
    }
    return {
        form,
        onSubmit,
        onRemove,
        ...rest
    }
}