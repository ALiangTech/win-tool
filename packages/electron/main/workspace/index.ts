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
    const [width, height] = win.getContentSize()
    currentView.setBounds({ x: 200, y: 0, width: width - 200, height }) // 留点侧边给 Vue 导航栏
  }
  // 监听win窗口变化，动态调整currentView的宽高
  win.on('resize', () => {
    const [width, height] = win.getContentSize()
    if (currentView) {
      currentView.setBounds({ x: 200, y: 0, width: width - 200, height }) // 留点侧边给 Vue 导航栏
    }
  })

  // 监听 Vue 发来的切换指
  Electron.ipcMain.on('switch-view', (event, arg) => {
    if (views[arg]) {
      switchView(arg)
    }
  })
}
