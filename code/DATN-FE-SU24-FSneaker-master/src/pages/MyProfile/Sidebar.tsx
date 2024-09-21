import { Link } from 'react-router-dom'
import styles from './index.module.css'

const Sidebar = () => {
    const onLogout = () => {
        localStorage.removeItem('user')
        window.location.href = '/signin'
    }

    return (
        <div className={styles.sidebar}>
            <ul>
                <Link to='/profile' className={styles.sidebarItem}>
                    Cập nhật thông tin
                </Link>
                <Link to='/profile/change-password' className={styles.sidebarItem}>
                    Đổi mật khẩu
                </Link>

                <li className={styles.sidebarItem} onClick={onLogout}>
                    Đăng xuất
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
