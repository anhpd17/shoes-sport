import { Breadcrumb, Button, Card, Row, Spin, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

export interface DetailProps {
    name?: string
    children?: React.ReactNode
    isLoading?: boolean
}

const Detail: React.FC<DetailProps> = (props) => {
    const navigate = useNavigate()
    const { children, name, isLoading } = props

    const location = useLocation()
    const pathSegments = location.pathname.split('/')
    const mainSegment = pathSegments[2]

    const previousPage = location.state && location.state.from

    const goBack = () => {
        // navigate(`/admin/${mainSegment}`)
        navigate(-1)
    }

    return (
        <div className='border p-6'>
            <Breadcrumb
                items={[
                    {
                        title: <Link to={`/admin/${mainSegment}`}>Quản lý {name?.toLocaleLowerCase()}</Link>
                    },

                    {
                        title: 'Chi tiết'
                    }
                ]}
            />
            <Button type='text' size='large' icon={<ArrowLeftOutlined />} onClick={goBack}>
                Chi tiết {name?.toLocaleLowerCase()}
            </Button>
            <Card className='mt-4'>
                {isLoading && <Spin className='flex items-center justify-center h-full' />}
                {!isLoading && children}
            </Card>
        </div>
    )
}

export default Detail
