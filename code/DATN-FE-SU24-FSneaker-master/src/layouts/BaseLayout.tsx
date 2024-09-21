
import { Outlet } from 'react-router-dom'
import Footer from './base/Footer'
import Header from './base/Header'

type Props = {}

const BaseLayout = (props: Props) => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default BaseLayout
