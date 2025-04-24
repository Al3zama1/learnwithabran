import { useEffect, useRef, useState } from 'react'
import hljs from 'highlight.js';
import katex from 'katex';
import Quill, { Delta } from 'quill';
import 'quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-dark.css'
import 'katex/dist/katex.min.css';
import { ArrowBigDown, ArrowBigLeft, ArrowBigRight, ArrowBigUp, ArrowDownUp, ArrowLeftRight, Table, Trash2 } from 'lucide-react';
import useAppContext from '@/hooks/UseAppContext';

(window.katex as any) = katex




const WritePage = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [quill, setQuill] = useState<Quill | null>(null);
    const editorChangeRef = useRef<Delta>(new Delta())
    const [isEditorLoaded, setIsEditorLoaded] = useState<boolean>(false);

    const [table, setTable] = useState<any>(null);
    const tableRef = useRef<HTMLButtonElement>(null);
    const rowAboveRef = useRef<HTMLButtonElement>(null);
    const rowBelowRef = useRef<HTMLButtonElement>(null);
    const rmRowRef = useRef<HTMLButtonElement>(null);
    const colLeftRef = useRef<HTMLButtonElement>(null);
    const colRightRef = useRef<HTMLButtonElement>(null);
    const rmColRef = useRef<HTMLButtonElement>(null);
    const rmTableRef = useRef<HTMLButtonElement>(null);

    const { setShowArticlePreview } = useAppContext();

    useEffect(() => {

        if (editorRef.current && !quill && isEditorLoaded) {
            const quill = new Quill(editorRef.current, {
                placeholder: 'Tell your story...',
                modules: {
                    syntax: {hljs},
                    toolbar: '#toolbar',
                    table: true
                },
                theme: 'snow',
            })

            setQuill(quill)
            setTable(quill.getModule('table'));
            quill.on('text-change', (delta) => {
                editorChangeRef.current = editorChangeRef.current.compose(delta)
            })
        }

        setIsEditorLoaded(true);

    }, [quill, isEditorLoaded])


    useEffect(() => {
        if (isEditorLoaded && table) {

            // insert table
            tableRef.current?.addEventListener('click', () => {
                table.insertTable(2,2)
            })

            //insert row above
            rowAboveRef.current?.addEventListener('click', () => {
                table.insertRowAbove();
            })

            // insert row below
            rowBelowRef.current?.addEventListener('click', () => {
                table.insertRowBelow();
            })

            // remove row
            rmRowRef.current?.addEventListener('click', () => {
                table.deleteRow();
            })

            // insert col left
            colLeftRef.current?.addEventListener('click', () => {
                table.insertColumnLeft();
            })

            // insert col right
            colRightRef.current?.addEventListener('click', () => {
                table.insertColumnRight();
            })

            // remove col
            rmColRef.current?.addEventListener('click', () => {
                table.deleteColumn();
            })

            // remove table 
            rmTableRef.current?.addEventListener('click', () => {
                table.deleteTable();
            })
        }

    }, [isEditorLoaded, table])


    useEffect(() => {
        if (!quill && !isEditorLoaded) return

        setInterval(() => {
            if (editorChangeRef.current.length() > 0) {
                console.log('Saving changes');


                editorChangeRef.current = new Delta();
            }
            
        }, 5 * 1000)

    }, [quill, isEditorLoaded])


    const saveEditor = () => {
        localStorage.setItem('article', JSON.stringify(quill?.getContents()))
    }

  return (
    <main className='w-full flex flex-col items-center gap-5'>
        {/* <section className='flex gap-3'>
            <button className='hover:cursor-pointer' onClick={saveEditor}>Save</button>
            <button className='hover:cursor-pointer'>Publish</button>
        </section> */}
        <section className='max-w-4xl w-full basis-[calc(100vh-20rem)] max-h-[calc(100vh-20rem)]'>
            <div id="toolbar" className=''>
                <select className="ql-header">
                    <option className='ql-selected'></option>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
                <span className='ql-formats'>
                    <div className='ql-section'></div>
                    <button type='button' className="ql-bold"></button>
                    <button type='button' className='ql-italic'></button>
                    <button type='button' className='ql-underline'></button>
                </span>
                <span className='ql-formats'>
                    <select className='ql-align'>
                        <option className='ql-selected'></option>
                        <option value="center"></option>
                        <option value="right"></option>
                        <option value="justify"></option>
                    </select>
                </span>
                <span className='ql-formats'>
                    <button type='button' className='ql-list' value='ordered'></button>
                    <button type='button' className='ql-list' value='bullet'></button>
                </span>
                <span className='ql-formats'>
                    <button type='button' className='ql-code'></button>
                    <button type='button' className='ql-code-block'></button>
                </span>
                <span className='ql-formats'>
                    <button type='button' className='ql-image'></button>
                    <button type='button' className='ql-link'></button>
                    <button type='button' className='ql-formula'></button>
                </span>
                <span className='ql-formats'>
                    <button type='button' className="ql-script" value="sub"></button>
                    <button type='button' className="ql-script" value="super"></button>
                </span>
                <span className='ql-formats'>
                    <button type='button' ref={tableRef}><Table /></button>
                    <button type='button' ref={rowAboveRef}><ArrowBigUp /></button>
                    <button type='button' ref={rowBelowRef}><ArrowBigDown /></button>
                    <button type='button' ref={rmRowRef}><ArrowDownUp /></button>
                    <button type='button' ref={colLeftRef}><ArrowBigLeft /></button>
                    <button type='button' ref={colRightRef}><ArrowBigRight /></button>
                    <button type='button' ref={rmColRef}><ArrowLeftRight /></button>
                    <button type='button' ref={rmTableRef}><Trash2 /></button>
                </span>
            </div>
            <div ref={editorRef}></div>
        </section>
    </main>
  )
}

export default WritePage