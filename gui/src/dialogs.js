/**
 * @file dialogs.js
 * @author Jozef Gallo <xgallo06>
 */
const { dialog } = require('electron');
const os = require('os');

/**
 * Open a dialog to select config file
 * @returns path to the file
 */
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

/**
 * Open a dialog to save config file
 * @returns path to save config file
 */
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

