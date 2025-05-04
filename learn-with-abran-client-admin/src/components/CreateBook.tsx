import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input';
import { z } from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { useMutation } from '@tanstack/react-query';
import axios from '@/api/axios';


const bookFormSchema = z.object({
    book: z.string().nonempty({message: 'Book name is required'})
})

const bookForm = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
})


const CreateBook = () => {
    const [open, setOpen] = useState(false)

    const createBookMutation = useMutation({
        mutationFn: (data : { book: string }) => { 
            return axios.post('/books', data)
        }
    })

    const handleBookCreation = (values: z.infer<typeof bookFormSchema>) => {
        createBookMutation.mutate({ book: values.book })

        if (createBookMutation.isSuccess) setOpen(false);
    }


  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button variant="outline" className='hover:cursor-pointer' onClick={() => setOpen(true)}>Add Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new book</DialogTitle>
          <DialogDescription>
            Book names must be unique!
          </DialogDescription>
        </DialogHeader>
        <Form {...bookForm}>
            <form onSubmit={bookForm.handleSubmit(handleBookCreation)}>
                <FormField
                    control={bookForm.control}
                    name='book'
                    render={({ field }) => (
                        <FormItem className='grid grid-cols-4 items-center gap-4'>
                            <FormLabel>Book title</FormLabel>
                            <FormControl className='col-span-3'>
                                <Input placeholder='Software Engineering' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-8'>
                    <Button type='submit' className='hover:cursor-pointer bg-light-foreground hover:bg-light-accent'>Save book</Button>
                </div>
            </form>
        </Form>
        
        {/* <div className="py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name Name
            </Label>
            <Input id="name" required placeholder='Software Engineering' className="col-span-3" />
          </div>
        </div> */}
      </DialogContent>
    </Dialog>





    // <Dialog>
    //     <DialogTrigger className='border-2 border-light-border rounded-full py-1 px-2 hover:cursor-pointer'>Create Book</DialogTrigger>
    //     <DialogContent>
    //         <DialogHeader>
    //             <DialogTitle>Create a new book</DialogTitle>
    //         </DialogHeader>
    //         <div className='flex items-center gap-2'>
    //             <label htmlFor="book">Book Title:</label>
    //             <input type="text" id='book' placeholder='Book title' className='flex-1 p-1.5' />
    //         </div>
    //         <DialogFooter>
    //             <DialogClose asChild>
    //                 <button type='button' className='hover:cursor-pointer bg-gray-200 px-2 py-1 rounded-sm' onClick={handleBookCreation}>Save</button>
    //             </DialogClose>
    //         </DialogFooter>
    //     </DialogContent>
    // </Dialog>
  )
}

export default CreateBook