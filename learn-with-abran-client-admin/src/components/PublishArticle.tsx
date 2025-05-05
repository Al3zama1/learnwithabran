import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { useMutation } from '@tanstack/react-query';
import axios from '@/api/axios';


const publishPageSchema = z.object({
    book: z.string({
      required_error: 'Please select the book to assign the section to.'
    }).nonempty(),
    section: z.string({
      required_error: 'Please select the section to assign the new page.'
    }).nonempty(),
    title: z.string({
      required_error: 'You must assign the page a title.'
    }).nonempty()
  })


const PublishArticle = () => {

    const [dialogOpen, setDialogOpen] = useState(false);

    const publishPageMutation = useMutation({
        mutationFn: (data : { book: string, section: string, title: string }) => { 
            return axios.post('/books', data)
        }
    })
    
      const publicPageForm = useForm<z.infer<typeof publishPageSchema>>({
        resolver: zodResolver(publishPageSchema),
        defaultValues: {
            book: '',
            section: '',
            title: ''
        }
      })

    const handlePublishPage = (values: z.infer<typeof publishPageSchema>) => {
        publishPageMutation.mutate({ title: values.title, book: values.book, section: values.section })
        setDialogOpen(false);
    }


  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild className='hover:cursor-pointer'>
        <Button variant="outline">Publish</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Publish page</DialogTitle>
          <DialogDescription>
            Title the page and assign it to the appropriate book and section.
          </DialogDescription>
        </DialogHeader>
        <Form {...publicPageForm}>
            <form onSubmit={publicPageForm.handleSubmit(handlePublishPage)} className='flex flex-col gap-4 py-4'>
            <FormField
                    control={publicPageForm.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem className='grid grid-cols-4 items-center gap-4'>
                            <FormLabel>Title</FormLabel>
                            <FormControl className='col-span-3'>
                                <Input placeholder='Page title' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                  control={publicPageForm.control}
                  name='book'
                  render={({ field }) => (
                      <FormItem className='grid grid-cols-4 items-center gap-4'>
                          <FormLabel>Book</FormLabel>
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
                  control={publicPageForm.control}
                  name='section'
                  render={({ field }) => (
                      <FormItem className='grid grid-cols-4 items-center gap-4'>
                          <FormLabel>Section</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className='hover:cursor-pointer col-span-3 w-full'>
                                <SelectValue placeholder='Select a book section' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='Software Engineering' className='hover:cursor-pointer'>Exception Handling</SelectItem>
                              <SelectItem value='Information Technology' className='hover:cursor-pointer'>Java Programming</SelectItem> 
                              </SelectContent>
                          </Select>
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
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input id="name" placeholder='Spring Boot Exception Handling' className="col-span-3" />
          </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="book" className="text-right">
              Book
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
            <Label htmlFor="book" className="text-right">
              Section
            </Label>
            <Select>
              <SelectTrigger id='book' className='hover:cursor-pointer col-span-3 w-full'>
                <SelectValue placeholder="Select a book section"  />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='Software Engineering' className='hover:cursor-pointer'>Exception Handling</SelectItem>
                  <SelectItem value='Information Technology' className='hover:cursor-pointer'>Java Programming</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div> */}
        {/* <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" className='hover:cursor-pointer bg-light-foreground hover:bg-light-accent' onClick={handlePublish}>Publish page</Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
    // <section className={` bg-white fixed flex items-center justify-center transition-opacity duration-300 delay-100 ${!publish ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 -z-50' : 'inset-0 opacity-100 z-50'}`}>
    //     <section className={`w-full sm:max-w-lg text-center relative p-5`}>
    //         <h1 className='font-bold text-lg'>Publish Page</h1>
    //         <p>Please name page and assign it to the appropriate book section.</p>
    //         <button className='hover:cursor-pointer absolute right-3 top-3' onClick={handlePublish}><X className='size-4' /></button>
    //         <form className='mt-5'>
    //             <div className='flex justify-center items-center gap-3 mb-2'>
    //                 <label htmlFor="page-title" className='w-1/4 text-right'>Page Title</label>
    //                 <input type="text" placeholder='Exception Handling' className='w-3/4 p-1.5' />
    //             </div>
    //             <div className='flex items-center justify-center gap-3 mb-2'>
    //                 <label htmlFor="book-section" className='w-1/4 text-right'>Book</label>
    //                 <select className='w-3/4 p-1.5'>
    //                     <option value="Software Engineering">Software Engineering</option>
    //                     <option value="Information Technology">Information Technology</option>
    //                 </select>
    //             </div>
    //             <div className='flex items-center justify-center gap-3 mb-2'>
    //                 <label htmlFor="book-section" className='w-1/4 text-right'>Section</label>
    //                 <select className='w-3/4 p-1.5'>
    //                     <option value="Network Engineering">Network Engineering</option>
    //                     <option value="Spring Boot">Spring Boot</option>
    //                 </select>
    //             </div>
    //             <button onClick={handlePublish} type='button' className='bg-gray-200 w-full py-1.5 rounded-sm hover:cursor-pointer mt-5'>Save Page</button>
    //         </form>
    //     </section>
    // </section>
  )
}

export default PublishArticle