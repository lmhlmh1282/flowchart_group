import {app,BrowserWindow,ipcMain,dialog} from 'electron' ;
import path from 'path' ;
import url from 'url';
import  isDev from 'electron-is-dev' ;

import handleAppEvents from './events/appEvents.js';
import handleIpcEvents from './events/ipc/ipcEvents.js';

let mainWindow;
const __filename = url.fileURLToPath(import.meta.url); // 获取当前文件路径
const __dirname = path.dirname(__filename); // 获取当前目录路径
function createWindow(){
    mainWindow = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            enableDragDrop: true,
            nodeIntegration:true,
            contextIsolation:true,
            sandbox: false,
            preload:path.join(path.dirname(__dirname),'preload/preload.mjs')
        }
    });
    
    const urlFile=path.join(__dirname,"../../dist/index.html");
    let mainUrl = isDev ? 'http://localhost:3001' : `file://${urlFile}`;
    mainWindow.loadURL(mainUrl);

}



app.whenReady().then(()=>{
    createWindow();

    //处理应用相关事件
    handleAppEvents(app);

});


handleIpcEvents(ipcMain);





