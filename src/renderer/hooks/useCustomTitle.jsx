import { useEffect } from 'react';
const useCustomTitle = (curFilePath) => {

    
    useEffect(() => {
        document.title = curFilePath;
    },[curFilePath]);
    
};



export default useCustomTitle;