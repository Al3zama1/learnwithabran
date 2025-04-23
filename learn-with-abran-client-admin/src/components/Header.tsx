
const Header = () => {
  return (
    <header className='h-10'>
        <nav className='w-4xl m-auto h-full flex items-center justify-between px-5'>
            <ul>
                <li>Learn with Abran</li>
            </ul>
            <ul className='flex gap-3'>
                <li>Publish</li>
                <li>Preview</li>
                {/* <li>Profile</li> */}
            </ul>
        </nav>
    </header>
  )
}

export default Header