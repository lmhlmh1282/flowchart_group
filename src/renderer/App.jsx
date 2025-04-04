import React,{ useState,useRef,useEffect }  from 'react';
import { Flex, Layout,Upload,Button, Modal } from 'antd';



import GraphAreaComponent from './components/GraphAreaComponent'

import useDragAndDropHook from './hooks/useDragAndDropHook';



import MermaidUtil from './utils/MermaidUtil';
import "./App.css"




const App = () => {
    const [curFilePath, setCurFilePath] = useState('');
    const [error, setError] = useState('');

  
    //使用自定义 Hook 处理拖放文件事件
    useDragAndDropHook(setCurFilePath);
   
    return (
        <div className="App">
            <Layout>

                <Layout.Header>
                </Layout.Header>

                <Layout.Content>
                    <p>{curFilePath}</p>

                    <GraphAreaComponent   curFilePath={curFilePath} setCurFilePath={setCurFilePath}>                      
                    </GraphAreaComponent>

                </Layout.Content>
            
            </Layout>
        </div>
        
    );
    
};

export default App;