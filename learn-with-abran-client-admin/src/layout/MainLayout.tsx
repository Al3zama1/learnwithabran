import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <section className='px-10'>
        <Header />
        <Outlet />
    </section>
  )
}

export default MainLayout