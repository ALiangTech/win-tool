import type { BrowserWindow, WebContentsView } from 'electron'
import Electron from 'electron'

interface View {
  [key: string]: WebContentsView
}

const views: View = {}
let currentView: WebContentsView

export default function install(win: BrowserWindow) {
  // 创建多个 BrowserView
  views.page1 = new Electron.WebContentsView ()
  views.page1.webContents.loadURL('https://www.doubao.com/').then()

  views.page2 = new Electron.WebContentsView ()
  views.page2.webContents.loadURL('https://www.electronjs.org/').then()

  function switchView(name: string) {
    if (currentView) {
      win.contentView.removeChildView(currentView)
    }
    currentView = views[name]
    win.contentView.addChildView(currentView)
    currentView.setBounds({ x: 0, y: 40, width: 1000, height: 660 }) // 留点顶部给 Vue 导航栏
  }

  // 监听 Vue 发来的切换指
  Electron.ipcMain.on('switch-view', (event, arg) => {
    if (views[arg]) {
      switchView(arg)
    }
  })
}
