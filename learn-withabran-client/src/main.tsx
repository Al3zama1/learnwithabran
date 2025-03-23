import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.tsx'
import HomePage from './routes/HomePage.tsx'
import { AppProvider } from './context/ContextProvider.tsx'
import WritePage from './routes/WritePage.tsx'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/:slug',
        element: <HomePage />
      },
      {
        path: '/new-story',
        element: <WritePage />
      }
    ]
  }
])

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
