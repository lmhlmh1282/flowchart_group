
import fs from 'fs';
import { dialog } from 'electron';
import logger from "../../logger.js"
const handleIpcFile =  (ipcMain) => {

    //文件事件处理
    ipcMain.handle('load-file', async (event, filePath) => {
        
        //读取文件，发送到渲染进程
        try {
            if(fs.existsSync(filePath))
            {
                const fileContent = fs.readFileSync(filePath,'utf-8');
                logger.debug('load-file',filePath);
                return fileContent;
            }
           
        } catch (error) {
            console.error('Failed to read file:', error);
            throw error;
        };

        return ""
       
    });

    //打开文件对话框
    ipcMain.handle('open-file-dialog', async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog(ipcMain.mainWindow, {
            properties: ['openFile'],
            filters: [
                { name: 'MMD Files', extensions: ['mmd'] }
            ]
        });
        if (!canceled) {
            return filePaths[0];
        }
        return null;
    });
 };    


 export default handleIpcFile;