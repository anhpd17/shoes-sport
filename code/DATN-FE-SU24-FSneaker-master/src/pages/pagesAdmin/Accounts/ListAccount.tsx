import { useMemo } from 'react'

import { Button, Popconfirm, Space, Table, Tag, message } from 'antd'
import type { TableProps } from 'antd'

interface DataType {
    _id: string
    key: string
    name: string
    phone: string
    role: 'admin' | 'member'
    gender: string
    createdAt: string
    block: boolean
}

import styles from './index.module.css'
import { useAccountMutation, useAccountQuery } from '@/hooks/useAccount'
import { Link } from 'react-router-dom'

const ListAccount = () => {
    const { data, refetch } = useAccountQuery()
    const { mutate } = useAccountMutation({
        action: 'BLOCK',
        onSuccess: () => {
            message.success('Block user thành công')
            refetch()
        }
    })

    const { mutate: onUnblock } = useAccountMutation({
        action: 'UNBLOCK',
        onSuccess: () => {
            message.success('Bỏ chặn user thành công')
            refetch()
        }
    })

    const dataSource = useMemo(() => {
        return data?.map((it: any) => ({ ...it, key: it._id }))
    }, [data])

    const confirm = async (userId: string) => {
        mutate(userId)
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'STT',
            key: 'stt',
            render: (_, __, index) => index + 1
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'userName',
            key: 'userName'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                return role === 'admin' ? <Tag color='green'>Admin</Tag> : <Tag color='geekblue'>Member</Tag>
            }
        },
        {
            title: 'Trạng thái',
            key: 'block',
            dataIndex: 'block',
            render: (block: boolean) => {
                return block ? 'Đã bị block' : 'Đang hoạt động'
            }
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <Link to={`/admin/account/${record._id}/edit`}>Edit</Link>
                    {record?.block ? (
                        <Popconfirm
                            title='Mở khoá tài khoản'
                            description='Xác nhận mở khoá tài khoản?'
                            onConfirm={() => onUnblock(record?._id)}
                            okText='Yes'
                            cancelText='No'
                        >
                            <Button type='primary'>Unlock</Button>
                        </Popconfirm>
                    ) : (
                        <Popconfirm
                            title='Khoá tài khoản'
                            description='Xác nhận khoá tài khoản?'
                            onConfirm={() => confirm(record?._id)}
                            okText='Yes'
                            cancelText='No'
                        >
                            <Button danger>Lock</Button>
                        </Popconfirm>
                    )}
                </Space>
            )
        }
    ]

    return (
        <div className={styles.container}>
            <Table columns={columns} dataSource={dataSource} />
        </div>
    )
}

export default ListAccount
