import { Menu, Moon, Search, User } from 'lucide-react'
import useAppContext from '../hooks/UseAppContext'

const Header = () => {

    const { sidebarOpen, setSidebarOpen } = useAppContext();

    const handleTheme = () => {
        const theme = localStorage.getItem('theme')
        const rootNode = document.getElementById("root");

        if (!rootNode) return;
        if (!theme || theme === 'dark') {
            rootNode.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }  else {
            rootNode.classList.add('dark');
            localStorage.setItem('theme', 'dark')
        }
    }
    
  return (
    <header className={`flex justify-around w-full dark:bg-dark-background items-center h-15 fixed
        ${sidebarOpen === false ? 'sm:flex-col sm:h-screen sm:w-15 sm:justify-start sm:gap-10' 
        : 
        'sm:w-80 border-b-[1px] dark:border-dark-border '}`}>
        <button className={`hover:cursor-pointer ${!sidebarOpen && 'sm:mt-5'}`} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu />
        </button>
        <button className='hover:cursor-pointer' onClick={handleTheme}>
            <Moon />
        </button>
        <button className='hover:cursor-pointer'>
            <Search />
        </button>
        <button className='hover:cursor-pointer'>
            <User />
        </button>
    </header>
  )
}

export default Header
