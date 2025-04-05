import { contextBridge, ipcRenderer } from 'electron';
import { webUtils } from 'electron';
import  path  from 'path' ;

import mainFileProc from './mainFileProc.mjs';

contextBridge.exposeInMainWorld('electronAPI', {
    openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
    getPathForFile: (file) => webUtils.getPathForFile(file),
    pathAPI: path,
    mainFileProc: mainFileProc,

});