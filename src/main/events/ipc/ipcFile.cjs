module.exports = function (ipcMain) {

    //文件事件处理
    ipcMain.handle('load-file', async (event, filePath) => {
        
        //读取文件，发送到渲染进程
        const fs = require('fs');
      
        try {
            if(fs.existsSync(filePath))
            {
                const fileContent = fs.readFileSync(filePath,'utf-8');
                console.log('load-file',filePath);
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
        const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
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