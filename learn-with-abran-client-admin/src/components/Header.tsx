import { Link, useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import useAppContext from "@/hooks/UseAppContext";

const Header = () => {

  const { pathname } = useLocation();
  const { savingArticle } = useAppContext();
  

  return (
    <header className='h-15 mb-5'>
        <nav className='max-w-4xl m-auto h-full flex items-center justify-end'>
            <ul>
                {/* <li className="font-bold">LearnWithAbran</li> */}
            </ul>
            <ul className='flex gap-3'>
                {pathname === '/write' && <li><button className="hover:cursor-pointer">Publish</button></li>}
                {pathname === '/write' && <li>{savingArticle === true ? <span>Saving...</span> : <button className="hover:cursor-pointer">Preview</button>}</li>}
                {pathname !== '/write' && <Link to='/write' className="hover:cursor-pointer">Write</Link>}
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:cursor-pointer">
                      <Avatar>
                        <AvatarImage src=""/>
                        <AvatarFallback className="bg-blue-200">AL</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="hover:cursor-pointer">
                        <Link to='/profile'>Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:cursor-pointer">
                        <Link to='/stories'>Stories</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header