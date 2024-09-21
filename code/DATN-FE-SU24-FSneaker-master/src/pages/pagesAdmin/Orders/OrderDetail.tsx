import { IOrder, IOrderStatus } from '@/common/interfaces/order'
import { IOderHistory } from '@/common/interfaces/product'
import Detail from '@/components/crud/detail'
import { ORDER_PAYMENT_NAMES, ORDER_PAYMENT_STATUS_NAMES, ORDER_STATUS_NAMES } from '@/constants/data'
import { formatPrice } from '@/lib/utils'
import { getOrder, getOrderHistory, updateOrder } from '@/services/order'
import { getOrderStatusOptions } from '@/utils/getOrderStatusOptions'
import { AntDesignOutlined } from '@ant-design/icons'
import {
    Avatar,
    Descriptions,
    DescriptionsProps,
    Form,
    Input,
    List,
    Modal,
    Select,
    Space,
    StepProps,
    Steps,
    Typography,
    message
} from 'antd'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
interface FieldType {
    code: string
    createdAt: string
    updatedAt: string
    paymentType: string
    totalAmountPaid: string
    totalPrice: string
    orderStatus: string
    paymentStatus: string
    address: string
    name: string
}

const OrderDetail = () => {
    const { orderId } = useParams()
    const [form] = Form.useForm()
    const [formOrderStatus] = Form.useForm()

    const selectedValue = Form.useWatch('newStatus', formOrderStatus)
    const [hasCancel, setHasCancel] = useState(false)

    const [data, setData] = useState<IOrder>()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [history, setHistory] = useState<IOderHistory[]>([])

    const [note, setNote] = useState('')

    const onNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(event.target.value)
    }

    const fetchOrder = async () => {
        const res = await getOrder(orderId)
        if (res?.data) {
            console.log(res.data)
            const data: IOrder = res.data
            setData(data)
            form.setFieldsValue({
                name: data.name,
                code: data.codeOrders,
                createdAt: data?.createdAt && dayjs(data.createdAt).format('HH:MM DD-MM-YYYY'),
                updatedAt: data?.updatedAt && dayjs(data.updatedAt).format('HH:MM DD-MM-YYYY'),
                paymentType: data?.paymentMethod && ORDER_PAYMENT_NAMES[data.paymentMethod],
                totalAmountPaid: data?.total_amount_paid && formatPrice(data.total_amount_paid),
                totalPrice: data?.total_price && formatPrice(data.total_price),
                orderStatus: data?.orderStatus && ORDER_STATUS_NAMES[data.orderStatus],
                paymentStatus: data?.paymentStatus && ORDER_PAYMENT_STATUS_NAMES[data.paymentStatus]
            })

            formOrderStatus.setFieldValue('newStatus', data?.orderStatus && data.orderStatus)
            const historyData = data?.statusHistory

            const findNote = historyData?.find((e) => e.note && e.status === 'cancel')
            if (findNote) {
                setNote(findNote.note)
                setHasCancel(true)
            }

            setHistory(historyData?.reverse())
        }
    }

    const fetchOrderHistory = async () => {
        // const res = await getOrderHistory(orderId)
        // if (res?.statusHistory) {
        //     const data: IOderHistory[] = res?.statusHistory
        //     setHistory(data?.reverse())
        // }
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    // useEffect(() => {
    //     fetchOrderHistory()
    // }, [])

    const items: DescriptionsProps['items'] = [
        {
            label: 'Khách hàng',
            children: data?.user_id?.userName
        },
        {
            label: 'Số điện thoại',
            children: '0' + data?.phone
        },
        {
            label: 'Địa chỉ',
            children: data?.address
        }
    ]

    const handlePressEditStatus = () => {
        setIsModalOpen(true)
    }

    const handleOk = async () => {
        const newStatus: IOrderStatus = formOrderStatus.getFieldValue('newStatus')

        try {
            const response = await updateOrder(data._id, {
                orderStatus: newStatus,
                note: note
            })
            const newOrderData: IOrder = response?.data

            if (newOrderData) {
                form.setFieldsValue({
                    orderStatus: ORDER_STATUS_NAMES[newOrderData.orderStatus],
                    paymentStatus: ORDER_PAYMENT_STATUS_NAMES[newOrderData.paymentStatus]
                })
                const newData = { ...data, orderStatus: newOrderData.orderStatus } as IOrder
                setData(newData)
                setIsModalOpen(false)
                fetchOrder()
            }
        } catch (error: any) {
            message.error(error?.message)
            handleCancel()
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        formOrderStatus.setFieldValue('newStatus', ORDER_STATUS_NAMES[data?.orderStatus as IOrderStatus])
        setNote('')
    }

    const renderForm = () => {
        return (
            <>
                <Form form={form} layout='vertical'>
                    <Form.Item<FieldType> name='name' label='Người nhận hàng'>
                        <Input readOnly disabled />
                    </Form.Item>
                    <Form.Item<FieldType> name='createdAt' label='Ngày tạo đơn'>
                        <Input readOnly disabled />
                    </Form.Item>

                    <Form.Item<FieldType> name='paymentType' label='Hình thức thanh toán'>
                        <Input readOnly disabled />
                    </Form.Item>
                    {/* <Form.Item<FieldType> name='totalAmountPaid' label='Tổng số tiền thanh toán'>
                        <Input readOnly disabled />
                    </Form.Item> */}
                    <Form.Item<FieldType> name='totalPrice' label='Tống số tiền thanh toán'>
                        <Input readOnly disabled />
                    </Form.Item>
                    <Form.Item<FieldType> name='orderStatus' label='Trạng thái'>
                        <Input
                            readOnly
                            disabled
                            addonAfter={
                                <Typography.Link onClick={handlePressEditStatus}>Thay đổi trạng thái</Typography.Link>
                            }
                        />
                    </Form.Item>
                    <Steps direction='vertical' progressDot current={0} status={getStatus} items={steps} />
                    <br />
                    <br />
                    <Form.Item<FieldType> name='paymentStatus' label='Trạng thái thanh toán'>
                        <Input readOnly disabled />
                    </Form.Item>
                </Form>
                <Typography>Danh sách sản phẩm:</Typography>
                <List
                    itemLayout='horizontal'
                    dataSource={data?.productDetails}
                    renderItem={(item, index) => (
                        <List.Item extra={item.quantityOrders && `x${item.quantityOrders}`}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        src={item.image}
                                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 64, xxl: 64 }}
                                        icon={<AntDesignOutlined />}
                                    />
                                }
                                title={`${item.productName}` + (item.sizeName && ' (size ' + `${item.sizeName}` + ')')}
                                description={item?.price && formatPrice(item.price)}
                            />
                        </List.Item>
                    )}
                />
            </>
        )
    }

    const getStatus: StepProps['status'] = useMemo(() => {
        if (history?.length !== 0) {
            const statuses: Record<IOrderStatus, StepProps['status']> = {
                pending: 'process',
                waiting: 'wait',
                delivering: 'process',
                done: 'finish',
                fail: 'error',
                cancel: 'error'
            }
            return statuses?.[history?.[0]?.status] ?? undefined
        }
        return undefined
    }, [history])

    const steps = useMemo(() => {
        const reversedHistory = [...history].reverse()
        const stepsData = reversedHistory.map((item, index) => {
            const previousStatus = index > 0 ? reversedHistory[index - 1].status : 'Chờ xác nhận'
            return {
                title: `${
                    previousStatus !== 'Chờ xác nhận' ? ORDER_STATUS_NAMES[previousStatus] : previousStatus
                } --> ${ORDER_STATUS_NAMES[item.status]}`,
                description: (
                    <div>
                        <div>Thời gian: {dayjs(item?.timestamp).format('HH:mm DD-MM-YYYY')}</div>
                        <div>Được thay đổi bởi: {item.adminName}</div>
                        {item?.note && <div>Ghi chú: {item?.note}</div>}
                    </div>
                )
            }
        })
        return stepsData.reverse() // Đảo ngược lại danh sách các bước để hiển thị từ cuối lên đầu
    }, [history])

    return (
        <Detail name='Đặt hàng'>
            <Descriptions
                column={{
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 3,
                    xl: 3,
                    xxl: 3
                }}
                title={`Chi tiết đơn hàng: ${data?.codeOrders ?? ''}`}
                items={items}
            />
            {renderForm()}
            {isModalOpen && (
                <Modal title='Trạng thái đơn hàng' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form form={formOrderStatus} layout='vertical'>
                        <Form.Item name='newStatus'>
                            <Select
                                fieldNames={{
                                    value: 'value',
                                    label: 'text'
                                }}
                                options={data && getOrderStatusOptions(data)}
                                placeholder='Vui lòng chọn'
                            />
                        </Form.Item>
                        {!hasCancel && selectedValue === 'cancel' && (
                            <Input.TextArea
                                placeholder='lý do...'
                                value={note}
                                onChange={onNoteChange}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                        )}
                    </Form>
                </Modal>
            )}
        </Detail>
    )
}

export default OrderDetail
