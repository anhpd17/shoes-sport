import React from 'react'

import styles from './index.module.css'
import { useNavigate } from 'react-router-dom'
import { useAccountMutation } from '@/hooks/useAccount'
import { Button, Form, Input, Select, message } from 'antd'
import classNames from 'classnames'

const getUserID = () => {
    const storedUser = localStorage.getItem('user')
    const user = storedUser ? JSON.parse(storedUser) : {}
    const userID = user?._id || ''
    return userID
}

const AddAccount = () => {
    const navigate = useNavigate()

    const { mutate } = useAccountMutation({
        action: 'ADD',
        onSuccess: () => {
            message.success('Thêm tài khoản thành công')
            navigate('/admin/account')
        }
    })

    const onFinish = (data: any) => {
        mutate({
            userId: getUserID(),
            ...data
        })
    }

    return (
        <div className={classNames(styles.container, styles.addForm)}>
            <Form layout='vertical' onFinish={onFinish} initialValues={{ gender: '', role: '' }}>
                <Form.Item
                    label='Tên tài khoản'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên tài khoản'
                        }
                    ]}
                    name='name'
                >
                    <Input placeholder='Tên tài khoản' />
                </Form.Item>

                <Form.Item
                    label='Số điện thoại'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại'
                        },
                        {
                            pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                            message: 'Số điện thoại không đúng định dạng'
                        }
                    ]}
                    name='phone'
                >
                    <Input placeholder='Số điện thoại' />
                </Form.Item>

                <Form.Item
                    label='Giới tính'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn giới tính'
                        }
                    ]}
                    name='gender'
                >
                    <Select>
                        <Select.Option value=''>Select gender</Select.Option>
                        <Select.Option value='male'>Male</Select.Option>
                        <Select.Option value='female'>Female</Select.Option>
                        <Select.Option value='other'>Other</Select.Option>
                    </Select>
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
                        Thêm tài khoản
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddAccount
