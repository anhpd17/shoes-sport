import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import { Button, Form, Input, message, Upload, UploadFile } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { FormProps } from 'antd/lib'
import { getBase64 } from '@/utils/common'
import EditorFormItem from './EditorFormItem'
import { useMutation } from 'react-query'
import instance from '@/core/api'

interface IFieldType {
    title: string
    desc: string
    img: UploadFile[]
    content: string
}

const AddPostPage = () => {
    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: any) => instance.post('/api/news/create-news', data),
        onSuccess: () => {
            message.success('Thêm bài viết thành công')
            navigate('/admin/post')
        },
        onError: (error: any) => {
            message.error(error?.message)
        }
    })

    const [showBtnUpload, setShowBtnUpload] = useState(true)
    const [form] = Form.useForm()

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e
        }
        return e?.fileList
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type='button'>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Thêm ảnh</div>
        </button>
    )

    const onFinish: FormProps<IFieldType>['onFinish'] = async ({ img, title, desc, content }) => {
        try {
            const image = await getBase64(img[0].originFileObj as any)

            const body = {
                img: image,
                title,
                desc,
                detailNew: {
                    title,
                    content
                }
            }

            mutate(body)
        } catch (error) {
            message.error('Có lỗi xảy ra, vui lòng thử lại')
        }
    }

    return (
        <div className={styles.container}>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-2xl'>Thêm bài viết</h1>

                <Link to='/admin/post'>
                    <Button type='primary'>DS bài viết</Button>
                </Link>
            </div>

            <Form form={form} onFinish={onFinish} layout='vertical'>
                <Form.Item
                    name='title'
                    label='Tiêu đề'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tiêu đề bài viết'
                        }
                    ]}
                >
                    <Input placeholder='Nhập tiêu đề bài viết' />
                </Form.Item>

                <Form.Item
                    name='desc'
                    label='Mô tả bài viết'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mô tả bài viết'
                        }
                    ]}
                >
                    <TextArea placeholder='Nhập mô tả bài viết' rows={4} />
                </Form.Item>

                <Form.Item
                    name='img'
                    label='Ảnh bìa'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
                >
                    <Upload
                        showUploadList={{
                            showPreviewIcon: false
                        }}
                        accept='.png, .jpeg, .jpg'
                        listType='picture-card'
                        beforeUpload={() => false}
                        maxCount={1}
                        multiple={false}
                        onChange={() => {
                            if (form.getFieldValue('img')?.length !== 0 || !form.getFieldValue('img')) {
                                setShowBtnUpload(false)
                            } else {
                                setShowBtnUpload(true)
                            }
                        }}
                    >
                        {showBtnUpload && uploadButton}
                    </Upload>
                </Form.Item>

                <Form.Item
                    name='content'
                    label='Nội dung bài viết'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập nội dung bài viết'
                        }
                    ]}
                >
                    <EditorFormItem />
                </Form.Item>

                <Button htmlType='submit' type='primary' className='mt-4' loading={isLoading}>
                    Thêm bài viết
                </Button>
            </Form>
        </div>
    )
}

export default AddPostPage
