import MainLayout from '@/layout/MainLayout'
import WritePage from '@/pages/WritePage'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <h1>Welcome page</h1>
            },
            {
                path: '/write',
                element: <WritePage />
            },
            {
                path: '/stories',
                element: <h1>Stories</h1>
            },
            {
                path: '/profile',
                element: <h1>Profile</h1>
            }
        ]
    }
])

export default router;