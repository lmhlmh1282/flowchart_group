import { contextBridge, ipcRenderer } from 'electron';
const mainFileProc = {
    loadFile: (filepath)=>{
       return  ipcRenderer.invoke('load-file',filepath)
    }
};

export default mainFileProc;