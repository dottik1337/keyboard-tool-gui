/**
 * @file 
 * @authors autmaticaly generated + Jozef Gallo <xgallo06>
 */
const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('node:path');
const fs = require('fs').promises;
const { exec } = require("child_process");
const {mainMenu} = require('./menumaker.js');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    autoHideMenuBar: false, // Hide the menu bar
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Set the main menu
  Menu.setApplicationMenu(mainMenu);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Reads file from path
ipcMain.handle("read-file", async (event, path) => {
  try {
    const fileContents = await fs.readFile(path, 'utf8');
    return fileContents;
  } catch (error) {
    console.error(error);
  }
});

// Writes data to file
ipcMain.on("write-file", async (event, data) => {
  try {
    await fs.writeFile(data.path, data.data);
  } catch (error) {
    console.error(error);
  }
});

// Uploads the config file to the keyboard
ipcMain.handle("upload-to-keyboard", async (event, path) => {
  
  exec(`which ch57x-keyboard-tool`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return false;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return false;
    }
    tool = stdout.trimEnd();
    exec(`sudo ${tool} upload ${path}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return false;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return false;
      }
      console.log(`stdout: ${stdout}`);
      return true;
    });
  });
});

