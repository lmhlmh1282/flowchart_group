import { useEffect } from 'react';

const useDragAndDropHook = (setCurFilePath) => {

    
    useEffect(() => {
        const preventDrag = (event) => {
            event.preventDefault();
        };

         //托放文件
        const onDrop=(e)=>{
            e.stopPropagation();
            e.preventDefault();
            
            const file = e.dataTransfer.files[0]; // 获取文件列表
            const absolutefilePath = window.electronAPI.getPathForFile(file); 
            //console.log("absolutefilePath: "+absolutefilePath);
            //托放文件后，把文件路径保存到state中
            setCurFilePath(absolutefilePath);
        };


        document.addEventListener('dragenter', preventDrag);
        document.addEventListener('dragover', preventDrag);
        document.addEventListener('drop', preventDrag);

        return () => {
            document.addEventListener('dragenter', preventDrag);
            document.addEventListener('dragover', preventDrag);
            document.addEventListener('drop', onDrop);
        };
    }, []);
};



export default useDragAndDropHook;