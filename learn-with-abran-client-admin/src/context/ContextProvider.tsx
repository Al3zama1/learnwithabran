import { createContext, ReactNode, useState } from "react";

type ContextType = {
    showArticlePreview: boolean,
    setShowArticlePreview: (value: boolean) => void,
    savingArticle: boolean,
    setSavingArticle: (value: boolean) => void,
    unsavedChanges: boolean,
    setUnsavedChanges: (value: boolean) => void,
    lightPreviewTheme: boolean,
    setLightPreviewTheme: (value: boolean) => void
    publish: boolean,
    setPublish: (value: boolean) => void
}


const AppContext = createContext<ContextType | null> (null);

export const AppProvider = ({ children } : {children: ReactNode}) => {
    const [showArticlePreview, setShowArticlePreview] = useState(false);
    const [savingArticle, setSavingArticle] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [lightPreviewTheme, setLightPreviewTheme] = useState(true)
    const [publish, setPublish] = useState(false);

    return (
        <AppContext.Provider 
            value={{ showArticlePreview, setShowArticlePreview, savingArticle, setSavingArticle, unsavedChanges, setUnsavedChanges, lightPreviewTheme, setLightPreviewTheme, publish, setPublish }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;