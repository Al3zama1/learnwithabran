import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from '@/api/axios';

const bookSectionformSchema = z.object({
  book: z.string({
    required_error: 'Please select the book to assign the section to.'
  }).nonempty(),
  section: z.string({
    required_error: 'You must assign a name to the section'
  }).nonempty()
})

const bookSectionForm = useForm<z.infer<typeof bookSectionformSchema>>({
  resolver: zodResolver(bookSectionformSchema),
})


const CreateBookSection = () => {

  const [dialogOpen, setDialogOpen] = useState(false);

  const createBookSectionMutation = useMutation({
    mutationFn: (data : { book: string, section: string }) => { 
        return axios.post('/books', data)
    }
})

  const handleCreateBookSection = (values: z.infer<typeof bookSectionformSchema>) => {
    createBookSectionMutation.mutate({ book: values.book, section: values.section })
    setDialogOpen(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className='hover:cursor-pointer'>Add Section</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a book section</DialogTitle>
          <DialogDescription>
            Books cannot have duplicate sections!
          </DialogDescription>
        </DialogHeader>
        <Form {...bookSectionForm}>
            <form onSubmit={bookSectionForm.handleSubmit(handleCreateBookSection)} className='flex flex-col gap-4 py-4'>
                <FormField
                  control={bookSectionForm.control}
                  name='book'
                  render={({ field }) => (
                      <FormItem className='grid grid-cols-4 items-center gap-4'>
                          <FormLabel>Book title</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className='hover:cursor-pointer col-span-3 w-full'>
                                <SelectValue placeholder='Select a book' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='Software Engineering' className='hover:cursor-pointer'>Software Engineering</SelectItem>
                              <SelectItem value='Information Technology' className='hover:cursor-pointer'>Information Technology</SelectItem> 
                              </SelectContent>
                          </Select>
                      </FormItem>
                  )}
                />
                <FormField
                    control={bookSectionForm.control}
                    name='section'
                    render={({ field }) => (
                        <FormItem className='grid grid-cols-4 items-center gap-4'>
                            <FormLabel>Book section</FormLabel>
                            <FormControl className='col-span-3'>
                                <Input placeholder='Exception Handling' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-8'>
                    <Button type='submit' className='hover:cursor-pointer bg-light-foreground hover:bg-light-accent'>Save book</Button>
                </div>
            </form>
        </Form>
        
        {/* <div className="flex flex-col gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="book" className="text-right">
              Select Book
            </Label>
            <Select>
              <SelectTrigger id='book' className='hover:cursor-pointer col-span-3 w-full'>
                <SelectValue placeholder="Select a book"  />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='Software Engineering' className='hover:cursor-pointer'>Software Engineering</SelectItem>
                  <SelectItem value='Information Technology' className='hover:cursor-pointer'>Information Technology</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="section" className="text-right">
              Section
            </Label>
            <Input id="section" placeholder='Spring Boot Exception Handling' className="col-span-3" />
          </div>
        </div> */}
        {/* <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className='hover:cursor-pointer bg-light-foreground hover:bg-light-accent' onClick={handleSectionCreation}>Save section</Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
    
    // <Dialog>
    //     <DialogTrigger className='border-2 border-light-border rounded-full py-1 px-2 hover:cursor-pointer'>Add Section</DialogTrigger>
    //     <DialogContent>
    //         <DialogHeader>
    //             <DialogTitle>Add a new book section</DialogTitle>
    //         </DialogHeader>
    //         <div className='flex flex-col gap-1'>
    //           <div className='flex gap-3 items-center'>
    //             <label htmlFor="book">Book</label>
    //             <select id='book' className='p-1.5'>
    //               <option value="Information Technology">Information Technology</option>
    //               <option value="Software Engineering">Software Engineering</option>
    //             </select>
    //           </div>
    //           <div className='flex gap-3 items-center'>
    //             <label htmlFor="section">Book Section</label>
    //             <input type="text" placeholder='Section title' className='p-1.5 flex-1' />
    //           </div>
    //         </div>
    //         <DialogFooter>
    //           <DialogClose asChild>
    //             <button type='button' onClick={handleSaveBookSection} className='hover:cursor-pointer bg-gray-200 px-2 py-1 rounded-sm'>Save</button>
    //           </DialogClose>
    //         </DialogFooter>
    //     </DialogContent>
    // </Dialog>
  )
}

export default CreateBookSection