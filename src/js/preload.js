const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('versions', {
    // Fonction qui récupère les versions via IPC
    getVersions: () => ipcRenderer.invoke('get-versions')
})

contextBridge.exposeInMainWorld('user', {
    addUser: (nom, prenom, email, password) => ipcRenderer.invoke('user:addUser', nom, prenom, email, password)
})