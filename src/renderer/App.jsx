import React,{ useState,useRef,useEffect }  from 'react';
import { Flex, Layout,Upload,Button, Modal } from 'antd';



import GraphAreaComponent from './components/GraphAreaComponent'

import useDragAndDropHook from './hooks/useDragAndDropHook';



import MermaidUtil from './utils/MermaidUtil';
import "./App.css"



const initDevicePixelRatio=window.devicePixelRatio || 1;
const App = () => {
    const [curFilePath, setCurFilePath] = useState('');
    const [error, setError] = useState('');
    const containerRef = useRef(null); // 创建一个 ref 来引用容器
   
    //使用自定义 Hook 处理拖放文件事件
    useDragAndDropHook(setCurFilePath);


    //处理缩放问题
    const handleResize=()=>{
        const scaleRatio = window.devicePixelRatio/initDevicePixelRatio;
        const baseWidth=window.innerWidth;
        containerRef.current.style.width=(baseWidth*scaleRatio)+"px";
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        
    });
   
    return (
        <div className="App" ref={containerRef}>
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