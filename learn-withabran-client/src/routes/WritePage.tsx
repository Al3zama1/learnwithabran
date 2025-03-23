import React, { RefObject, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import hljs from 'highlight.js';
// import 'highlight.js/styles/base16/edge-light.css'
// import 'highlight.js/styles/tokyo-night-dark.css'
// import 'highlight.js/styles/github-dark.css'
// import 'highlight.js/styles/pojoaque.css'
// import 'highlight.js/styles/base16/sandcastle.css'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Highlighter } from 'lucide-react';

const toolbarOptions = [
    [{'header': [2, 3, false]}],
    ['bold', 'italic', 'underline', 'strike'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link', 'image'],
    ['code', 'code-block']
]

const Parchment = Quill.import('parchment');
let config = {scope: Parchment.Scope.BLOCK};
const calloutClass = new Parchment.ClassAttributor('important', 'callout', config)

Quill.register(calloutClass, true);

const WritePage = () => {
    const [quill, setQuill] = useState<Quill>();
    const editorRef: RefObject<any> = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');


    useEffect(() => {
        if (editorRef && !quill && editorLoaded) {
            const quill = new Quill(editorRef.current, {
                // placeholder: 'Tell your story...',
                modules: {
                    syntax: {hljs},
                    toolbar: {
                        container: '#toolbar',
                        handlers: {
                            image: selectLocalImage
                        }
                    }
                },
                theme: 'snow'
            })

            // quill.formatLine(0, 1, 'header', '1', 'user')

            
            setQuill(quill);
            // quill.getModule('toolbar').addHandler('image', selectLocalImage);
        }

        setEditorLoaded(true)

    }, [quill, editorLoaded])

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => { 
                console.log(JSON.stringify(quill.getContents()));
                console.log(quill.getSemanticHTML());
                
                
            })
        }

    }, [quill])

    function selectLocalImage() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        
        input.onchange = () => {
            if (!input || !input.files) return;
            const file = input.files[0];
            saveToServer(file);
        }
    }

    function saveToServer(file) {
        console.log(file);
        
    }

    function insertToEditor(url : string) {
        const range = quill?.getSelection();
        if (!range) return
        quill?.insertEmbed(range.index, 'image', url);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    // useEffect(() => {
    //     const calloutButton = document.querySelector(".ql-callout");
        
    //     if (!calloutButton) return;
        
    //     const calloutevent = calloutButton.addEventListener('click', () => {
    //         const range = quill?.getSelection();

    //         if (range) {
    //             const format = quill?.getFormat(range.index, range.length);


                
    //         }
            
    //     })
    

    //     return () => {
    //         removeEventListener('click', calloutevent);
    //     }

    // }, [quill])

    // const importantBtn = document.querySelector(".ql-important");

    // importantBtn?.addEventListener('click', () => {
    //     const range = quill?.getSelection();

    // })

    useEffect(() => {
        let data = localStorage.getItem('article');
        if (!data) return;
        data = JSON.parse(data);

        setTitle(data.title);
        quill?.setContents(data.content)
        
    }, [quill])


    const handleSaveDraft = () => {
        const data = {
            title: title,
            content: quill?.getContents()
        }
        localStorage.setItem('article', JSON.stringify(data))
    }




  return (
    <main className='dark:bg-dark-background bg-light-background text-light-foreground dark:text-dark-foreground fixed h-full left-15 overflow-y-auto'>
    {/* <div className='flex justify-end items-center w-3/4 mx-auto h-15'>
        <div className='flex gap-3 mr-5'>
            <button className='hover:cursor-pointer hover:bg-light-foreground hover:text-dark-foreground px-3 py-1 rounded-md'>Save</button>
            <button className='hover:cursor-pointer hover:bg-light-foreground hover:text-dark-foreground px-3 py-1 rounded-md'>Publish</button>
            <UserDropDownMenu />
        </div>
    </div> */}
    <div className='flex flex-col gap-6 w-3/4 mx-auto'>
    {/* <div className='flex items-end gap-5'>
        <h1 className='text-xl font-light'>Create a New Post</h1>
        <span className={`text-gray-400 transition-all delay-300`}>
            {savingDraft && 'Saving ...'}
            {draftSaved && !contentChanged && 'Saved'}
        </span>
    </div> */}
    <form className='flex flex-col gap-6 flex-1 mb-6'>
        <div className='flex items-center gap-10'>
            {/* <Upload type="image" setProgress={setUploadProgress} data={coverImg} setData={setCoverImg} setContentChanged={setContentChanged}>
                <button name='coverImg' type='button' className='p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'>Add a cover image</button>
            </Upload> */}
            {/* {coverImg && <img src={coverImg.url} alt='Article cover image' className='w-20' />} */}
            {/* {coverImg && <Image key={coverImg.name} src={coverImg.filePath} w='200' className='rounded-2xl' />} */}
            {/* {coverImg && <img src={coverImg.url} className='w-[200px] rounded-2xl' />} */}
        </div>
        
        <input value={title} onChange={handleTitleChange}  className='text-4xl font-semibold bg-transparent outline-none' type="text" placeholder='A Great Story' name='title' />
        <div className='flex items-center gap-4'>
            <label htmlFor="" className='text-sm'>Choose a category:</label>
            <select value={category} onChange={handleCategoryChange}  name="category" id="" className='p-2 rounded-xl shadow-md'>
                <option value="general">General</option>
                <option value="programming">Programming</option>
                <option value="Algorithms">Algorithms</option>
                <option value="data-structures">Data Structures</option>
                <option value="network-engineering">Network Engineering</option>
                <option value="spring-boot">Spring Boot</option>
            </select>
            <button onClick={handleSaveDraft}>Save Draft</button>
        </div>
        {/* <textarea  className='p-4 rounded-xl bg-white shadow-md' name="description" placeholder='A Short Description' /> */}

        <div id='toolbar'>
                <span className="ql-formats">
                    {/* <button className="ql-header" value='1'></button> */}
                    <button className="ql-header" value='2'></button>
                    <button className="ql-header" value='3'></button>
                </span>
                <span className="ql-formats">
                    <button className="ql-bold"></button>
                    <button className="ql-italic"></button>
                    <button className="ql-underline"></button>
                    <button className="ql-strike"></button>
                    <button className="ql-link"></button>
                </span>
                <span className="ql-formats">
                    <button className="ql-list" value='ordered'></button>
                    <button className="ql-list" value='bullet'></button>
                </span>
                <span className="ql-formats">
                    <button className="ql-code"></button>
                    <button className="ql-code-block"></button>
                </span>
                <span className="ql-formats">
                    <button className="ql-image"></button>
                </span>
                <span className='ql-formats'>
                    <button className='ql-important'>
                        <Highlighter className='ql-stroke' />
                    </button>
                </span>
            </div>
        <div ref={editorRef} className='article flex-1 rounded-xl shadow-md !font-sans !text-base'></div>


        {/* <div className='flex gap-4'>
            <button onClick={saveDraft} type='button' disabled={!contentChanged || (uploadProgress > 0 && uploadProgress < 100)} className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed'>
                {savingDraft ? 'Saving' : 'Save'}
            </button>
            <button type='submit' disabled={publishMutation.isPending || (uploadProgress > 0 && uploadProgress < 100) || contentChanged} className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed'>
                {publishMutation.isPending ? 'Publishing' : 'Publish'}
            </button>
        </div>


        {'Progress: ' + uploadProgress}
        {publishMutation.isError && <span>{publishMutation.error.message}</span>} */}


        </form>
    </div>
    </main>
    // <main className='flex flex-col w-1/2 mx-auto min-h-screen bg-light-background dark:bg-dark-background'>
    //     <form action="">
    //         <input type="text" placeholder='A Great Story' name='title' className='text-4xl outline-none' />
    //         <div ref={editorRef} className='article flex-1 !font-sans !text-base text-light-foreground dark:text-dark-foreground'></div>
    //     </form>
    // </main>
  )
}

export default WritePage