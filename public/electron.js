const path = require('path');
const electron = require('electron');

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const isDev = isEnvSet ? getFromEnv : !app.isPackaged;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
