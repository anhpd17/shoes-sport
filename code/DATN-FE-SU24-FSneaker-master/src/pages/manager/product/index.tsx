import { Outlet } from 'react-router-dom'

const ManagerProductPage = () => {
  return (
    <div>
        <h2>Quan li san pham</h2>
        <Outlet />
    </div>
  )
}

export default ManagerProductPage