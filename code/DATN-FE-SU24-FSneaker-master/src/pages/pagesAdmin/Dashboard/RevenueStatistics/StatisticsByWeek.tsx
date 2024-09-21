import { getOrdersByDateRange } from '@/services/order'
import { DatePicker } from 'antd'
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

const isSameDate = (date1: string, date2: string) => {
    return dayjs(date1).isSame(dayjs(date2), 'date')
}

const StatisticsByWeek = () => {
    const [currentWeek, setCurrentWeek] = useState(dayjs().startOf('week'))
    const [chartData, setChartData] = useState<{ date: string; totalRevenue: number }[]>([])

    const data = useMemo(() => {
        const labels = chartData.map((it) => dayjs(it.date).format('DD/MM'))

        const data = {
            labels,
            datasets: [
                {
                    label: 'Doanh thu',
                    data: chartData.map((it) => it.totalRevenue),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                }
            ]
        }

        return data
    }, [chartData.length])

    useEffect(() => {
        const startDate = dayjs(currentWeek.startOf('week')).format('YYYY-MM-DD')
        const endDate = dayjs(currentWeek.endOf('week')).format('YYYY-MM-DD')

        fetchData(startDate, endDate)
    }, [currentWeek])

    const fetchData = async (startDate: string, endDate: string) => {
        try {
            const res = await getOrdersByDateRange({ startDate, endDate })
            const data = res.data
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

            setChartData(data)
        } catch (error) {
            setChartData([])
        }
    }

    return (
        <div className='mb-4'>
            <div className='bg-white rounded-lg border'>
                <div className='px-3 py-4 border-b flex items-center justify-between'>
                    <p className='font-semibold'>Thống kê doanh thu theo tuần</p>

                    <DatePicker picker='week' onChange={setCurrentWeek} value={currentWeek} className='min-w-[300px]' />
                </div>

                <div className='p-3'>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>
    )
}

export default StatisticsByWeek
