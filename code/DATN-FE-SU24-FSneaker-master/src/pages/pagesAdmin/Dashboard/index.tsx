import { getOrders } from '@/services/order'
import type { DatePickerProps } from 'antd'
import { DatePicker, Select, Space, TableProps } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import StatisticalProduct from '../Statistical/Products'
import RevenueStatistics from './RevenueStatistics'

const { Option } = Select

type Props = {}
type PickerType = 'date' | 'week' | 'month' | 'year'
const PickerWithType = ({ type, onChange }: { type: PickerType; onChange: DatePickerProps['onChange'] }) => {
    if (type === 'date') return <DatePicker onChange={onChange} defaultValue={dayjs(new Date())} />
    return <DatePicker picker={type} onChange={onChange} />
}

const Dashboard = (props: Props) => {
    const [type, setType] = useState<PickerType>('date')
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    let timeFilterOrder = null
    interface IStatisticOrder {
        statusName: string
        statusQuantity: number
        classColor: string
    }
    const columns: TableProps<IStatisticOrder>['columns'] = [
        {
            title: 'Thống kê trạng thái đơn hàng',
            dataIndex: 'statusName',
            key: 'statusName'
        },
        {
            title: 'Số lượng',
            dataIndex: 'statusQuantity',
            key: 'statusQuantity',
            render: (value: any) => value
        }
    ]
    const [isLoading, setIsLoading] = useState(false)
    const [statisticOrder, setStatisticOrder] = useState<IStatisticOrder[]>([])

    const countOrderStatus = (orderList: any) => {
        const orderStatusCount = {
            pending: 0,
            waiting: 0,
            delivering: 0,
            done: 0,
            cancel: 0
        }

        // Duyệt qua từng object trong danh sách
        for (const order of orderList) {
            const orderStatus = order.orderStatus

            // Kiểm tra xem orderStatus đã có trong orderStatusCount chưa
            if (orderStatusCount[orderStatus]) {
                orderStatusCount[orderStatus] += 1
            } else {
                orderStatusCount[orderStatus] = 1
            }
        }

        // Chuyển đổi orderStatusCount thành danh sách
        const result = []
        for (const [statusName, statusQuantity] of Object.entries(orderStatusCount)) {
            let parseName = ''
            let classColor = ''
            switch (statusName) {
                case 'pending':
                    parseName = 'Chờ xác nhận'
                    classColor = '#495761'
                    break
                case 'waiting':
                    parseName = 'Đã xác nhận'
                    classColor = '#ea8034'
                    break
                case 'delivering':
                    parseName = 'Đang giao hàng'
                    classColor = '#2998f3'
                    break
                case 'done':
                    parseName = 'Đã hoàn thành'
                    classColor = '#4eaf46'
                    break
                case 'cancel':
                    parseName = 'Hủy bỏ'
                    classColor = '#c05258'
                    break
                case 'fail':
                    parseName = 'Giao hàng thất bại'
                    classColor = '#CC99FF'
                    break
                default:
                    parseName = statusName
                    classColor = '#000'
                    break
            }
            result.push({ statusName: parseName, statusQuantity, classColor })
        }

        return result
    }

    const fetchOrders = async () => {
        setIsLoading(true)
        const response = await getOrders()
        const data = response?.data?.filter((item: any) => item)
        setOrders(data)
        setFilteredOrders(data)
        let resultResolve = countOrderStatus(filteredOrders)
        if (resultResolve) {
            setStatisticOrder(resultResolve)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchOrders()
    }, [])
    const handleSelectWeek = (val: any) => {
        const startOfWeek = new Date(val.getTime())
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
        const endOfWeek = new Date(startOfWeek.getTime())
        endOfWeek.setDate(endOfWeek.getDate() + 6)
        let rangeWeek = {
            startDate: startOfWeek,
            endDate: endOfWeek
        }
        return rangeWeek
    }
    const handleFilterStatisticOrder = (val: any) => {
        switch (type) {
            case 'date':
                timeFilterOrder = new Date(val.$d)
                break
            case 'week':
                timeFilterOrder = handleSelectWeek(val.$d)
                break
            case 'month':
                timeFilterOrder = new Date(val.$d)
                break
            case 'year':
                timeFilterOrder = val.$y
                break
            default:
                timeFilterOrder = null
                break
        }
        handleFilterOrderByTime()
    }

    const handleFilterOrderByTime = () => {
        let resultResolve
        let filteredData
        switch (type) {
            case 'date':
                filteredData = orders.filter((order) => {
                    return new Date(order?.createdAt).toDateString() == timeFilterOrder?.toDateString()
                })
                resultResolve = countOrderStatus(filteredData)
                if (resultResolve) {
                    setStatisticOrder(resultResolve)
                }
                break
            case 'week':
                filteredData = orders.filter((order) => {
                    let isValidOrder =
                        new Date(order?.createdAt) > timeFilterOrder?.startDate &&
                        new Date(order?.createdAt) < timeFilterOrder?.endDate
                    return isValidOrder
                })
                resultResolve = countOrderStatus(filteredData)
                if (resultResolve) {
                    setStatisticOrder(resultResolve)
                }
                break
            case 'month':
                filteredData = orders.filter((order) => {
                    return new Date(order?.createdAt).getMonth() - 1 == timeFilterOrder?.getMonth() - 1
                })
                resultResolve = countOrderStatus(filteredData)
                if (resultResolve) {
                    setStatisticOrder(resultResolve)
                }
                break
            case 'year':
                filteredData = orders.filter((order) => {
                    return new Date(order?.createdAt).getFullYear() == timeFilterOrder
                })
                resultResolve = countOrderStatus(filteredData)
                if (resultResolve) {
                    setStatisticOrder(resultResolve)
                }
                break
            default:
                break
        }
    }

    return (
        <>
            <main>
                <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
                    {/* Thống kê đơn hàng */}
                    <div className='col-span-12 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-12 mb-4'>
                        <div className='pl-[12px] flex items-center justify-between'>
                            <h2 className='font-bold'>Thống kê trạng thái đơn hàng</h2>
                            <Space className='p-[12px] !px-[24px]' style={{ fontFamily: 'Roboto !important' }}>
                                <Select value={type} onChange={setType}>
                                    <Option value='date'>Ngày</Option>
                                    <Option value='week'>Tuần</Option>
                                    <Option value='month'>Tháng</Option>
                                    <Option value='year'>Năm</Option>
                                </Select>
                                <PickerWithType type={type} onChange={(value) => handleFilterStatisticOrder(value)} />
                            </Space>
                        </div>
                        <div className='grid grid-cols-3 gap-4 px-[24px] mb-6'>
                            {statisticOrder.map((statisticOrderItem, index) => {
                                return (
                                    <div
                                        key={statisticOrderItem.statusName}
                                        style={{ color: statisticOrderItem.classColor, boxShadow: '0 0 5px #efefef' }}
                                        className='flex items-center justify-between border border-1 border-gray-300 rounded-lg py-5 px-[36px]'
                                    >
                                        <div className='flex items-center gap-x-4'>
                                            <i
                                                className='fa-solid fa-tag text-[24px]'
                                                style={{ transform: 'scaleX(-1)' }}
                                            ></i>
                                            <p className='!text-black'>{statisticOrderItem.statusName}</p>
                                        </div>
                                        <p className='font-bold'>
                                            {statisticOrderItem.statusQuantity < 10
                                                ? `0${statisticOrderItem.statusQuantity}`
                                                : statisticOrderItem.statusQuantity.toString()}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <RevenueStatistics />

                    <StatisticalProduct />
                </div>
            </main>
        </>
    )
}

export default Dashboard
