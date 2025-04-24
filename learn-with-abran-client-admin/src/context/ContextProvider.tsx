import { createContext, ReactNode, useState } from "react";

type ContextType = {
    showArticlePreview: boolean,
    setShowArticlePreview: (value: boolean) => void,
    savingArticle: boolean,
    setSavingArticle: (value: boolean) => void
}


const AppContext = createContext<ContextType | null> (null);

export const AppProvider = ({ children } : {children: ReactNode}) => {
    const [showArticlePreview, setShowArticlePreview] = useState(false);
    const [savingArticle, setSavingArticle] = useState(false);

    return (
        <AppContext.Provider value={{ showArticlePreview, setShowArticlePreview, savingArticle, setSavingArticle }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;