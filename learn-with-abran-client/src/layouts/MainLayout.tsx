import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import ArticlePage from '../pages/ArticlePage'

const MainLayout = () => {

  return (
    <section className='text-light-foreground dark:text-dark-foreground font-sans'>
        <Header />
        <SideBar />
        <ArticlePage>
          <Outlet />
        </ArticlePage>
    </section>
  )
}

export default MainLayout