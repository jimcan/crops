const { app, BrowserWindow, nativeTheme, Tray, Menu, ipcMain } = require('electron')
const electronIsDev = require('electron-is-dev')
const path = require('path')
const url = require('url')

let mainWindow
let tray

let reactHasLoaded = false
let isAppQuiting = false

const gotTheLock = app.requestSingleInstanceLock()

if (gotTheLock) {
  app.on('second-instance', () => {
    if (mainWindow) mainWindow.show()
  })
  app.whenReady().then(createWindow)
} else {
  isAppQuiting = true
  app.quit()
}

app.on('before-quit', () => {
  isAppQuiting = true
})

app.on('quit', () => {
  tray.destroy()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    isAppQuiting = true
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

ipcMain.on('react-loaded', (event) => {
  reactHasLoaded = true;
  event.reply('system-theme-changed', nativeTheme.shouldUseDarkColors);
})

ipcMain.on('change-theme', (_event, args) => {
  nativeTheme.themeSource = args
})

ipcMain.on('toggle-launch-at-startup', (_event, args) => {
  toggleLaunchAtStartup(args)
})

nativeTheme.on('updated', () => {
  mainWindow.webContents.send(
    'system-theme-changed',
    nativeTheme.shouldUseDarkColors
  )
})

function toggleLaunchAtStartup(value) {
  app.setLoginItemSettings({ openAsHidden: true, openAtLogin: value });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'My App',
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  const indexHtmlUrl = url.pathToFileURL(
    path.resolve(__dirname, '../build/index.html')
  ).href
  mainWindow.loadURL(electronIsDev ? 'http://localhost:3000' : indexHtmlUrl)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => (mainWindow = null))
  mainWindow.on('close', windowClose)
  mainWindow.on('show', () =>
    mainWindow.webContents.send('set-window-progress')
  )

  mainWindow.setMenu(Menu.buildFromTemplate([
    {
      label: 'My App',
      submenu: [
        {
          label: 'Jimcan',
          type: 'normal',
          click: () => console.log('Hello')
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          type: 'normal',
          click() {
            isAppQuiting = true
            app.quit()
          },
        }
      ]
    }
  ]))

  initTray()
}

function windowClose(event) {
  if (isAppQuiting) {
    if (reactHasLoaded) {
      event.preventDefault()
      mainWindow.webContents.send('before-close', null)
    }
  } else {
    event.preventDefault()
    mainWindow.hide()
  }
}

function initTray() {
  tray = new Tray(path.join(__dirname, './logo192.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open My App',
      type: 'normal',
      click: () => mainWindow.show(),
    },
    {
      label: 'Quit',
      type: 'normal',
      click() {
        isAppQuiting = true
        app.quit()
      },
    },
  ])
  tray.on('click', () => {
    mainWindow.show()
  })
  tray.setContextMenu(contextMenu)
}
