import { IProductDetail } from '@/common/interfaces/productDetail'
import { ISize } from '@/common/interfaces/size'
import { Button, Checkbox, Col, Form, Input, Modal, Row, Typography, notification } from 'antd'
import { useState } from 'react'

export interface ModalAddProductDetailVariantProps {
    sizes: ISize[]
    open: boolean
    onOk: (data: IProductDetail[]) => void
}

const ModalAddProductDetailVariant: React.FC<ModalAddProductDetailVariantProps> = (props) => {
    const { sizes, open, onOk } = props

    const options = sizes?.map((e) => {
        return {
            label: e.size,
            value: e._id
        }
    })

    const [form] = Form.useForm()
    const [checkedItems, setCheckedItems] = useState([])

    const onChange = (checkedValues) => {
        setCheckedItems(checkedValues)
    }

    const validateForm = async () => {
        try {
            const values = await form.validateFields()

            const formDataArray = checkedItems.map((item) => ({
                importPrice: Number(values[`importPrice__${item}`]),
                price: Number(values[`price__${item}`]),
                promotionalPrice: Number(values[`promotionalPrice__${item}`]),
                quantity: Number(values[`quantity__${item}`]),
                sizes: item
            }))

            onOk?.(formDataArray)
        } catch (errorInfo) {}
    }

    const getLabel = (id: string) => {
        const size = sizes?.find((e) => e._id == id)
        return `#${size?.size}`
    }

    return (
        <Modal
            title='Cấu hình biến thể sản phẩm'
            centered
            open={open}
            onOk={() => {
                if (checkedItems.length == 0) {
                    alert('Vui lòng chọn size')
                } else validateForm()
            }}
            okButtonProps={{ type: 'default' }}
            width={1000}
            closable={false}
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            <Form form={form}>
                <Checkbox.Group options={options} onChange={onChange} />
                <br />
                <br />
                {checkedItems.map((item) => (
                    <>
                        <Typography>{getLabel(item)}</Typography>
                        <br />
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name={`importPrice__${item}`}
                                    key={item}
                                    rules={[{ required: true, message: 'Nhập' }]}
                                >
                                    <Input type='number' min={0} placeholder='Giá nhập' />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name={`price__${item}`} rules={[{ required: true, message: 'Nhập' }]}>
                                    <Input type='number' min={0} placeholder='Giá niêm yiết' />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={`promotionalPrice__${item}`}
                                    rules={[{ required: true, message: 'Nhập' }]}
                                >
                                    <Input type='number' min={0} placeholder='Giá bán' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Col span={8}>
                            <Form.Item name={`quantity__${item}`} rules={[{ required: true, message: 'Nhập' }]}>
                                <Input type='number' min={0} placeholder='Số lượng' />
                            </Form.Item>
                        </Col>
                    </>
                ))}
            </Form>
        </Modal>
    )
}

export default ModalAddProductDetailVariant
