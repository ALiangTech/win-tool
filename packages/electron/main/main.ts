import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { app, BrowserWindow } from 'electron'
import { install as workspace } from './workspace/index'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function creatMainWindow() {
  const win = new BrowserWindow ({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, // 这个必须开启，才能用 contextBridge
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    await win.webContents.loadURL(process.env.VITE_DEV_SERVER_URL)
  }
  else {
    // Load your file
    await win.webContents.loadFile('dist/index.html')
  }
  workspace() // 注册工作区
}

app.whenReady().then(() => creatMainWindow())
