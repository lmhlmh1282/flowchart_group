import React,{ useState,useRef,useEffect }  from 'react';
import { Flex, Layout,Upload,Button, Modal } from 'antd';


import FileA from './components/FileA'
import GraphAreaComponent from './components/GraphAreaComponent'

import useDragAndDropHook from './hooks/useDragAndDropHook';
import useRefreshMermaidGraphHook from './hooks/useRefreshMermaidGraphHook';


import MermaidUtil from './utils/MermaidUtil';
import "./App.css"




const App = () => {
    const [curFilePath, setCurFilePath] = useState('');
    const [error, setError] = useState('');

    const jsonContentRef = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    

    //使用自定义 Hook 处理拖放文件事件
    useDragAndDropHook(setCurFilePath);
    //使用自定义Hook更新mermaid图形事件
    useRefreshMermaidGraphHook(curFilePath,jsonContentRef);
   
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
                    <GraphAreaComponent   curFilePath={curFilePath}>
                      
                    </GraphAreaComponent>

                 
                    
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
                           
                            {
                                jsonContent && jsonContent.Attrs && (
                                    <table className="table-with-border"> 
                                        <thead>
                                            <tr>
                                                <th>Key</th>
                                                <th>Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(jsonContent.Attrs).map(keyName => (
                                                <tr key={keyName}>
                                                    <td>{keyName}</td>
                                                    <td>{jsonContent.Attrs[keyName]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    
                                    
                                )
                            }
                        
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