import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <section className='text-light-foreground dark:text-dark-foreground font-sans'>
        <Header />
        <SideBar />
        <Outlet />
    </section>
  )
}

export default MainLayout