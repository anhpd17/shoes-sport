import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import '../../styles/HearderAdmin.css'
import { FaSearch } from 'react-icons/fa'
import Switch from './Switch'
import logo from '../../assets/1-01.png'

interface User {
    accessToken: string;
    address: string;
    block: boolean;
    createdAt: string;
    email: string;
    fullName: string;
    role: string;
    updatedAt: string;
    userName: string;
    _id: string;
}

const HeaderAdminComponents = ({ darkMode, toggleDarkMode }: any) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    if (!user) {
        return null; // Hoặc hiển thị loading spinner
    }

    return (
        <header className='hd__admin shadow-xl'>
            {/* <div className='hd__search'>
                <form className='form__search'>
                    <button className='form__search_button' type='submit'>
                        <FaSearch />
                    </button>
                    <input className='form__search_input' type='search' placeholder='Search...' />
                </form>
            </div> */}
            <div className='hd__func'>
                {/* <Switch darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> */}

                {/* <div className='notifycations'>
                    <div className='notica'>
                        <Icon icon='material-symbols:notifications-outline' />
                    </div>
                </div> */}
                {/* <div className='message'>
                    <div className='mess'>
                        <Icon icon='mi:message' />
                    </div>
                </div> */}
                <div className='profile'>
                    <div className='profile--info'>
                        <h2 className='profile-name'>{user.fullName}</h2>
                        <p className='profile-job'>{user.role}</p>
                    </div>
                    <div className='profile-img'>
                        <img src='https://picsum.photos/200/300' alt='' />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderAdminComponents
