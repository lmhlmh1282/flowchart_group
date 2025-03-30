const {app,BrowserWindow,ipcMain,dialog} = require('electron') ;
const path = require('path') ;

const { fileURLToPath } =require('url');
const process = require('process') ;
const isDev = require('electron-is-dev') ;

const handleAppEvents = require(path.join(__dirname,'./events/appEvents.cjs'));
const handleIpcEvents = require(path.join(__dirname,'./events/ipc/ipcEvents.cjs'));

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            enableDragDrop: true,
            nodeIntegration:false,
            contextIsolation:true,
            sandbox: false,
            preload:path.join(path.dirname(__dirname),'preload/preload.cjs')
        }
    });

    let mainUrl = isDev ? 'http://localhost:3001' : `file://${__dirname}/dist/index.html`;
    mainWindow.loadURL(mainUrl);

}



app.whenReady().then(()=>{
    createWindow();

    //处理应用相关事件
    handleAppEvents(app);

});


handleIpcEvents(ipcMain);





