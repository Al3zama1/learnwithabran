import React, { RefObject, useEffect, useRef, useState } from 'react'
import useAppContext from '../hooks/UseAppContext'
import Quill from 'quill';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import { data, useParams } from 'react-router-dom';

const HomePage = () => {
    const {sidebarOpen} = useAppContext();

    const params = useParams()

    console.log(params);
    
    

    const [quill, setQuill] = useState<Quill>();
    const [title, setTitle] = useState('');
    const articleRef : RefObject<any> = useRef(null);
    const [articleLoaded, setArticleLoaded] = useState(false);
    const [html, setHtml] = useState('');

    useEffect(() => {
      if (articleRef.current) {
        const quill = new Quill(articleRef.current, {
          readOnly: true,
          modules: {
            syntax: {hljs}
          }
        })
        let data = localStorage.getItem('article');
        if (!data) return
        data = JSON.parse(data);

        quill.setContents(data.content)
        setHtml(quill.getSemanticHTML())
        setTitle(data.title)

        
      }

      setArticleLoaded(true);
    }, [quill, title])



  return (
    <main className={`read article fixed top-15 sm:top-0 w-full h-[calc(100%-3.75rem)] sm:h-full bg-light-home-page-background dark:bg-dark-home-page-background overflow-y-auto ${sidebarOpen === true ? 'sm:left-80 sm:w-[calc(100%-20rem)]' : 'sm:left-15 sm:w-[calc(100%-3.75rem)]'}`}>
        <section className='bg-light-background dark:bg-dark-background mx-2 my-2 p-4 rounded-md min-h-[calc(100%-1rem)]'>
          {/* {title && <h1 className='max-w-3xl mx-auto'>{title}</h1>}
          <article className='max-w-3xl !mx-auto' ref={articleRef}></article> */}
          
        </section>
    </main>
  )
}

export default HomePage