
type Props = {
    location: string
}

const StoriesEntry = ( { location } : Props) => {
  return (
    <div className='border-b-[1px] border-light-border py-5'>
        <a href="#" className='font-bold'>Spring Boot Exception Handling</a>
        <div className='flex gap-3 mt-1'>
            <button className='hover:cursor-pointer text-gray-400 hover:text-gray-500'>{location === '/stories/drafts' ? 'Edit draft' : 'Edit Page'}</button>
            <button className='hover:cursor-pointer text-red-600 hover:text-gray-500'>{location === '/stories/drafts' ? 'Delete draft' : 'Delete Page '}</button>
        </div>
    </div>
  )
}

export default StoriesEntry