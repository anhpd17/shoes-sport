import styles from './index.module.css'
import classNames from 'classnames'
import { useLocalStorage } from '@/hooks/useStorage'
import { Button, Form, Input } from 'antd'
import Sidebar from './Sidebar'
import { changeAccountPassword } from '@/services/account'
import { toast } from 'react-toastify'

const ChangePassword = () => {
    const [user] = useLocalStorage('user', null)

    const [form] = Form.useForm()

    const onFinish = async (formData: any) => {
        try {
            await changeAccountPassword({ userId: user?._id, ...formData })
            toast.success('Đổi mật khẩu thành công')
            form.resetFields()
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className={classNames('app-container', styles.container)}>
            <Sidebar />

            <div className={styles.content}>
                <h1 className={styles.title}>Đổi mật khẩu</h1>

                <Form form={form} layout='vertical' onFinish={onFinish}>
                    <Form.Item
                        label='Mật khẩu hiện tại'
                        name='oldPassword'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu hiện tại'
                            }
                        ]}
                    >
                        <Input.Password placeholder='Mật khẩu hiện tại' />
                    </Form.Item>

                    <Form.Item
                        label='Mật khẩu mới'
                        name='newPassword'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu mới'
                            }
                        ]}
                    >
                        <Input.Password placeholder='Mật khẩu mới' />
                    </Form.Item>

                    <Form.Item
                        dependencies={['confirmPassword']}
                        label='Xác nhận mật khẩu'
                        name='confirmPassword'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập lại mật khẩu'
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (value && getFieldValue('newPassword') !== value) {
                                        return Promise.reject(new Error('Mật khẩu không khớp'))
                                    }

                                    return Promise.resolve()
                                }
                            })
                        ]}
                    >
                        <Input.Password placeholder='Nhập lại mật khẩu' />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ChangePassword
