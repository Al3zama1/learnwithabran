import { useEffect, useRef, useState } from 'react'
import hljs from 'highlight.js';
import katex from 'katex';
import Quill, { Delta } from 'quill';
import 'quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-dark.css'
import 'katex/dist/katex.min.css';
import { ArrowBigDown, ArrowBigLeft, ArrowBigRight, ArrowBigUp, ArrowDownUp, ArrowLeftRight, Lightbulb, Table, Trash2 } from 'lucide-react';
import useAppContext from '@/hooks/UseAppContext';
import PublishArticle from '@/components/PublishArticle';

(window.katex as any) = katex


const Parchment = Quill.import('parchment');
const config = {scope: Parchment.Scope.BLOCK};
const calloutClass = new Parchment.ClassAttributor('callout', 'callout', config);
Quill.register(calloutClass, true)



const WritePage = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);
    const [quill, setQuill] = useState<Quill | null>(null);
    const editorChangeRef = useRef<Delta>(new Delta())
    const [isEditorLoaded, setIsEditorLoaded] = useState<boolean>(false);

    const tableRef = useRef<HTMLButtonElement>(null);
    const rowAboveRef = useRef<HTMLButtonElement>(null);
    const rowBelowRef = useRef<HTMLButtonElement>(null);
    const rmRowRef = useRef<HTMLButtonElement>(null);
    const colLeftRef = useRef<HTMLButtonElement>(null);
    const colRightRef = useRef<HTMLButtonElement>(null);
    const rmColRef = useRef<HTMLButtonElement>(null);
    const rmTableRef = useRef<HTMLButtonElement>(null);

    const {showArticlePreview, setUnsavedChanges, lightPreviewTheme} = useAppContext();


    useEffect(() => {

        if (editorRef.current && !quill && isEditorLoaded) {
            const quill = new Quill(editorRef.current, {
                placeholder: 'Tell your story...',
                // readOnly: showArticlePreview === true ? true : false,
                modules: {
                    syntax: {hljs},
                    toolbar: toolbarRef.current,
                    table: true
                },
                theme: 'snow',
            })
            
            addTableHandlers();


            quill.on('text-change', delta => {
                editorChangeRef.current = editorChangeRef.current.compose(delta);
                setUnsavedChanges(true);
            })

            
            setInterval(() => {
                if (editorChangeRef.current.length() > 0) {
                    localStorage.setItem('article', JSON.stringify(quill.getContents()))
                    editorChangeRef.current = new Delta();
                    setUnsavedChanges(false);
                }
                
            }, 5 * 1000)

            window.onbeforeunload = () => {
                if (editorChangeRef.current.length() > 0) return 'There are unsaved changes. Are you sure you want to leave?';
            }

            const prevSave = localStorage.getItem('article')
            if (prevSave) {
                quill.setContents(JSON.parse(prevSave));
                editorChangeRef.current = new Delta();
                setUnsavedChanges(false)
            }

            setQuill(quill)
        }

        setIsEditorLoaded(true);

    }, [quill, isEditorLoaded])


    const addTableHandlers = () => {
        if (!quill) return;

        const table : any = quill.getModule('table');

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

    const handleNoteClick = () => {
        const range = quill?.getSelection();
        if (!range || !quill) return;

        console.log(quill?.getFormat(range?.index, range?.length));
        console.log(range);
        

        const format = quill.getFormat(range.index, range.length);

        if (format.callout === 'true') {
            quill.insertText(range.index, '\n', 'user')
            quill.setSelection({index: range.index + 1, length: 0});
            quill.format('callout', false) 
        } 
    }

  return (
    <main className='w-full fixed top-20 left-0'>
        {/* <section className='flex gap-3'>
            <button className='hover:cursor-pointer' onClick={saveEditor}>Save</button>
            <button className='hover:cursor-pointer'>Publish</button>
        </section> */}
        <section className={`max-w-5xl w-full mx-auto px-5 ${!lightPreviewTheme && showArticlePreview && 'dark'}`}>
            <div ref={toolbarRef} className={`${showArticlePreview === true ? 'hidden' : 'block ql-toolbar ql-snow'}`}>
                <span className='ql-formats'>
                    <select className="ql-header" defaultValue="">
                        <option></option>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                    </select>
                </span>
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
                    <button type='button' className='ql-callout' onClick={handleNoteClick}><Lightbulb /></button>
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
            <div 
                ref={editorRef} 
                className={`article bg-light-background text-light-foreground dark:text-dark-foreground dark:bg-dark-background 
                ql-container ql-snow overflow-y-auto rounded-b-lg ${!showArticlePreview && 'max-h-[calc(100vh-12rem)] lg:max-h-[calc(100vh-9rem)]'} 
                ${showArticlePreview && 'rounded-t-lg max-h-[calc(100vh-6rem)]'}`}>
            </div>
        </section>
        <PublishArticle />
    </main>
  )
}

export default WritePage