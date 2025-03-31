import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import useAppContext from '../hooks/UseAppContext'
import ArticlePage from '../pages/ArticlePage'
import useScrollToTop from '../hooks/useScrollToTop'
import { useEffect, useRef } from 'react'

const MainLayout = () => {

  const {sidebarOpen} = useAppContext()
  const { pathname } = useLocation();
  const scrollTop = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scroll(0, 0);
    console.log(pathname);
    scrollTop.current?.scrollIntoView()
  }, [pathname])

  return (
    <section className='text-light-foreground dark:text-dark-foreground font-sans'>
        <Header />
        <SideBar />
        {/* <Outlet /> */}
        <ArticlePage>
          <Outlet />
        </ArticlePage>
 

        {/* <main className={`fixed top-15 sm:top-0 w-full h-[calc(100%-3.75rem)] sm:h-full bg-light-home-page-background dark:bg-dark-home-page-background overflow-y-auto ${sidebarOpen === true ? 'sm:left-80 sm:w-[calc(100%-20rem)]' : 'sm:left-15 sm:w-[calc(100%-3.75rem)]'}`}>
          <section className='bg-light-background dark:bg-dark-background mx-2 my-2 p-4 rounded-md min-h-[calc(100%-1rem)]'>
            <span ref={scrollTop}></span>
            <Outlet />
          </section>
        </main> */}
    </section>
  )
}

export default MainLayout