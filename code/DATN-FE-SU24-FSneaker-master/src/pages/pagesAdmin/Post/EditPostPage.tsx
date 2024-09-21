import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './index.module.css'
import { Button, Form, Image, Input, message, Upload, UploadFile } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { FormProps } from 'antd/lib'
import { getBase64 } from '@/utils/common'
import EditorFormItem from './EditorFormItem'
import { useMutation, useQuery } from 'react-query'
import instance from '@/core/api'

interface IFieldType {
    title: string
    desc: string
    img: UploadFile[]
    content: string
}

const EditPostPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data } = useQuery({
        queryKey: ['POST', id],
        queryFn: () => instance.get(`/api/news/get-detail-news/${id}`)
    })

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: any) => instance.put(`/api/news/update-news/${id}`, data),
        onSuccess: () => {
            message.success('Cập nhật bài viết thành công')
            navigate('/admin/post')
        },
        onError: (error: any) => {
            message.error(error?.message)
        }
    })

    const [showBtnUpload, setShowBtnUpload] = useState(true)
    const [form] = Form.useForm()

    const [preview, setPreview] = useState('')

    useEffect(() => {
        if (data?.data) {
            const post = data?.data?.data

            setPreview(post?.img)

            form.setFieldsValue({
                title: post.title,
                desc: post.desc,
                content: post.detailNew[0].content
            })
        }
    }, [data?.data])

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
            let image = preview

            if (img && img.length) {
                image = await getBase64(img[0].originFileObj as any)
            }

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
                <h1 className='text-2xl'>Cập nhật bài viết</h1>

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

                <Form.Item name='img' label='Ảnh bìa' valuePropName='fileList' getValueFromEvent={normFile}>
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

                <div className='mb-4'>
                    <p>Preview</p>

                    <Image src={preview} alt='Preview' width={150} height={150} className='object-cover' />
                </div>

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
                    Cập nhật bài viết
                </Button>
            </Form>
        </div>
    )
}

export default EditPostPage
