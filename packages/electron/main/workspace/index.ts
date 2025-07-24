import type { BrowserWindow, WebContentsView } from 'electron'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import Electron from 'electron'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
interface View {
  [key: string]: WebContentsView
}

const views: View = {}
let currentView: WebContentsView

export function install() {
  let workspaceWin: BrowserWindow
  // 创建多个 BrowserView
  views.page1 = new Electron.WebContentsView()
  views.page1.webContents.loadURL('https://www.doubao.com/').then()

  views.page2 = new Electron.WebContentsView()
  views.page2.webContents.loadURL('https://www.electronjs.org/').then()

  function switchView(name: string) {
    if (currentView) {
      workspaceWin.contentView.removeChildView(currentView)
    }
    currentView = views[name]
    workspaceWin.contentView.addChildView(currentView)
    const [width, height] = workspaceWin.getContentSize()
    currentView.setBounds({ x: 220, y: 0, width: width - 220, height }) // 留点侧边给 Vue 导航栏
  }

  // 监听 Vue 发来的切换事件
  Electron.ipcMain.on('switch-view', (_, arg) => {
    if (views[arg]) {
      switchView(arg)
    }
  })
  // 监听 Vue 发来的关闭当前窗口事件
  Electron.ipcMain.on('close-current-view', () => {
    workspaceWin.contentView.removeChildView(currentView)
  })

  // 打开新窗口 并且直接到workspace路由
  Electron.ipcMain.on('open-workspace-window', async (_) => {
    // 创建新窗口实例
    const newWindow = new Electron.BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'workspace.mjs'),
      },
    })
    await newWindow.webContents.loadURL(`${process.env.VITE_DEV_SERVER_URL}workspace`)
    workspaceWin = newWindow
    // 监听win窗口变化，动态调整currentView的宽高
    workspaceWin.on('resize', () => {
      const [width, height] = workspaceWin.getContentSize()
      if (currentView) {
        currentView.setBounds({ x: 200, y: 0, width: width - 200, height }) // 留点侧边给 Vue 导航栏
      }
    })
  })
}
