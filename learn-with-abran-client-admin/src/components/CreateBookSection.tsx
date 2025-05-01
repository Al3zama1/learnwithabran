import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

const CreateBookSection = () => {

  const handleSaveBookSection = () => {
    console.log('Saving book section');
    
  }
  return (
    <Dialog>
        <DialogTrigger className='border-2 border-light-border rounded-full py-1 px-2 hover:cursor-pointer'>Add Section</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add a new book section</DialogTitle>
            </DialogHeader>
            <div className='flex flex-col gap-1'>
              <div className='flex gap-3 items-center'>
                <label htmlFor="book">Book</label>
                <select id='book' className='p-1.5'>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Software Engineering">Software Engineering</option>
                </select>
              </div>
              <div className='flex gap-3 items-center'>
                <label htmlFor="section">Book Section</label>
                <input type="text" placeholder='Section title' className='p-1.5 flex-1' />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <button type='button' onClick={handleSaveBookSection} className='hover:cursor-pointer bg-gray-200 px-2 py-1 rounded-sm'>Save</button>
              </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default CreateBookSection