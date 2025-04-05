import { useEffect ,useCallback} from 'react';
import MermaidUtil from '../utils/MermaidUtil';

const mermaidUtil=new MermaidUtil();
const useRefreshMermaidGraphHook = (curFilePath,svgCode,setSvgCode,isModalVisible,setIsModalVisible,setModalWindowData,updateState,setUpdateState) => {



    useEffect(() => {
        // 在 svgCode 更新后绑定事件监听器
        if (svgCode) {
            mermaidUtil.bindListeners({},async (outData)=>{      
                const pathAPI=window.electronAPI.pathAPI; 
                const buttonName= outData.ButtonName;

                let modalDataFilepath="";
                if(curFilePath){
                    const baseName = pathAPI.basename(curFilePath, pathAPI.extname(curFilePath));
                    const dirPath = pathAPI.join(pathAPI.dirname(curFilePath),baseName);
                    modalDataFilepath=pathAPI.join(dirPath,buttonName+".md");
                }
                

                //get modalWindowData
                const modalWindowData=await window.electronAPI.mainFileProc.loadFile(modalDataFilepath);
                //console.log("modalWindowData: "+modalWindowData);
                if(modalWindowData){
                    setIsModalVisible(true);
                    setModalWindowData(modalWindowData);
                }
            });
        }

        return () => {
            mermaidUtil.unbindListeners();
        };
    }, 
    [svgCode,isModalVisible,updateState]);
    
    const refreshMermaidGraph=async() => {
            //1.更新流程图
            mermaidUtil.genMermaidChart(curFilePath).then((newSvgCode)=>{
                //console.log(curFilePath);
               // console.log("svgCode: "+newSvgCode);
                setSvgCode(newSvgCode);
                setUpdateState(updateState=>{return (updateState+1)%1000;});
                
            }); 
            
            //console.log("jsonContentRef: "+jsonContentRef);
    
    } ;
 
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'F5') {
                event.preventDefault(); // 阻止默认的 F5 刷新行为
                refreshMermaidGraph();
                //alert('F5 刷新');
            }
        };

        // 添加键盘事件监听器
        window.addEventListener('keydown', handleKeyDown);
       

        // 清理事件监听器
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }); 


    useEffect(() => {
      
        if (curFilePath ) {
            //更新绘制的图形
            refreshMermaidGraph();
        }
    },[curFilePath]);
};



export default useRefreshMermaidGraphHook;