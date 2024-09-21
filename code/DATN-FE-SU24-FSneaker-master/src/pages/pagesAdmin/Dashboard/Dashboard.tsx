import { useEffect, useMemo, useState } from 'react'

import { Card, DatePicker, DatePickerProps, Segmented, SegmentedProps } from 'antd'
import { CategoryScale, Chart as ChartJS } from 'chart.js/auto'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekday from 'dayjs/plugin/weekday'
import { Bar } from 'react-chartjs-2'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { IOderByDateRange, IOrder, IOrderStatus } from '@/common/interfaces/order'
import instance from '@/core/api'
import { getOrders, getOrdersByDateRange } from '@/services/order'
import BestSellingProducts from './components/ProductStatistical'
import HighestProfitProducts from './components/TopProfit'
import HighestRevenueProducts from './components/TopRevenue'

dayjs.extend(isoWeek)
dayjs.extend(weekday)
ChartJS.register(CategoryScale)

type ITimeUnitType = 'date' | 'week' | 'month' | 'year'

interface IProfitGroupedValues {
    [key: string]: { total: number }
}

interface IProfitData {
    label: string
    total: number
}

interface IStatisticOrder {
    statusName: IOrderStatus | string
    statusQuantity: number
    classColor: string
    statusNameCode: string
}

interface IRevenueData {
    label: string
    totalRevenue: number
}

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'
const BAR_BG = 'rgba(54, 162, 235, 0.2)'

