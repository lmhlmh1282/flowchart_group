import React,{useState,useRef, useEffect, Fragment} from 'react';
import { Flex, Layout,Upload,Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown'; // 引入 react-markdown
import remarkGfm from 'remark-gfm';


import FileA from '../FileA'
function ModalContentWindow (props) {

    // 打开模态窗口的函数
    const closeModal = () => {
        props.setIsModalVisible(false);
    };

    // 关闭模态窗口的函数
    const handleOk = () => {
        props.setIsModalVisible(false);
    };

    // 关闭模态窗口的函数
    const handleCancel = () => {
        props.setIsModalVisible(false);
    };

     // 自定义 a 标签的渲染函数
    const CustomLink = ({ href, children }) => {
      
        return (
            <FileA href={href} {...props}>
                {children}
            </FileA>
        );
    };

    useEffect(()=>{
        props.setIsModalVisible(props.isModalVisible);
        //console.log("ModalContentWindow props.isModalVisible",props.isModalVisible);
    },[props.isModalVisible])

    useEffect(()=>{
        props.setIsModalVisible(false);
        //console.log("ModalContentWindow props.isModalVisible",props.isModalVisible);
    },[props.curFilePath])



    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '16px 0',
    };
    
    const thStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#f2f2f2',
    };
    
    const tdStyle = {
        border: '1px solid #ddd',
        padding: '8px',
    };

    return (
        <Modal
            title=""
            open={props.isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="ok" type="primary" onClick={handleOk}>
                    确定
                </Button>,
            ]}
        >
            <div>
                <Fragment>
                <ReactMarkdown
                    components={{
                        a: CustomLink,
                        table: ({ node, ...props }) => <table style={tableStyle} {...props} />,
                        th: ({ node, ...props }) => <th style={thStyle} {...props} />,
                        td: ({ node, ...props }) => <td style={tdStyle} {...props} />,
                    }}
                    remarkPlugins={[remarkGfm]} // 使用 remark-gfm 插件
                >
                        {props.modalWindowData}
                    </ReactMarkdown>
                </Fragment>
            </div>
        </Modal>
    )
}

// 声明 props 的结构
ModalContentWindow.propTypes = {

    curFilePath: PropTypes.string.isRequired,
    isModalVisible: PropTypes.bool.isRequired,
    modalWindowData: PropTypes.string.isRequired,

    setCurFilePath: PropTypes.func.isRequired,
    setIsModalVisible: PropTypes.func.isRequired,
};

export default ModalContentWindow;