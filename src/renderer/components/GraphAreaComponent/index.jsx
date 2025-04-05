import React,{Fragment, useEffect, useState} from 'react';
import { Layout } from 'antd';
import mermaid from 'mermaid';



import ModalContentWindow from './ModalContentWindow';
import useRefreshMermaidGraphHook from '../../hooks/useRefreshMermaidGraphHook';

import "./index.css"


function GraphAreaComponent (props) {
    const [svgCode,setSvgCode] = useState("");
    const [isModalVisible,setIsModalVisible]=useState(false);
    const [modalWindowData,setModalWindowData]=useState({});
    const [updateState,setUpdateState] =useState(0);

   
    
    //使用自定义Hook更新mermaid图形事件
    useRefreshMermaidGraphHook(props.curFilePath,svgCode,setSvgCode,isModalVisible,setIsModalVisible,setModalWindowData,updateState,setUpdateState);
   


        
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