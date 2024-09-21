import { Icon } from '@iconify/react'
import { useEffect, useState, useMemo } from 'react'
import instance from '@/core/api'
import { Rate, Select } from 'antd'
import { json } from 'stream/consumers'

const ProductComment = ({ productID }) => {
    const [comments, setComments] = useState([])
    const [selectedRate, setSelectedRate] = useState<number | null>(null)
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const response = await instance.get(`api/review/reviews/${productID}/list-review`)
        let reviews = response.data.data.reviews;
        let sortedReviews = reviews.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setComments(sortedReviews)
    }
    const filteredCommentByRating = useMemo(() => {
        if (selectedRate == null) {
            return comments;
        }
        return comments.filter(x => Number.parseFloat(x.rating) == selectedRate);
    }, [selectedRate, comments])

    const handleChange = (value: number | null) => {
        setSelectedRate(value)
    };
    return (
        <div>
            <Select
                className='mb-3 '
                defaultValue={null}
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                    { value: null, label: 'Tất cả' },
                    { value: 1, label: '1 sao' },
                    { value: 2, label: '2 sao' },
                    { value: 3, label: '3 sao' },
                    { value: 4, label: '4 sao' },
                    { value: 5, label: '5 sao' },
                ]}
            />
            <div className='flex flex-col space-y-4'>
                {filteredCommentByRating.length == 0 ? (
                    <div>Chưa có đánh giá nào</div>
                ) : (
                    filteredCommentByRating.map((cmt) => {
                        return (
                            <>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center'>
                                        <img
                                            src='https://picsum.photos/300/300'
                                            className='w-11 h-11 rounded-full'
                                            alt=''
                                        />

                                        <div className='flex-1 ml-3'>
                                            <h3 className='text-base font-semibold'>{cmt.idAccount.userName}</h3>
                                            <Rate allowHalf className='my-1' disabled value={Number.parseFloat(cmt.rating)} />
                                            <div className='text-sm'>{cmt.content}</div>
                                        </div>
                                    </div>
                                    <p>{new Date(cmt?.createdAt).toLocaleString()}</p>
                                </div>
                                <hr />
                            </>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default ProductComment
