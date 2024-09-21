import instance from '@/core/api'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export interface INews {
    _id: string
    img: string
    title: string
    desc: string
    detailNew: [
        {
            date: string
            title: string
            content: string
        }
    ]
    author: string
}

const NewsItem = ({ data }: { data?: INews }) => {
    return (
        <div className='bg-white rounded-md shadow-sm border border-neutral-100'>
            <div className='relative overflow-hidden rounded-tl-md rounded-tr-md'>
                <Link to={`/news/${data?._id}`}>
                    <img
                        src={data?.img}
                        alt=''
                        className='w-full aspect-video hover:scale-110 transition-all duration-500 object-cover'
                    />
                </Link>
            </div>
            <div className='px-4 py-3 text-neutral-400'>
                <div className='border-b border-neutral-100 pb-4 '>
                    <Link to={`/news/${data?._id}`} className='text-base font-semibold text-neutral-800 line-clamp-2'>
                        {data?.title}
                    </Link>
                    <p className='text-sm mt-2 line-clamp-2'>{data?.desc}</p>
                </div>
                <div className='pt-4 flex items-center justify-between text-sm'>
                    <span>{dayjs(data?.detailNew?.[0]?.date).format('DD [Tháng] MM, YYYY')}</span>
                    <Link to={`/news/${data?._id}`}>Xem thêm</Link>
                </div>
            </div>
        </div>
    )
}

const NewsList = () => {
    const { data } = useQuery({
        queryKey: ['POST'],
        queryFn: async () => {
            const res = await instance.get('/api/news/get-all-news')
            return res.data?.data
        }
    })
    return (
        <div>
            <h2 className='text-4xl font-semibold mb-6'>Bài viết mới nhất</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
                {data?.slice(0, 4).map((it: INews) => <NewsItem key={`news-item-${it._id}`} data={it} />)}
            </div>
        </div>
    )
}

export default NewsList
