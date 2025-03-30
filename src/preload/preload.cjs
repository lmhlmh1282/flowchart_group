const { contextBridge, ipcRenderer } =require('electron');
const { webUtils } = require('electron') ;
const path = require('path') ;


const mainFileProc = require(path.join(__dirname,'./mainFileProc.cjs'));

contextBridge.exposeInMainWorld('electronAPI', {
    openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
    getPathForFile: (file) => webUtils.getPathForFile(file),
    pathAPI: path,
    mainFileProc: mainFileProc,

});