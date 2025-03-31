import { ReactNode, useEffect, useRef } from 'react'
import useAppContext from '../hooks/UseAppContext'
import { useLocation } from 'react-router-dom';

type Props = {
  children: ReactNode
}

const ArticlePage = ({ children } : Props) => {
    const { sidebarOpen } = useAppContext();

    const { pathname } = useLocation();
    const scrollTop = useRef<HTMLElement>(null);

    useEffect(() => {
      window.scroll(0, 0);
      scrollTop.current?.scrollIntoView()
    }, [pathname])

  return (
    <main className={`fixed top-15 sm:top-0 w-full h-[calc(100%-3.75rem)] sm:h-full bg-light-home-page-background dark:bg-dark-home-page-background overflow-y-auto ${sidebarOpen === true ? 'sm:left-80 sm:w-[calc(100%-20rem)]' : 'sm:left-15 sm:w-[calc(100%-3.75rem)]'}`}>
      <span ref={scrollTop} />
      <section className='bg-light-background dark:bg-dark-background mx-2 my-2 p-4 rounded-md min-h-[calc(100%-1rem)]'>
        {children}
      </section>
    </main>
  )
}

export default ArticlePage