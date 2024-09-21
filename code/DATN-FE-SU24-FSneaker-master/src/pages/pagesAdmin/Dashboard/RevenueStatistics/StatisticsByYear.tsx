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

const StatisticsByYear = () => {
    const [currentYear, setCurrentYear] = useState(dayjs())
    const [chartData, setChartData] = useState<{ month: number; totalRevenue: number }[]>([])

    const data = useMemo(() => {
        const labels = chartData.map((it) => `T${it.month}`)

        const data = {
            labels,
            datasets: [
                {
                    label: 'Doanh thu',
                    data: chartData.map((it) => it.totalRevenue),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)'
                }
            ]
        }

        return data
    }, [chartData.length])

    useEffect(() => {
        const startDate = dayjs(currentYear.startOf('year')).format('YYYY-MM-DD')
        const endDate = dayjs(currentYear.endOf('year')).format('YYYY-MM-DD')

        fetchData(startDate, endDate)
    }, [currentYear])

    const fetchData = async (startDate: string, endDate: string) => {
        try {
            const res = await getOrdersByDateRange({ startDate, endDate })
            const data = res.data
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

            setChartData(data)
        } catch (error) {
            setChartData([])
        }
    }

    return (
        <div className='mb-4'>
            <div className='bg-white rounded-lg border'>
                <div className='px-3 py-4 border-b flex items-center justify-between'>
                    <p className='font-semibold'>Thống kê doanh thu theo năm</p>

                    <DatePicker picker='year' value={currentYear} onChange={setCurrentYear} />
                </div>

                <div className='p-3'>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>
    )
}

export default StatisticsByYear
