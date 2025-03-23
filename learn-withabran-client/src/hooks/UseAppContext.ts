import { useContext } from "react"
import AppContext from "../context/ContextProvider"

const useAppContext = () => {
   const appContext = useContext(AppContext)

    if (!appContext) throw new Error('AppContext has to be used within <AppContext.Provider>')

        return appContext;
}

export default useAppContext;