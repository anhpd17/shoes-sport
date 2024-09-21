import { IOderByDateRange } from '@/common/interfaces/order'
import { getOrdersByDateRange } from '@/services/order'
import { DatePicker, DatePickerProps, Segmented, SegmentedProps } from 'antd'
import { CategoryScale, Chart as ChartJS } from 'chart.js/auto'
import dayjs from 'dayjs'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
ChartJS.register(CategoryScale)

type TimeUnit = 'week' | 'month' | 'year'
interface GroupedValues {
    [key: string]: { profit: number }
}

interface ChartData {
    label: string
    profit: number
}

export const ProfitStatistics: React.FC = () => {
    const [value, setValue] = useState<TimeUnit>('week')
    const [data, setData] = useState<ChartData[]>([])

    const [defaultValue, setDefaultValue] = useState<string>(moment().format('YYYY-MM-DD'))

    const getDateRange = () => {
        return {
            startDate: moment(defaultValue).startOf(value).format('YYYY-MM-DD'),
            endDate: moment(defaultValue).endOf(value).format('YYYY-MM-DD')
        }
    }

    const fommats: Record<TimeUnit, string> = {
        week: 'DD/MM',
        month: 'DD',
        year: 'MM-YYYY'
    }

    const getLabels = (): string[] => {
        switch (value) {
            case 'week':
                return Array.from({ length: 7 }, (_, i) => {
                    const date = moment().startOf('isoWeek').add(i, 'days')
                    return `${date.format(fommats.week)}`
                })

            case 'month':
                return Array.from({ length: moment().daysInMonth() }, (_, i) =>
                    moment().startOf('month').add(i, 'days').format(fommats.month)
                )
            case 'year':
                return Array.from({ length: 12 }, (_, i) => moment().month(i).format(fommats.year))
        }
    }

    const tranformData = (labels: string[], data: IOderByDateRange[]) => {
        // lưu dạng key value
        let groupedValues = data?.reduce((acc: GroupedValues, obj) => {
            let format = fommats[value]

            let key = moment(obj.date).format(format)
            if (!acc[key]) {
                acc[key] = { profit: 0 }
            }
            const profit = (obj.price - obj.importPrice) * obj.totalQuantity
            acc[key].profit += isNaN(profit) ? 0 : profit
            return acc
        }, {})

        const newData: ChartData[] = labels.map((date) => ({
            label: date,
            profit: groupedValues[date]?.profit ?? 0
        }))

        return newData
    }

    const getData = async () => {
        try {
            const response = await getOrdersByDateRange(getDateRange())
            const responseData = response?.data
            const tranform = tranformData(getLabels(), responseData)
            setData(tranform)
        } catch (error) {
            setData([])
        }
    }

    useEffect(() => {
        getData()
    }, [value, defaultValue])

    const options: SegmentedProps['options'] = useMemo(() => {
        return [
            { label: 'Tuần', value: 'week' },
            { label: 'Tháng', value: 'month' },
            { label: 'Năm', value: 'year' }
            // { label: 'Khoảng thời gian', value: 'date-range' }
        ]
    }, [])

    const datePickerFormats: Record<TimeUnit, string> = {
        week: 'wo-YYYY',
        month: 'MM-YYYY',
        year: 'YYYY'
    }

    const onChangeSelect: SegmentedProps<TimeUnit>['onChange'] = (value) => {
        setDefaultValue(moment().format('YYYY-MM-DD'))
        setValue(value)
    }

    const onChangeDatePicker: DatePickerProps['onChange'] = (date, dateString) => {
        setDefaultValue(moment(new Date(date as any)).format('YYYY-MM-DD'))
    }

    return (
        <div className='p-6'>
            <Segmented options={options} onChange={onChangeSelect} />
            <DatePicker
                value={dayjs(defaultValue, 'YYYY-MM-DD')}
                format={datePickerFormats[value]}
                onChange={onChangeDatePicker}
                picker={value}
                allowClear={false}
                inputReadOnly={true}
            />
            <Bar
                data={{
                    labels: data?.map((item) => item.label),
                    datasets: [
                        {
                            label: '',
                            data: data?.map((item) => item.profit)
                        }
                    ]
                }}
            />
        </div>
    )
}
