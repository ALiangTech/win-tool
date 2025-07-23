// console.log('preload')
// const { contextBridge, ipcRenderer } = require('electron')

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('e_workspace', {
  switchView: (viewName: string) => ipcRenderer.send('switch-view', viewName),
  closeCurrentView: () => ipcRenderer.send('close-current-view'),
} as WorkSpace)
