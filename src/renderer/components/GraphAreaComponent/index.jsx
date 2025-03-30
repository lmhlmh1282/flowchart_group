import React from 'react';
import { Layout } from 'antd';
import mermaid from 'mermaid';

import MermaidUtil from '../../utils/MermaidUtil';


export default class GraphAreaComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            svgCode:"",
            curFilePath:""
        };
        this.mermaidUtil=new MermaidUtil();
    }

    
    componentDidUpdate(prevProps, prevState) {
        if (this.props.curFilePath !== prevProps.curFilePath) {
            this.setState({ curFilePath: this.props.curFilePath }, () => {
                this.refreshMermaidGraph();
            });
        }

        if (this.state.svgCode !== prevState.svgCode) {
            this.mermaidUtil.bindListeners(); // 当 svgCode 变化时调用 bindListeners
        }
    }

  

    refreshMermaidGraph=async() => {
        const curFilePath=this.props.curFilePath;
        console.log(curFilePath);
        //1.更新流程图
        this.mermaidUtil.genMermaidChart(curFilePath).then((svgCode)=>{
            this.setState({svgCode:svgCode});
            
        });  
        
        //console.log("jsonContentRef: "+jsonContentRef);

    } ;

    render(){
        
       
        const svgCode =this.state.svgCode;
        
        
        return (
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
        );
    }      
}
