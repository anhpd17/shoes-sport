import Joi from 'joi'
import * as Yup from 'Yup'
export const formSchema = Joi.object({
    userName: Joi.string().min(6).required().messages({
        'string.min': ' it nhat 6 ki tu',
        'any.required': 'khong duoc de trong'
    }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.email': 'Email khong hop le',
            'any.required': 'Email khong duoc bo trong'
        }),
    password: Joi.string().min(6).max(32).required().messages({
        'string.min': 'Mat khau it nhat 6 ki tu',
        'string.max': 'Mat khau khong qua 32 ki tu',
        'any.required': 'khong duoc de trong'
    }),
    confirmPassword: Joi.string().min(6).max(32).required().messages({
        'string.min': 'Mat khau it nhat 6 ki tu',
        'string.max': 'Mat khau khong qua 32 ki tu',
        'any.required': 'khong duoc de trong'
    })
})

export const signinSchema = Yup.object({
    email: Yup.string().email('Email sai định dạng').trim().required('Vui lòng không để trống'),
    password: Yup.string()
        .min(6, 'Mật khẩu tối thiểu 6 ký tự')
        .max(32, 'Mật khẩu tối đa 32 ký tự')
        .required('Trường dữ liệu bắt buộc')
})
export type SigninForm = Yup.InferType<typeof signinSchema>

export interface IUser {
    id?: number
    userName: string
    email: string
    firstName: string
    lastName: string
    password: string
    address: string
    confirmPassword: string
    role: string
}

export interface ISize {
    _id?: string
    size: number
    slug: number
}

export interface ICategory {
    _id?: string
    name: string
    slug: string
}

export interface IAccount {
    _id?: string
    userId?: string
    name: string
    phone: string
    gender: string
    role: string
}
