import React,{ useState,useRef }  from 'react';
import { Flex, Layout,Upload,Button, Modal } from 'antd';


import FileA from './components/FileA'

import useDragAndDropHook from './hooks/useDragAndDropHook';
import useRefreshMermaidGraphHook from './hooks/useRefreshMermaidGraphHook';

import "./App.css"



const App = () => {
    const [curFilePath, setCurFilePath] = useState('');
    const [error, setError] = useState('');
    const mermaidContainerRef = useRef(null);
    const jsonContentRef = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    

    //使用自定义 Hook 处理拖放文件事件
    useDragAndDropHook(setCurFilePath);
    //使用自定义Hook更新mermaid图形事件
    useRefreshMermaidGraphHook(curFilePath,mermaidContainerRef,jsonContentRef);
   
    // 打开模态窗口的函数
    const showModal = () => {
        setIsModalVisible(true);
    };

     // 打开模态窗口的函数
     const closeModal = () => {
        setIsModalVisible(false);
    };

    // 关闭模态窗口的函数
    const handleOk = () => {
        setIsModalVisible(false);
    };

    // 关闭模态窗口的函数
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // 获取解析后的 JSON 数据
    let jsonContent = jsonContentRef.current || {};
    
    jsonContent=jsonContent["Start1"];
    

    return (
        <div className="App">
            <Layout>

                <Layout.Header>
                </Layout.Header>

                <Layout.Content>
                    <p>{curFilePath}</p>
                    <div className="display-area" ref={mermaidContainerRef}>
                        { (!mermaidContainerRef.current || mermaidContainerRef.current.innerHTML == "") &&(
                            <p>点击或拖动 .mmd 文件到此区域上传</p>
                        )}
                    </div>

                    <FileA href="./mermaid_test2.mmd" referFilePath={curFilePath} setCurFilePath={setCurFilePath}  >
                            mermaid_test2
                    </FileA>
                    
                    <Button type="primary" onClick={showModal}>
                        打开模态窗口
                    </Button>
                    <Modal
                        title="模态窗口标题"
                        open={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <div>
                            <h3>Props 列表</h3>
                            <ul>
                                {
                                    jsonContent && jsonContent.Attrs && Object.keys(jsonContent.Attrs).forEach(keyName =>(
                                        <li key={keyName}> {jsonContent.Attrs[keyName]} </li>
                                    ))
                                }
                            </ul>
                            <h3>Links</h3>
                            <ul>
                                {jsonContent && jsonContent.Links && jsonContent.Links.map((link, index) => (
                                    <li key={index}>
                                       <FileA href={link.LinkUrl} referFilePath={curFilePath} setCurFilePath={setCurFilePath}
                                            otherClickEvents={[(e)=>{closeModal()}]} >
                                            {link.LinkText}
                                       </FileA>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Modal>

                </Layout.Content>
            
            </Layout>
        </div>
        
    );
    
};

export default App;