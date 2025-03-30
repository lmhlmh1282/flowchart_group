
const path = require('path') ;

const handleIpcFile = require(path.join(__dirname, './ipcFile.cjs'));
module.exports = function (ipcMain) {

   //文件事件处理
   handleIpcFile(ipcMain);
};    