import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { AppProvider } from './context/ContextProvider.tsx'
import router from './routes/Router.tsx'

const setTheme = () => {
  const theme = localStorage.getItem('theme');
  const rootNode = document.getElementById('root');
  
  if (!rootNode) return
  if (!theme || theme === 'dark') rootNode.classList.add('dark')
  
}

setTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)
