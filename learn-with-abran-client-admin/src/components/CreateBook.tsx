import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

const CreateBook = () => {

    const handleBookCreation = () => {
        console.log('I have just created the book for this section');   
    }

  return (
    <Dialog>
        <DialogTrigger className='border-2 border-light-border rounded-full py-1 px-2 hover:cursor-pointer'>Create Book</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a new book</DialogTitle>
            </DialogHeader>
            <div className='flex items-center gap-2'>
                <label htmlFor="book">Book Title:</label>
                <input type="text" id='book' placeholder='Book title' className='flex-1 p-1.5' />
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <button type='button' className='hover:cursor-pointer bg-gray-200 px-2 py-1 rounded-sm' onClick={handleBookCreation}>Save</button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default CreateBook