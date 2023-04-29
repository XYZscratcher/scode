const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')
const path = require('path')
const fs = require('fs');

//var win = {};
const createWindow = () => {
    // 创建浏览窗口
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // 加载 index.html
    mainWindow.loadFile('index.html')


    // 打开开发工具
    // mainWindow.webContents.openDevTools()
}

/*const openFile = (event, path) => {
    dialog.showOpenDialog(win, { defaultPath: path })
}*/
// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    //createWindow()
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // 加载 index.html
    mainWindow.loadFile('index.html')
    /*const x=Menu.buildFromTemplate([{label:"File",submenu:[{role:"save",label:"保存"},{role:"open",label:"打开文件"}]}])
    //Menu.setApplicationMenu(x)
    mainWindow.setMenu(x)*/
    ipcMain.handle('openFile', (_event, path) => {
        const r = dialog.showOpenDialogSync(mainWindow, { 
            defaultPath: path, properties: ['openFile'], filters: [{ extensions: ["*"] }] 
        });
        
        const getExtension =p=>p.match(/\.\w*[^\/|\\]/g)[0].slice(1);
        console.log(getExtension(r[0]))
        return { v: fs.readFileSync(r[0], { encoding: 'utf-8' }), ext:getExtension(r[0]),path:r[0]};
    })
    ipcMain.handle('saveFile',(_event,path,text)=>{
        if(text){
        fs.writeFileSync(path,text);}
        else{
            let p=dialog.showOpenDialogSync(mainWindow,{defaultPath:path,buttonLabel:"保存",properties:['promptToCreate']});
            
        }
    })
    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。

