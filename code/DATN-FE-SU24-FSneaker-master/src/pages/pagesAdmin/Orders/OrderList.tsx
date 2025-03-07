import { IOrder, IOrderStatus, IPaymentMethod } from '@/common/interfaces/order'
import {
    ORDER_PAYMENT_NAMES,
    ORDER_PAYMENT_STATUS_NAMES,
    ORDER_STATUS_COLORS,
    ORDER_STATUS_NAMES
} from '@/constants/data'
import { formatPrice } from '@/lib/utils'
import { getOrders, updateOrder } from '@/services/order'
import { getOrderStatusOptions } from '@/utils/getOrderStatusOptions'
import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Badge, Button, Form, Input, Modal, Select, Space, Table, TableProps, Tag, message } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ORDER_PAYMENT_COLORS: Record<IPaymentMethod, string> = {
    cod: 'default',
    vnpay: 'success'
}

interface StatusFilterItem {
    value: IOrderStatus
    text: string
}

interface FieldType {
    status: string
}

const ORDER_STATUS_FILTERS: StatusFilterItem[] = [
    { text: ORDER_STATUS_NAMES.pending, value: 'pending' },
    { text: ORDER_STATUS_NAMES.waiting, value: 'waiting' },
    { text: ORDER_STATUS_NAMES.delivering, value: 'delivering' },
    { text: ORDER_STATUS_NAMES.done, value: 'done' },
    { text: ORDER_STATUS_NAMES.fail, value: 'fail' },
    { text: ORDER_STATUS_NAMES.cancel, value: 'cancel' }
]

const OrderList: React.FC = () => {
    // hooks
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const queryParams = new URLSearchParams(location.search)
    let statusCode = queryParams.get('status')

    // states
    const [data, setData] = useState<IOrder[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [status, setStatus] = useState<IOrderStatus[]>(statusCode || [])

    const [orderEdit, setOrderEdit] = useState<IOrder>()

    const [note, setNote] = useState('')
    const [isCancelValue, setIsCancelValue] = useState(false)

    const onNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(event.target.value)
    }

    const selectedValue = Form.useWatch('status', form)

    const fetchOrders = async () => {
        const params = {
            status: status
        }
        const response = await getOrders(params)

        if (response?.data) {
            setData(response?.data)
        } else {
            setData([])
        }
    }

    const columns: TableProps<IOrder>['columns'] = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'codeOrders',
            key: '_id'
        },
        {
            title: 'Ngày tạo đơn',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value: Date) => value && dayjs(value).format('HH:MM DD-MM-YYYY')
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'user_id',
            key: 'user_id',
            render: (value: IOrder['user_id']) => value && value?.userName
        },
        {
            title: 'Tổng số tiền thanh toán',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (value: IOrder['total_price']) => value && formatPrice(value)
        },
        {
            title: 'PT thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: (value: IOrder['paymentMethod']) => {
                if (!value) return null
                return <Tag color={ORDER_PAYMENT_COLORS[value]}>{value && ORDER_PAYMENT_NAMES[value]}</Tag>
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            filters: ORDER_STATUS_FILTERS,
            // onFilter: (value, record) => value === record.orderStatus,
            render: (value: IOrder['orderStatus']) => {
                if (!value) return null
                return <Tag color={ORDER_STATUS_COLORS[value]}>{value && ORDER_STATUS_NAMES[value]}</Tag>
            }
        },
        {
            title: 'Thanh toán',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',

            render: (value: IOrder['paymentStatus']) => {
                return (
                    <Badge status={value === 'paid' ? 'success' : 'default'} text={ORDER_PAYMENT_STATUS_NAMES[value]} />
                )
            }
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Space size='middle'>
                    <Button
                        onClick={() => {
                            navigateToDetail(record._id)
                        }}
                    >
                        <InfoCircleOutlined style={{ display: 'inline-flex' }} />
                    </Button>
                    <Button
                        onClick={() => {
                            onPressEditAction(record)
                        }}
                    >
                        <EditOutlined style={{ display: 'inline-flex' }} />
                    </Button>
                </Space>
            )
        }
    ]

    useEffect(() => {
        fetchOrders()
    }, [status])

    const onPressEditAction = (item: IOrder) => {
        setOrderEdit(item)
        form.setFieldValue('status', item.orderStatus)

        if (item?.orderStatus === 'cancel') {
            setIsCancelValue(true)
        } else {
            setIsCancelValue(false)
        }

        showModal()
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = async () => {
        const newStatus = form.getFieldValue('status')
        try {
            const response = await updateOrder(orderEdit._id, {
                orderStatus: newStatus,
                note: note
            })

            const newOrderData: IOrder = response?.data
            if (newOrderData) {
                handleCancel()

                const newArr: IOrder[] = data.map((item) => {
                    if (item._id === orderEdit?._id) {
                        return {
                            ...item,
                            orderStatus: newOrderData.orderStatus,
                            paymentStatus: newOrderData.paymentStatus
                        }
                    }
                    return item
                })
                setData(newArr)
            }
        } catch (error: any) {
            message.error(error?.message)
            handleCancel()
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const navigateToDetail = (id: string) => {
        navigate(`/admin/orders/detail/${id}`)
    }

    return (
        <div className='border p-6'>
            <Table<IOrder>
                onChange={(pagination, filters: any) => {
                    setStatus(filters.orderStatus)
                }}
                dataSource={data}
                columns={columns}
            />
            <Modal title='Trạng thái đơn hàng' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form}>
                    <Form.Item<FieldType> name='status'>
                        <Select
                            // value={orderEdit?.orderStatus}
                            fieldNames={{
                                value: 'value',
                                label: 'text'
                            }}
                            options={orderEdit && getOrderStatusOptions(orderEdit)}
                            placeholder='Vui lòng chọn'
                        />
                    </Form.Item>
                    {!isCancelValue && selectedValue === 'cancel' && (
                        <Input.TextArea
                            placeholder='lý do...'
                            value={note}
                            onChange={onNoteChange}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                    )}
                </Form>
            </Modal>
        </div>
    )
}

export default OrderList
