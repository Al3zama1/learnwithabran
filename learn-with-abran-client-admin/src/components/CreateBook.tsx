import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input';
import { z } from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useMutation } from '@tanstack/react-query';
import {axiosPrivate} from '@/api/axios';
import { toast } from 'sonner';


const bookFormSchema = z.object({
    title: z.string({message: "Please assign the book a title."}).nonempty({message: 'Book title cannot be blank.'})
})


const CreateBook = () => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const createBookMutation = useMutation({
        mutationFn: (data : { title: string }) => { 
            return axiosPrivate.post('/books', data)
        }, 
        onSuccess: () => {
            bookForm.reset()
            setDialogOpen(false)
            toast.success('Book has been created')
        },
        onError: () => {
            toast.error('Failed to create book')
        }
    })

const bookForm = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
        title: ''
    }
})

const onOpenChange = (next: boolean) => {
    if (!next) {
        bookForm.reset();
        setDialogOpen(false)
    }
}

    const handleBookCreation = (values: z.infer<typeof bookFormSchema>) => {
        createBookMutation.mutate({ title: values.title })
    }


  return (
    <Dialog open={dialogOpen} onOpenChange={onOpenChange} >
      <DialogTrigger asChild>
        <Button variant="outline" className='hover:cursor-pointer' onClick={() => setDialogOpen(true)}>Add Book</Button>
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
                    name='title'
                    render={({ field }) => (
                        <FormItem className='grid grid-cols-4 items-center gap-4'>
                            <FormLabel>Book title</FormLabel>
                            <FormControl className='col-span-3'>
                                <Input placeholder='Software Engineering' {...field} />
                            </FormControl>
                            <FormMessage className='col-start-2 col-span-full' />
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