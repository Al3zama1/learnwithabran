import useAppContext from '@/hooks/UseAppContext'
import { X } from 'lucide-react'

const PublishArticle = () => {

    const {setPublish, publish} = useAppContext();

    const handlePublish = () => {
        setPublish(false);
    }

  return (
    <section className={` bg-white fixed flex items-center justify-center transition-opacity duration-300 delay-100 ${!publish ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 -z-50' : 'inset-0 opacity-100 z-50'}`}>
        <section className={`w-full sm:max-w-lg text-center relative p-5`}>
            <h1 className='font-bold text-lg'>Publish Page</h1>
            <p>Please name page and assign it to the appropriate book section.</p>
            <button className='hover:cursor-pointer absolute right-3 top-3' onClick={handlePublish}><X className='size-4' /></button>
            <form className='mt-5'>
                <div className='flex justify-center items-center gap-3 mb-2'>
                    <label htmlFor="page-title" className='w-1/4 text-right'>Page Title</label>
                    <input type="text" placeholder='Exception Handling' className='w-3/4 p-1.5' />
                </div>
                <div className='flex items-center justify-center gap-3 mb-2'>
                    <label htmlFor="book-section" className='w-1/4 text-right'>Book</label>
                    <select className='w-3/4 p-1.5'>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Information Technology">Information Technology</option>
                    </select>
                </div>
                <div className='flex items-center justify-center gap-3 mb-2'>
                    <label htmlFor="book-section" className='w-1/4 text-right'>Section</label>
                    <select className='w-3/4 p-1.5'>
                        <option value="Network Engineering">Network Engineering</option>
                        <option value="Spring Boot">Spring Boot</option>
                    </select>
                </div>
                <button onClick={handlePublish} type='button' className='bg-gray-200 w-full py-1.5 rounded-sm hover:cursor-pointer mt-5'>Save Page</button>
            </form>
        </section>
    </section>
  )
}

export default PublishArticle