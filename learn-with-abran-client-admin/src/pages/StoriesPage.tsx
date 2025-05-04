import CreateBook from '@/components/CreateBook';
import CreateBookSection from '@/components/CreateBookSection';
import StoriesEntry from '@/components/StoriesEntry';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom'

const StoriesPage = () => {

    const { pathname } = useLocation();


  return (
    <section className='fixed w-screen h-screen left-0 top-15 border-t-[1px] border-light-border'>
        <section className='max-w-5xl w-full mx-auto px-5 mt-10'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='text-2xl font-bold'>Your Stories</h1>
                <div className='flex gap-3'>
                    <Button variant='outline' className='hover:cursor-pointer'><Link to='/write'>Write</Link></Button>
                    <CreateBook />
                    <CreateBookSection />
                    {/* <button type='button' onClick={handleCreateBook} className='border-2 border-light-border rounded-full py-1 px-2 hover:cursor-pointer'>Create Book</button> */}
                    {/* <button type='button' onClick={handleCreateBookSection} className='border-2 border-light-border rounded-full py-1 px-2 hover:cursor-pointer'>Create Section</button> */}
                </div>
            </div>
            <ul className='flex gap-3 border-b-[1px] border-light-border pb-2'>
                <li className='hover:cursor-pointer'>
                    <Link to='/stories/drafts' className='text-gray-400 hover:text-gray-500'>Drafts</Link>
                </li>
                <li className='hover:cursor-pointer'>
                    <Link to='/stories/published' className='text-gray-400 hover:text-gray-500'>Published</Link>
                </li>
            </ul>
            <section className='mt-5'>
                {pathname === '/stories/published' &&
                <section className='flex flex-col gap-1'>
                    <div className='flex gap-3 items-center'>
                        <p className='text-lg'>Choose book: </p>
                        <select className='p-1.5'>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Software Engineering">Software Engineering</option>
                        </select>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <p className='text-lg'>Choose Section</p>
                        <select className='p-1.5'>
                            <option value="CCNA">CCNA</option>
                            <option value="Security">Security</option>
                        </select>
                    </div>
                </section>
                }
                <StoriesEntry location={pathname} />
                <StoriesEntry location={pathname} />
            </section>
        </section>

    </section>
  )
} 

export default StoriesPage