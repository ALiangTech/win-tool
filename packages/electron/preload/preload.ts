// console.log('preload')
// const { contextBridge, ipcRenderer } = require('electron')

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('e_workspace', {
  openWorkSpaceWindow: (workspaceName: string) => ipcRenderer.send('open-workspace-window', workspaceName),
})
