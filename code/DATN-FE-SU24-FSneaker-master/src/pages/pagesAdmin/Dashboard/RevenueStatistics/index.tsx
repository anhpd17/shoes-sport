import { getOrdersByDateRange } from '@/services/order'
import { DatePicker, Segmented } from 'antd'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart'
        }
    }
}
import { ConfigProvider } from 'antd'

import locale from 'antd/locale/vi_VN'

import 'dayjs/locale/vi'

dayjs.locale('vi')

enum ETabType {
    WEEK = 'WEEK',
    MONTH = 'MONTH',
    YEAR = 'YEAR'
}

const isSameDate = (date1: string, date2: string) => {
    return dayjs(date1).isSame(dayjs(date2), 'date')
}

const RevenueStatistics = () => {
    const [activeTab, setActiveTab] = useState(ETabType.WEEK)
    const [datePickerVal, setDatePickerVal] = useState(dayjs())
    const [chartData, setChartData] = useState<{ label: string; totalRevenue: number }[]>([])

    const { startDate, endDate } = useMemo(() => {
        const startDate = dayjs(datePickerVal.startOf(activeTab.toLowerCase() as dayjs.OpUnitType)).format('YYYY-MM-DD')
        const endDate = dayjs(datePickerVal.endOf(activeTab.toLowerCase() as dayjs.OpUnitType)).format('YYYY-MM-DD')

        return { startDate, endDate }
    }, [datePickerVal, activeTab])

    const data = useMemo(() => {
        const labels = chartData.map((it) => it.label)

        const data = {
            labels,
            datasets: [
                {
                    label: 'Doanh thu',
                    data: chartData.map((it) => it.totalRevenue),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)'
                }
            ]
        }

        return data
    }, [chartData.length])

    useEffect(() => {
        fetchData(startDate, endDate)
    }, [startDate, endDate])

    const fetchData = async (startDate: string, endDate: string) => {
        try {
            const res = await getOrdersByDateRange({ startDate, endDate })
            const month = dayjs(datePickerVal).get('month')
            const year = dayjs(datePickerVal).get('year')
            let data

            switch (activeTab) {
                case ETabType.WEEK:
                case ETabType.MONTH: {
                    data = res.data
                        .reduce<{ date: string; totalRevenue: number }[]>((res, curr) => {
                            const foundDate = res.find((it) => isSameDate(it.date, curr.date))

                            if (foundDate) {
                                res = res.map((it) =>
                                    isSameDate(it.date, foundDate.date)
                                        ? { ...it, totalRevenue: it.totalRevenue + foundDate.totalRevenue }
                                        : it
                                )
                            } else {
                                res = [
                                    ...res,
                                    {
                                        date: dayjs(curr.date).format('YYYY-MM-DD'),
                                        totalRevenue: curr.totalRevenue
                                    }
                                ]
                            }

                            return res
                        }, [])
                        .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))

                    const transformData = []
                    for (let i = dayjs(startDate).get('date'); i <= dayjs(endDate).get('date'); i++) {
                        transformData.push({
                            label: `${i}/${month + 1}/${year}`,
                            totalRevenue: data.find((it) => dayjs(it.date).get('date') === i)?.totalRevenue || 0
                        })
                    }

                    data = transformData
                    break
                }

                case ETabType.YEAR: {
                    data = res.data
                        .reduce<{ month: number; totalRevenue: number }[]>((res, curr) => {
                            const foundDate = res.find((it) => it.month === dayjs(curr.date).get('month') + 1)

                            if (foundDate) {
                                res = res.map((it) =>
                                    it.month === dayjs(foundDate.month).get('month') + 1
                                        ? { ...it, totalRevenue: it.totalRevenue + foundDate.totalRevenue }
                                        : it
                                )
                            } else {
                                res = [
                                    ...res,
                                    {
                                        month: dayjs(curr.date).get('month') + 1,
                                        totalRevenue: curr.totalRevenue
                                    }
                                ]
                            }

                            return res
                        }, [])
                        .sort((a, b) => a.month - b.month)

                    const transformData = []
                    for (let i = 1; i <= 12; i++) {
                        transformData.push({
                            label: `T${i}/${year}`,
                            totalRevenue: data.find((it) => it.month === i)?.totalRevenue || 0
                        })
                    }

                    data = transformData
                }
            }

            setChartData(data)
        } catch (error) {
            setChartData([])
        }
    }

    const onTabChange = (tab: any) => {
        setActiveTab(tab)
        setDatePickerVal(dayjs())
    }

    return (
        <ConfigProvider locale={locale}>
            <div className='mb-4'>
                <div className='bg-white rounded-lg border'>
                    <div className='px-3 py-4 border-b flex items-center justify-between'>
                        <p className='font-semibold'>Thống kê doanh thu bán hàng</p>

                        <div className='flex gap-x-3'>
                            <Segmented
                                value={activeTab}
                                options={[
                                    { label: 'Tuần', value: ETabType.WEEK },
                                    { label: 'Tháng', value: ETabType.MONTH },
                                    { label: 'Năm', value: ETabType.YEAR }
                                ]}
                                onChange={onTabChange}
                            />
                            <DatePicker
                                value={datePickerVal}
                                onChange={setDatePickerVal}
                                picker={activeTab.toLowerCase() as any}
                            />
                        </div>
                    </div>

                    <div className='p-3'>
                        <Bar options={options} data={data} />
                    </div>
                </div>
            </div>
        </ConfigProvider>
    )
}

export default RevenueStatistics
