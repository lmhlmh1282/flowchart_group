import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

export default class FileA extends React.Component {

    handleChangeFilePath=(event)=>
    {
        event.preventDefault();
        const srcFilePath=event.target.attributes["href"].nodeValue;
        const pathAPI =window.electronAPI.pathAPI;
        const curFilePath=this.props.curFilePath;
        const dstFilePath=pathAPI.join(pathAPI.dirname(curFilePath),srcFilePath);
        //console.log("dstFilePath ",dstFilePath);

        //托放文件后，把文件路径更新到state中
        const setCurFilePath  = this.props.setCurFilePath;
        setCurFilePath(dstFilePath);
    }

    onClick=(e)=>{
        e.preventDefault();
        this.handleChangeFilePath(e);
        
        //其他点击事件
        if(this.props.otherClickEvents && Array.isArray(this.props.otherClickEvents))
        {
            this.props.otherClickEvents.forEach(element => {
                element(e);
            });
        }
       
    }

    render(){
        const href=this.props.href;
        const children=this.props.children;
       
        return (
            <a   href={href} onClick={this.onClick}>{children}</a>
        );
    }      
}


// 声明 props 的类型
FileA.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    curFilePath: PropTypes.string.isRequired,
    setCurFilePath: PropTypes.func.isRequired,
    otherClickEvents: PropTypes.arrayOf(PropTypes.func)
};

// 声明 props 的默认值
FileA.defaultProps = {
    otherClickEvents: []
};