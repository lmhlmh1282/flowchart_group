import React,{Fragment, useEffect, useState} from 'react';
import { Layout } from 'antd';
import mermaid from 'mermaid';




import MermaidUtil from '../../utils/MermaidUtil';
import ModalContentWindow from './ModalContentWindow';
import useRefreshMermaidGraphHook from '../../hooks/useRefreshMermaidGraphHook';

const mermaidUtil=new MermaidUtil();
function GraphAreaComponent (props) {
    const [svgCode,setSvgCode] = useState("");
    const [isModalVisible,setIsModalVisible]=useState(false);
    const [modalWindowData,setModalWindowData]=useState({});


    const [jsonContent,setJsonContent] = useState({});


    //使用自定义Hook更新mermaid图形事件
    useRefreshMermaidGraphHook(props.curFilePath,setJsonContent);

    const refreshMermaidGraph=async() => {
        const curFilePath=props.curFilePath;
        //console.log(curFilePath);
        //1.更新流程图
        mermaidUtil.genMermaidChart(curFilePath).then((svgCode)=>{
            //console.log("svgCode: "+svgCode);
            setSvgCode(svgCode);
            
        });  
        //console.log("jsonContentRef: "+jsonContentRef);

    } ;


    useEffect(() => {
        // 在组件挂载时调用 refreshMermaidGraph
        refreshMermaidGraph();

    },[props.curFilePath]);

    useEffect(() => {
        // 在 svgCode 更新后绑定事件监听器
        if (svgCode) {
            mermaidUtil.bindListeners({},async (outData)=>{      
                const pathAPI=window.electronAPI.pathAPI; 
                const buttonName= outData.ButtonName;

                let modalDataFilepath="";
                if(props.curFilePath){
                    const baseName = pathAPI.basename(props.curFilePath, pathAPI.extname(props.curFilePath));
                    const dirPath = pathAPI.join(pathAPI.dirname(props.curFilePath),baseName);
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
    }, [svgCode,isModalVisible]);
 
        
    return (
        <Fragment>
            <ModalContentWindow
                isModalVisible={isModalVisible} 
                setIsModalVisible={setIsModalVisible} 
                modalWindowData={modalWindowData} {...props}
                >
            </ModalContentWindow>
             <div className="display-area" >  
                { 
                    (!svgCode || svgCode == "") &&(
                        <p>点击或拖动 .mmd 文件到此区域上传</p>
                    )
                }
                {
                    (svgCode && svgCode != "") &&(
                        <div dangerouslySetInnerHTML={{ __html: svgCode }} />
                    )
                }
            </div>

        </Fragment>
       
    );
       
}



export default GraphAreaComponent;