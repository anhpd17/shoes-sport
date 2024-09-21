import React, { useEffect } from 'react'

import styles from './index.module.css'
import classNames from 'classnames'
import { useLocalStorage } from '@/hooks/useStorage'
import { useAccountMutation, useAccountQuery } from '@/hooks/useAccount'
import { Button, Form, Input, Select, message } from 'antd'
import Sidebar from './Sidebar'

const MyProfile = () => {
    const [user, setUser] = useLocalStorage('user', null)

    const { data, isSuccess } = useAccountQuery(user?._id)
    const { mutate } = useAccountMutation({
        action: 'USER_UPDATE',
        onSuccess: (res) => {
            message.success('Cập nhật thông tin thành công')
            setUser({
                ...user,
                ...res?.user
            })
        }
    })

    useEffect(() => {
        isSuccess && form.setFieldsValue(data?.user)
    }, [isSuccess])

    const [form] = Form.useForm()

    const onFinish = (formData: any) => {
        delete data?.user?.role
        delete data?.user?.block
        delete data?.user?.createdAt
        delete data?.user?.updatedAt

        mutate({
            ...data?.user,
            ...formData
        })
    }

    return (
        <div className={classNames('app-container', styles.container)}>
            <Sidebar />

            <div className={styles.content}>
                <h1 className={styles.title}>Tài khoản của bạn</h1>

                <Form form={form} layout='vertical' initialValues={{ gender: '' }} onFinish={onFinish}>
                    <Form.Item
                        label='Họ tên'
                        name='fullName'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ tên'
                            }
                        ]}
                    >
                        <Input placeholder='Họ tên' />
                    </Form.Item>

                    <Form.Item
                        label='Số điện thoại'
                        name='tel'
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
                    >
                        <Input placeholder='Số điện thoại' />
                    </Form.Item>

                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email'
                            },
                            {
                                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Email không đúng định dạng'
                            }
                        ]}
                    >
                        <Input placeholder='Email' />
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

                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Cập nhật tài khoản
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default MyProfile
