import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
const DropzoneComponent = ({ setCurFilePath,setError }) => {
   
    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            if (file.type === 'text/markdown' || file.name.endsWith('.mmd')) {
                console.log('file.path: ', file.path);
                setCurFilePath(file.path);
                
            } else {
               setError('请上传有效的 .mmd 文件');
            }
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false
    });

    return (
        <div {...getRootProps()} style={{
            border: '2px dashed #ccc',
            padding: '20px',
            textAlign: 'center',
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <input {...getInputProps()} style={{ display: 'none' }} />
           
        </div>
    );
};

// 定义 prop 类型
DropzoneComponent.propTypes = {
    setCurFilePath: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};

export default DropzoneComponent;