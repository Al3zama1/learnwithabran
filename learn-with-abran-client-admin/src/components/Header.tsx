import { Link, useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import useAppContext from "@/hooks/UseAppContext";
import ReloadingLink from "./ReloadingLink";
import { Moon, SquarePen, Sun } from "lucide-react";
import PublishArticle from "./PublishArticle";
import { Button } from "./ui/button";

const Header = () => {

  const { pathname } = useLocation();
  const { setShowArticlePreview, showArticlePreview, setLightPreviewTheme, lightPreviewTheme, unsavedChanges } = useAppContext();

  const handleArticlePreview = () => {
    setShowArticlePreview(!showArticlePreview);
  }

  const handleArticlePreviewTheme = () => {
    setLightPreviewTheme(!lightPreviewTheme)
  }

  return (
    <header className='fixed h-15 mb-5 w-full left-0 top-0'>
        <nav className='max-w-5xl mx-auto h-full flex items-center justify-end px-5'>
            <ul>
                {/* <li className="font-bold">LearnWithAbran</li> */}
            </ul>
            <ul className='flex items-center gap-3'>
                {pathname === '/write' && <li><PublishArticle /></li>}
                {pathname === '/write' && <li><Button variant='outline' className="hover:cursor-pointer" type='button' disabled={unsavedChanges} onClick={handleArticlePreview}>{showArticlePreview === false ? 'Preview' : 'Exit Preview'}</Button></li>}
                {/* {pathname === '/write' && <li><button className='hover:cursor-pointer disabled:cursor-default disabled:text-gray-300' disabled={unsavedChanges} onClick={handleArticlePreview}>{showArticlePreview === false ? 'Preview' : 'Exit Preview'}</button></li>} */}
                {pathname === '/write' && showArticlePreview && <li><button className={`hover:cursor-pointer`} type="button" onClick={handleArticlePreviewTheme}>{lightPreviewTheme === true ? <Moon /> : <Sun />}</button></li>}
                {pathname !== '/write' && <Link to='/write' className="hover:cursor-pointer flex items-center gap-1.5 text-gray-500"><SquarePen className="size-4" /> Write</Link>}
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:cursor-pointer">
                      <Avatar>
                        <AvatarImage src=""/>
                        <AvatarFallback className="">AL</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <ReloadingLink to='/profile'>
                        <DropdownMenuItem className="hover:cursor-pointer">
                          Profile
                        </DropdownMenuItem>
                      </ReloadingLink>
                      <ReloadingLink to='/stories/drafts'>
                        <DropdownMenuItem className="hover:cursor-pointer">
                          Stories
                        </DropdownMenuItem>
                      </ReloadingLink>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header