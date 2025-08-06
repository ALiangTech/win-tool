// console.log('preload')
// const { contextBridge, ipcRenderer } = require('electron')

import type { NavItem } from '~/pages/browser/store/type'
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('e_workspace', {
  switchView: (viewName: string) => ipcRenderer.send('switch-view', viewName),
  closeCurrentView: () => ipcRenderer.send('close-current-view'),
  initViews: (views: NavItem[]) => ipcRenderer.send('init-views', views),
} as WorkSpace)
