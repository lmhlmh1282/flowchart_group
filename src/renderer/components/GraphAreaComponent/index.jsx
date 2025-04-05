import React,{Fragment, useEffect, useState} from 'react';
import { Layout,Button } from 'antd';
import mermaid from 'mermaid';



import ModalContentWindow from './ModalContentWindow';
import useRefreshMermaidGraphHook from '../../hooks/useRefreshMermaidGraphHook';

import "./index.css"


function GraphAreaComponent (props) {
    const [svgCode,setSvgCode] = useState("");
    const [isModalVisible,setIsModalVisible]=useState(false);
    const [modalWindowData,setModalWindowData]=useState({});
    const [updateState,setUpdateState] =useState(0);
    const [jsonFilePath,setJsonFilePath]=useState("");

   
    useEffect(() => {
        //找到文件，读取对应的json数据
        const pathAPI=window.electronAPI.pathAPI; 
        //去掉后缀
        const baseName = pathAPI.basename(props.curFilePath, pathAPI.extname(props.curFilePath));
        const subDirPath = pathAPI.join(pathAPI.dirname(props.curFilePath),baseName);
        //json文件
        const configFilePath = pathAPI.join(subDirPath, 'config.json');
        setJsonFilePath(configFilePath);
    },[props.curFilePath]);


    //使用自定义Hook更新mermaid图形事件
    useRefreshMermaidGraphHook(props.curFilePath,svgCode,setSvgCode,isModalVisible,setIsModalVisible,setModalWindowData,updateState,setUpdateState,jsonFilePath);
   

    // 处理文件选择事件
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const filePath = window.electronAPI.getPathForFile(file);
            //console.log('Selected file:', filePath); // 
            props.setCurFilePath(filePath);
        }
    };
        
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
                        <div className='display-area-content'>
                            <Button onClick={() => document.getElementById('file-input').click()}>选择文件或拖拽.mmd文件</Button>
                            <input
                                id="file-input"
                                type="file"
                                accept=".mmd"
                                style={{ display: 'none' }}
                                onChange={handleFileSelect}
                                className='file-input'
                            />
                        </div>
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