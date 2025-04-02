const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('versions', {
    // Fonction qui récupère les versions via IPC
    getVersions: () => ipcRenderer.invoke('get-versions')
})

contextBridge.exposeInMainWorld('inscription', {
    add: (nom, prenom, email, password) => ipcRenderer.invoke('inscription:add', {nom, prenom, email, password})
})