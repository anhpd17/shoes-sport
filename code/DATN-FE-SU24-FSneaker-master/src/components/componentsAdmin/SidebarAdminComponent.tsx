import {
    FontSizeOutlined,
    LineHeightOutlined,
    PieChartOutlined,
    ProductOutlined,
    TeamOutlined,
    OrderedListOutlined,
    CommentOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/2-01.jpg'
type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
    { key: 'dashboard', icon: <PieChartOutlined />, label: <Link to='/admin/dashboard'>Thống kê</Link> },
    { key: 'products', icon: <ProductOutlined />, label: <Link to='/admin/products'>Quản lý sản phẩm</Link> },
    { key: 'orders', icon: <OrderedListOutlined />, label: <Link to='/admin/orders'>Quản lý đặt hàng</Link> },
    { key: 'reviews', icon: <CommentOutlined />, label: <Link to='/admin/reviews'>Quản lý đánh giá</Link> },
    {
        key: 'sub1',
        label: 'Quản lý thuộc tính',
        icon: <LineHeightOutlined />,
        children: [{ key: '5', icon: <FontSizeOutlined />, label: <Link to='/admin/size'>Quản lý Size</Link> }]
    },
    { key: '8', icon: <ProductOutlined />, label: <Link to='/admin/category'>Quản lý danh mục</Link> },
    {
        key: '11',
        icon: <TeamOutlined />,
        label: <Link to='/admin/account'>Quản lý tài khoản</Link>
    },
    {
        key: '12',
        icon: <ProductOutlined />,
        label: <Link to='/admin/post'>Quản lý bài viết</Link>
    }
]

const SidebarAdminComponent: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div style={{ width: 288 }}>
            <div className=''>
                <img src={logo} alt='' className='h-24' />
            </div>

            <Menu
                defaultSelectedKeys={['dashboard']}
                mode='inline'
                theme='dark'
                inlineCollapsed={collapsed}
                items={items}
                className='h-screen'
            />
        </div>
    )
}

export default SidebarAdminComponent
