
import handleIpcFile from './ipcFile.js';
const handleIpcEvents =  (ipcMain) => {

   //文件事件处理
   handleIpcFile(ipcMain);
};    

export default handleIpcEvents;