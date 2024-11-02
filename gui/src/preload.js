// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

const API = {
    readFile: (path) => ipcRenderer.invoke('read-file', path),
    writeFile: (data) => ipcRenderer.send('write-file', data),
}

contextBridge.exposeInMainWorld('api', API);
