import { ChevronDown } from 'lucide-react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import useAppContext from '../hooks/UseAppContext'


type Page = {
    pageTitle: string,
    link: string
}

type Section = {
    sectionTitle: string,
    pages: Page[]
}

type TableOfContents = Section[]

const tableOfContents : TableOfContents = [
    {
        sectionTitle: "Introduction",
        pages: [
            {
                pageTitle: 'Welcome',
                link: '/'
            }
        ]
    },
    {
        sectionTitle: 'Network Engineering',
        pages: [
            {
                pageTitle: 'Networking Basics',
                link: '/networking-basics'
            },
            // {
            //     pageTitle: 'Iterator',
            //     link: '/iterator'
            // },
            // {
            //     pageTitle: 'Builder',
            //      link: '/builder'
            // },
            // {
            //     pageTitle: 'Adapter',
            //     link: '/adapter'
            // },
            // {
            //     pageTitle: 'Facade',
            //     link: '/facade'
            // },
            // {
            //     pageTitle: 'Proxy',
            //     link: '/proxy'
            // },
            // {
            //     pageTitle: 'Dependency Injection',
            //     link: '/dependency-injection'
            // }
        ]
    },
    // {
    //     sectionTitle: 'Performance',
    //     pages: [
    //         {
    //             pageTitle: 'Laziness',
    //             link: '/laziness'
    //         },
    //         {
    //             pageTitle: 'Stream',
    //             link: '/stream'
    //         },
    //         {
    //             pageTitle: 'Pool',
    //             link: '/pool'
    //         },
    //         {
    //             pageTitle: 'Cache',
    //             link: '/cache'
    //         },
    //         {
    //             pageTitle: 'Look Up Table',
    //             link: '/look-up-table'
    //         }
    //     ]
    // },
    // {
    //     sectionTitle: 'Programming Languages',
    //     pages: [
    //         {
    //             pageTitle: 'Interpretation',
    //             link: '/interpretation'
    //         },
    //         {
    //             pageTitle: 'Compilation',
    //             link: '/compilation'
    //         },
    //         {
    //             pageTitle: 'JIT',
    //             link: 'jwt'
    //         },
    //         {
    //             pageTitle: 'Reference Type',
    //             link: '/reference-type'
    //         }, 
    //         {
    //             pageTitle: 'Value Types',
    //             link: '/value-types'
    //         },
    //         {
    //             pageTitle: 'Static Types',
    //             link: '/static-types'
    //         }
    //     ]
    // }
]

const SideBar = () => {

    const { sidebarOpen, setSidebarOpen } = useAppContext();

    useEffect(() => {
        if (window.innerWidth < 640) {
            setSidebarOpen(false)
        }
    }, []);

  return (
    <aside className={`fixed top-15 h-[calc(100%-3.75rem)] bg-light-background dark:bg-dark-background z-50 w-0 overflow-hidden overflow-x-auto overflow-y-auto
        ${sidebarOpen == true ? 'w-full sm:w-80' : ''}`}>
        {tableOfContents.map(section => 
            <section className='my-4'>
                <h1 className='flex justify-between px-8 py-2 bg-light-section-background dark:bg-dark-section-background hover:bg-light-section-hover-background dark:hover:bg-dark-section-hover-background hover:cursor-pointer font-bold'>{section.sectionTitle} <ChevronDown /></h1>
                <ul className='my-2 pl-4'>
                    {section.pages.map(page => 
                        <li className='hover:cursor-pointer'>
                            <NavLink to={page.link} className={ ({isActive}) => isActive ? 
                                'px-3 py-2 w-full inline-block border-l-3 text-light-accent dark:text-dark-accent bg-light-active-link-background dark:bg-dark-active-link-background hover:bg-light-active-link-hover-background dark:hover:bg-dark-active-link-hover-background' 
                                : 
                                'px-3 py-2 w-full inline-block border-l-3 border-light-border dark:border-dark-border hover:bg-light-link-hover-background dark:hover:bg-dark-link-hover-background text-light-link-foreground dark:text-dark-link-foreground'}>
                                {page.pageTitle}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </section>
        )}
    </aside>
  )
}

export default SideBar