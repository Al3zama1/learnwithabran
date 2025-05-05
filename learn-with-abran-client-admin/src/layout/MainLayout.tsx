import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

const MainLayout = () => {
  return (
    <section className='px-10'>
        <Header />
        <Toaster richColors />
        <Outlet />
    </section>
  )
}

export default MainLayout