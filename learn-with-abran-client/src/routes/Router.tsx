import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../book/introduction/WelcomePage";
import MainLayout from "../layouts/MainLayout";
import NetworkingBasics from "../book/network-engineering/NetworkingBasics";

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <WelcomePage />,
            },
            {
                path: 'networking-basics',
                element: <NetworkingBasics />
            }
        ]
    }
  ]);
  
  export default router;