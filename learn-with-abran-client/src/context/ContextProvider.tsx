import { createContext, ReactNode, useState } from 'react'

type ContextType = {
    sidebarOpen: boolean,
    setSidebarOpen: (value : boolean) => void
}

const AppContext = createContext<ContextType | null> (null);

export const AppProvider = ({ children } : {children: ReactNode}) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  
  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext;