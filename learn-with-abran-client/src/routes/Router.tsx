import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../book/introduction/WelcomePage";
import MainLayout from "../layouts/MainLayout";
import NetworkDevices from "../book/network-engineering/NetworkDevices";

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <WelcomePage />,
            },
            {
                path: 'network-devices',
                element: <NetworkDevices />
            }
        ]
    }
  ]);
  
  export default router;