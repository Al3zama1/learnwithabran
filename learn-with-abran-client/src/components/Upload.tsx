import { IKContext, IKUpload } from 'imagekitio-react'
import React, { ReactElement, useRef } from 'react'
import { ImageType } from '../types/model'
import { ImageUploadReponseType } from '../types/api'
import axios from '../api/axios'
// import { toast } from 'react-toastify'
// import useAxiosPrivate from '../hooks/useAxiosPrivate'
// import { ImageUploadReponseType } from '@/types/api'
// import { ImageType } from '@/types/model'
// import { useMutation } from '@tanstack/react-query'

type Props = {
    // setData: (data: ImageType) => void
    // data: ImageType | null
    // setProgress: (progress: number) => void,
    // setContentChanged: (value: boolean) => void,
    type: string,
    insertIntoEditor: (url : string) => void,
    children: ReactElement
}


const Upload = ({ children, insertIntoEditor, type } : Props) => {

    // const axiosPrivate = useAxiosPrivate();
    const coverRef = useRef(null)

    // const removePreiousCoverImgMutation = useMutation({
    //     mutationFn: (fileId: string) => {
    //         return axiosPrivate.delete(`/drafts/remove-file/${fileId}`)
    //     }
    // })

    const authenticator = async () => {
        console.log('the authenticator is being called');
        
        // try {
        //     const response = await axios.get('/drafts/auth-file-upload');
    
        //     if (response.status !== 200) {
        //         // const errorText = await response.data;
        //         throw new Error(`Request failed with status ${response.status}`);
        //     }


        //     const { signature, expire, token } = await response.data; 
        //     return {signature, expire, token}
            
        // } catch (error) {
        //     throw new Error(`Authentication request failed`)
        // }
    }

    const onError = (error) => {
        // toast.error("Image upload failed!")
        console.log('failed to upload image');
        
    }

    const onSuccess= (res: ImageUploadReponseType) => {
        // if (data != null) {
        //     // removePreiousCoverImgMutation.mutate(data.fileId);
        // }
        // setData(res)
        // setContentChanged(true)
    }

    // const onUploadProgress = (progress) => {
    //     setProgress(Math.round((progress.loaded / progress.total) * 100))
    // }
    
  return (
    <IKContext 
        publicKey={import.meta.env.VITE_IK_PUBLIC_KEY} 
        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} 
        authenticator={authenticator}
    >
        <IKUpload
            useUniqueFileName
            folder='tech-blog'
            onError={onError}
            onSuccess={onSuccess}
            // onUploadProgress={onUploadProgress}
            className='hidden'
            ref={coverRef}
            accept={`${type}/*`}
        />
        <div className='cursor-pointer w-fit' onClick={() => coverRef.current.click()}>{children}</div>
    </IKContext>
  )
}

export default Upload