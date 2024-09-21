import React, { useEffect } from 'react'

import styles from './index.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useAccountMutation, useAccountQuery } from '@/hooks/useAccount'
import { Button, Form, Input, Select, message } from 'antd'
import classNames from 'classnames'

const EditAccount = () => {
    const params = useParams()
    const navigate = useNavigate()

    const { data, isSuccess } = useAccountQuery(params?.id)

    const { mutate } = useAccountMutation({
        action: 'UPDATE',
        onSuccess: () => {
            message.success('Cập nhật tài khoản thành công')
            navigate('/admin/account')
        }
    })

    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue(data?.user)
    }, [isSuccess])

    const onFinish = (formData: any) => {
        mutate({
            _id: data?.user?._id,
            role: formData.role
        })
    }

    return (
        <div className={classNames(styles.container, styles.addForm)}>
            <Form layout='vertical' onFinish={onFinish} initialValues={{ gender: '', role: '' }} form={form}>
                <Form.Item label='Tên tài khoản' name='userName'>
                    <Input placeholder='Tên tài khoản' disabled />
                </Form.Item>

                <Form.Item label='Email' name='email'>
                    <Input placeholder='Email' disabled />
                </Form.Item>

                <Form.Item
                    label='Vai trò'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn vai trò'
                        }
                    ]}
                    name='role'
                >
                    <Select>
                        <Select.Option value=''>Select role</Select.Option>
                        <Select.Option value='admin'>Admin</Select.Option>
                        <Select.Option value='member'>Member</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Cập nhật tài khoản
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditAccount
