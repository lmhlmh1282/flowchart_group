const handleAppEvents =  (app) => {
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

  

   
    
    
    app.on("window-all-closed",function(){
        if(process.platform !== "darwin"){
            app.quit();
        }
    });
};   

export default handleAppEvents;