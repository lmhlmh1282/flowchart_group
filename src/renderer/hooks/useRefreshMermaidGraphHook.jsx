import { useEffect ,useCallback} from 'react';
import MermaidUtil from '../utils/MermaidUtil';
const useRefreshMermaidGraphHook = (curFilePath,setJsonContent) => {

    const refreshMermaidGraph= useCallback(async() => {
       
    
        //2.读取对应的json
        const pathAPI =window.electronAPI.pathAPI;
        // 获取文件名（包括后缀）
        const fileNameWithExt = pathAPI.basename(curFilePath);
        // 获取文件扩展名
        const fileExt = pathAPI.extname(curFilePath);
        const fileNameWithoutExt = pathAPI.basename(fileNameWithExt, fileExt);
        //console.log("fileNameWithoutExt: "+fileNameWithoutExt);
        const jsonfileBasename=fileNameWithoutExt+".json";
        const jsonFilePath=pathAPI.join(pathAPI.dirname(curFilePath),jsonfileBasename);
        
        const jsonContentStr=await window.electronAPI.mainFileProc.loadFile(jsonFilePath);
        try{
            if("" != jsonContentStr && null != jsonContentStr)
            {
                setJsonContent(JSON.parse(jsonContentStr));
            }
            
        }catch (error) {
            console.error('Parsing error:', error); // 处理解析错误
            setJsonContent({});
        };
        

        //console.log("jsonContentRef: "+jsonContentRef);

    } ,[curFilePath]);



    
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'F5') {
                event.preventDefault(); // 阻止默认的 F5 刷新行为
                refreshMermaidGraph();
            }
        };

        // 添加键盘事件监听器
        window.addEventListener('keydown', handleKeyDown);
       

        // 清理事件监听器
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [refreshMermaidGraph]); 


    useEffect(() => {
      
        if (curFilePath ) {
            //更新绘制的图形
            refreshMermaidGraph();
        }
    },[curFilePath]);
};



export default useRefreshMermaidGraphHook;