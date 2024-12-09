/**
 * @file 
 * @authors automaticaly generated + Jozef Gallo <xgallo06>
 */
import { contextBridge, ipcRenderer } from 'electron';

const API = {
    readFile: (path) => ipcRenderer.invoke('read-file', path),
    writeFile: (data) => ipcRenderer.send('write-file', data),
    uploadToKeyboard: (path) => ipcRenderer.invoke('upload-to-keyboard', path),
}

contextBridge.exposeInMainWorld('api', API);
