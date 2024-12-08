const { dialog } = require('electron');
const os = require('os');

export async function openConfig() {
    let options = {
      title: "Load Config File",
      properties: ['openFile'],
      filters: [
        { name: 'YAML Files', extensions: ['yaml'] }
      ]
    };
    const file = await dialog.showOpenDialog(options);
    if (file.canceled) {
      return;
    }
    return file.filePaths[0];
}

export async function saveConfig() {
    let options = {
      title: "Save Config File",
      filters: [
        { name: 'YAML Files', extensions: ['yaml'] }
      ]
    };
    const file = await dialog.showSaveDialog(options);
    if (file.canceled) {
      return;
    }
    return file.filePath;
}

