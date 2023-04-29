const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    openFile: (path) => ipcRenderer.invoke('openFile', path),
    saveFile:(path,text)=>ipcRenderer.invoke('saveFile', path,text)
})