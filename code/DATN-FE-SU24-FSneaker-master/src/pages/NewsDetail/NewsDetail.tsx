import { Link, useParams } from 'react-router-dom'
import { FaAngleDown } from 'react-icons/fa6'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import instance from '@/core/api'
import { INews } from '../HomePage/NewsList'

const RelatedPostItem = ({ data }: { data?: INews }) => {
    return (
        <div>
            <Link to={`/news/${data?._id}`}>
                <img src={data?.img} alt='Post thumbnail' className='aspect-video object-cover' />
            </Link>

            <Link to={`/news/${data?._id}`} className='line-clamp-2 text-[#333] uppercase mt-2'>
                {data?.title}
            </Link>

            <p className='line-clamp-2 my-2 text-[#333] text-sm'>{data?.desc}</p>

            <p className='text-sm text-[#74839f]'>{dayjs(data?.detailNew[0].date).format('DD [Tháng] MM, YYYY')}</p>
        </div>
    )
}

const NewsDetail = () => {
    const { id } = useParams()

    const { data: postDetail } = useQuery({
        queryKey: ['POST', id],
        queryFn: async () => {
            const res = await instance.get(`/api/news/get-detail-news/${id}`)
            return res.data?.data
        }
    })

    const { data: posts } = useQuery({
        queryKey: ['POST'],
        queryFn: async () => {
            const res = await instance.get('/api/news/get-all-news')
            return res.data?.data
        }
    })

    return (
        <>
            <div className='bg-[#f5f5f5]'>
                <div className='app-container flex items-center py-2 gap-x-2 text-sm text-[#333]'>
                    <Link to='/'>Trang chủ</Link>
                    <p className='text-[#ccc]'>/</p>
                    <p>Tin tức</p>
                    <p className='text-[#ccc]'>/</p>
                    <p>{postDetail?.title}</p>
                </div>
            </div>

            <div className='app-container'>
                <div className='grid grid-cols-12 py-8 gap-x-4'>
                    <div className='col-span-8'>
                        <h1 className='text-2xl text-[#333] mb-2'>{postDetail?.title}</h1>

                        <div className='flex items-center gap-x-3 text-sm text-[#74839f]'>
                            <p>bởi: {postDetail?.author}</p>

                            <p>&#x2022;</p>

                            <p>{dayjs(postDetail?.detailNew?.[0]?.date).format('DD [Tháng] MM, YYYY')}</p>
                        </div>

                        <img
                            src={postDetail?.img}
                            alt='Post thumbnail'
                            className='block mx-auto mt-6 w-1/2 h-72 object-cover'
                        />

                        <div
                            className='mt-4'
                            dangerouslySetInnerHTML={{ __html: postDetail?.detailNew?.[0]?.content }}
                        />

                        <div className='mt-6 border-t pt-3'>
                            <p className='text-2xl text-[#333] mb-4'>Bài viết liên quan</p>

                            <div className='mt-4 grid grid-cols-3 gap-3'>
                                {posts
                                    ?.slice(0, 3)
                                    ?.map((it: INews) => <RelatedPostItem key={`post-related-${it._id}`} data={it} />)}
                            </div>
                        </div>
                    </div>

                    <div className='col-span-4'>
                        <div className='shadow sticky top-9'>
                            <div className='flex items-center justify-between p-3 border-b border-b-[#e7e7e7]'>
                                <p className='text-[#333]'>Bài viết mới nhất</p>

                                <FaAngleDown />
                            </div>

                            <div className='py-3 px-4'>
                                {posts?.slice(0, 4)?.map((it: INews, index: number) => (
                                    <div
                                        key={`post-item-${it._id}`}
                                        className='py-2 flex items-center gap-x-3 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-dashed'
                                    >
                                        <Link className='block relative' to={`/news/${it._id}`}>
                                            <p className='absolute w-7 h-7 rounded-full flex items-center justify-center bg-[#333] top-1/2 -translate-y-1/2 text-white -translate-x-1/2 border border-white'>
                                                {index + 1}
                                            </p>

                                            <img
                                                src={it.img}
                                                alt='News thumbnail'
                                                className='w-[100px] h-14 object-cover'
                                            />
                                        </Link>

                                        <div className='flex-1'>
                                            <Link to={`/news/${it._id}`} className='line-clamp-2 text-sm text-[#333]'>
                                                {it.title}
                                            </Link>

                                            <p className='mt-2 text-xs'>
                                                <span className='text-[#333]'>Tin tức</span>
                                                <span className='text-[#74839f]'>
                                                    {' '}
                                                    - {dayjs(it.detailNew[0].date).format('DD.MM.YYYY')}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsDetail
