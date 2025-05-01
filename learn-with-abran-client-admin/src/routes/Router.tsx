import MainLayout from '@/layout/MainLayout'
import StoriesPage from '@/pages/StoriesPage';
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
                path: '/stories/drafts',
                element: <StoriesPage />
            },
            {
                path: '/stories/published',
                element: <StoriesPage />
            },
            {
                path: '/profile',
                element: <h1>Profile</h1>
            }
        ]
    }
])

export default router;