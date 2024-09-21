import { Link } from 'react-router-dom'
import styles from './index.module.css'
import { Button, Image, message, Popconfirm, Table, TableProps } from 'antd'
import { useMutation, useQuery } from 'react-query'
import instance from '@/core/api'
import dayjs from 'dayjs'
import { queryClient } from '@/main'

interface IDataType {
    _id: string
    title: string
    img: string
    desc: string
    detailNew: {
        date: string
    }[]
}

const ListPostPage = () => {
    const { data } = useQuery({
        queryKey: ['POST'],
        queryFn: () => instance.get('/api/news/get-all-news')
    })

    const { mutate } = useMutation({
        mutationFn: (id: string) => instance.delete(`/api/news/delete-news/${id}`),
        onSuccess: () => {
            message.success('Delete post successfully')
            queryClient.invalidateQueries({
                queryKey: ['POST']
            })
        }
    })

    const columns: TableProps<IDataType>['columns'] = [
        {
            title: 'STT',
            key: 'stt',
            render: (_, __, index) => index + 1
        },
        {
            title: 'Title',
            key: 'title',
            dataIndex: 'title'
        },
        {
            title: 'Thumbnail',
            key: 'thumbnail',
            dataIndex: 'img',
            render: (img) => {
                return <Image src={img} height={100} width={100} className='object-cover' />
            }
        },
        {
            title: 'Author',
            key: 'author',
            dataIndex: 'author'
        },
        {
            title: 'Created Date',
            key: 'created',
            render: (_, record) => {
                return dayjs(record.detailNew[0].date).format('DD/MM/YYYY HH:mm:ss')
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => {
                return (
                    <div className='flex gap-x-2 items-center'>
                        <Link to={`/admin/post/${record._id}/edit`}>Edit</Link>

                        <Popconfirm
                            title='Delete this post?'
                            description='Are you sure you want to delete this post?'
                            onConfirm={() => mutate(record._id)}
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]

    return (
        <div className={styles.container}>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-2xl'>Danh sách bài viết</h1>

                <Link to='/admin/post/add'>
                    <Button type='primary'>Thêm bài viết</Button>
                </Link>
            </div>

            <Table dataSource={data?.data?.data} columns={columns} rowKey='_id' />
        </div>
    )
}

export default ListPostPage
