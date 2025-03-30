const { contextBridge, ipcRenderer } =require('electron');
module.exports = {
    loadFile: (filepath)=>{
       return  ipcRenderer.invoke('load-file',filepath)
    }
};