const Dashboard = () => {
    const [unitType, setUnitType] = useState<ITimeUnitType>('date')

    const [orders, setOrders] = useState<IOrder[]>([])
    const [statisticOrder, setStatisticOrder] = useState<IStatisticOrder[]>([])

    const [profitData, setProfitData] = useState<IProfitData[]>([])
    const [revenueData, setRevenueData] = useState<IRevenueData[]>([])

    const [date, setDate] = useState<dayjs.Dayjs>(dayjs())

    const options: SegmentedProps<ITimeUnitType>['options'] = [
        { label: 'Ngày', value: 'date' },
        { label: 'Tuần', value: 'week' },
        { label: 'Tháng', value: 'month' },
        { label: 'Năm', value: 'year' }
    ]

    const { startDate, endDate } = useMemo(() => {
        if (unitType === 'date') {
            return {
                startDate: dayjs(date).startOf('day').toISOString(),
                endDate: dayjs(date).endOf('day').toISOString()
            }
        } else
            return {
                startDate: dayjs(date.startOf(unitType)).format(DEFAULT_DATE_FORMAT),
                endDate: dayjs(date.endOf(unitType)).toISOString()
            }
    }, [date, unitType])

    const countOrderStatus = (orderList: any) => {
        const orderStatusCount: Record<IOrderStatus, number> = {
            pending: 0,
            waiting: 0,
            delivering: 0,
            done: 0,
            cancel: 0
        }

        // Duyệt qua từng object trong danh sách
        for (const order of orderList) {
            const orderStatus: IOrderStatus = order.orderStatus

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
            result.push({ statusName: parseName, statusQuantity, classColor, statusNameCode: statusName })
        }

        return result
    }

    useEffect(() => {
        fetchDataProfit()
    }, [date, unitType])

    useEffect(() => {
        fetchOrders()
    }, [])

    useEffect(() => {
        fetchRevenue()
    }, [date, unitType])

    const fetchProducts = async (endpoint: string, startDate: string, endDate: string) => {
        const url = `${endpoint}?startDate=${startDate}&endDate=${endDate}`

        try {
            const { data } = await instance.get(url)
            // console.log(`Data fetched from ${endpoint}:`, data)
            return data
        } catch (error) {
            console.error(`Error fetching data from ${endpoint}:`, error)
            throw new Error(error.response?.data?.message || 'Error fetching data')
        }
    }

    const fetchBestSellingProducts = () => fetchProducts('/api/order/top-5-product-best-seller', startDate, endDate)
    const fetchHighestRevenueProducts = () => fetchProducts('/api/order/top-revenue-product', startDate, endDate)
    const fetchHighestProfitProducts = () => fetchProducts('/api/order/topProfitableProducts', startDate, endDate)

    const { data: bestSellingProducts, isLoading: isLoadingBestSelling } = useQuery(
        ['bestSellingProducts', startDate, endDate],
        fetchBestSellingProducts,
        {
            enabled: !!startDate && !!endDate
        }
    )

    const { data: highestRevenueProducts, isLoading: isLoadingHighestRevenue } = useQuery(
        ['highestRevenueProducts', startDate, endDate],
        fetchHighestRevenueProducts,
        {
            enabled: !!startDate && !!endDate
        }
    )

    const { data: highestProfitProducts, isLoading: isLoadingHighestProfit } = useQuery(
        ['highestProfitProducts', startDate, endDate],
        fetchHighestProfitProducts,
        {
            enabled: !!startDate && !!endDate
        }
    )

    const fetchOrders = async () => {
        try {
            const response = await getOrders()
            const data = response?.data?.filter((item: any) => item)
            setOrders(data)
            let resultResolve = countOrderStatus(data)
            if (resultResolve) {
                setStatisticOrder(resultResolve)
            }
        } catch (error) {}
    }

    const fetchRevenue = async () => {
        try {
            const response = await getOrdersByDateRange({ startDate, endDate })
            const data = response?.data
            const tranform = tranformRevenueData(getLabels(), data as any)
            console.log(`Data after transform`, tranform)
            setRevenueData(tranform)
        } catch (error) {
            setRevenueData([])
        }
    }

    const fetchDataProfit = async () => {
        try {
            const response = await getOrdersByDateRange({ startDate, endDate })
            const data = response?.data
            const tranform = tranformProfitData(getLabels(), data as any)
            setProfitData(tranform)
        } catch (error) {
            setProfitData([])
        }
    }

    const tranformProfitData = (labels: string[], data: IOderByDateRange[]) => {
        let groupedValues = data?.reduce((acc: IProfitGroupedValues, obj) => {
            let format = unitType !== 'date' ? labelFormats[unitType] : 'HH'

            let key = dayjs(obj.date).format(format)
            if (!acc[key]) {
                acc[key] = { total: 0 }
            }
            const totalProfit = (obj.promotionalPrice - obj.importPrice) * obj.totalQuantity
            acc[key].total += isNaN(totalProfit) ? 0 : totalProfit
            return acc
        }, {})

        const profitData: IProfitData[] = labels.map((date) => ({
            label: date,
            total: groupedValues[date]?.total ?? 0
        }))

        return profitData
    }

    const tranformRevenueData = (labels: string[], data: IOderByDateRange[]) => {
        let groupedValues = data?.reduce((acc: IProfitGroupedValues, obj) => {
            let format = unitType !== 'date' ? labelFormats[unitType] : 'HH'

            let key = dayjs(obj.date).format(format)
            if (!acc[key]) {
                acc[key] = { total: 0 }
            }
            const totalRevenue = obj.totalRevenue
            acc[key].total += isNaN(totalRevenue) ? 0 : totalRevenue
            return acc
        }, {})

        const profitData: IRevenueData[] = labels.map((date) => ({
            label: date,
            totalRevenue: groupedValues[date]?.total ?? 0
        }))

        return profitData
    }

    const labelFormats: Record<ITimeUnitType, string> = {
        date: 'HH',
        week: 'DD-MM',
        month: 'DD',
        year: 'MM-YYYY'
    }

    const datePickerFormats: Record<ITimeUnitType, string> = {
        date: 'DD-MM-YYYY',
        week: 'wo-YYYY',
        month: 'MM-YYYY',
        year: 'YYYY'
    }

    const getLabels = (): string[] => {
        switch (unitType) {
            case 'date':
                return Array.from({ length: 24 }, (_, i) =>
                    dayjs(date).startOf('day').add(i, 'hour').format(labelFormats.date)
                )

            case 'week':
                return Array.from({ length: 7 }, (_, i) => {
                    const value = dayjs(date).isoWeekday(i + 1) // `+1` is start monday
                    return `${value.format(labelFormats.week)}`
                })

            case 'month':
                return Array.from({ length: dayjs(date).daysInMonth() }, (_, i) =>
                    dayjs(date).startOf('month').add(i, 'days').format(labelFormats.month)
                )

            case 'year':
                return Array.from({ length: 12 }, (_, i) => dayjs().month(i).format(labelFormats.year))
        }
    }

    const onChangeUnitType: SegmentedProps<ITimeUnitType>['onChange'] = (value) => {
        setDate(dayjs())
        setUnitType(value)
    }

    const onChangeDatePicker: DatePickerProps['onChange'] = (date, dateString) => {
        setDate(dayjs(date))
    }

    const revenueBarData = {
        labels: revenueData?.map((item) => item?.label),
        datasets: [
            {
                label: 'Doanh thu',
                data: revenueData?.map((item) => item?.totalRevenue),
                backgroundColor: BAR_BG
            }
        ]
    }

    const profitBarData = {
        labels: profitData?.map((item) => item?.label),
        datasets: [
            {
                label: 'Lợi nhuận',
                data: profitData?.map((item) => item?.total),
                backgroundColor: BAR_BG
            }
        ]
    }

    return (
        <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
            <Card title={'Thống kê trạng thái đơn hàng'}>
                <div className='grid grid-cols-3 gap-4 px-[24px] mb-6'>
                    {statisticOrder.map((statisticOrderItem, index) => {
                        return (
                            <Link to={`/admin/orders?status=${statisticOrderItem.statusNameCode}`}>
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
                            </Link>
                        )
                    })}
                </div>
            </Card>
            <br />
            <div>
                <Segmented<ITimeUnitType> value={unitType} options={options} onChange={onChangeUnitType} />
                <DatePicker
                    value={dayjs(date, DEFAULT_DATE_FORMAT)}
                    format={datePickerFormats[unitType]}
                    onChange={onChangeDatePicker}
                    picker={unitType}
                    allowClear={false}
                    inputReadOnly={true}
                />
            </div>
            <br />
            <Card title='Thống kê doanh thu'>
                <Bar data={revenueBarData} />
            </Card>
            <br />
            <Card title='Thống kê lợi nhuận'>
                <Bar data={profitBarData} />
            </Card>
            <Card>
                <div className='grid grid-cols-3 gap-4'>
                    <div>
                        <h2 className='text-lg font-bold mb-2'>Top 5 Sản Phẩm Bán Chạy Nhất</h2>
                        <BestSellingProducts products={bestSellingProducts} />
                    </div>
                    <div>
                        <h2 className='text-lg font-bold mb-2'>Top 5 Sản Phẩm Có Doanh Thu Cao</h2>
                        <HighestRevenueProducts products={highestRevenueProducts} />
                    </div>
                    <div>
                        <h2 className='text-lg font-bold mb-2'>Top 5 Sản Phẩm Có Lợi Nhuận Cao</h2>
                        <HighestProfitProducts products={highestProfitProducts} />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Dashboard
