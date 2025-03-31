const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('versions', {
    // Fonction qui récupère les versions via IPC
    getVersions: () => ipcRenderer.invoke('get-versions')
})