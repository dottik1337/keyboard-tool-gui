const { app, Menu } = require('electron')
const { openConfig, saveConfig } = require('./dialogs.js')
const { exec } = require("child_process");

const CONFIG_FILE = '.config.yaml';             // Default config file path
let currentConfig = CONFIG_FILE;                // Current config file path

/**
 * Saves the config to file on path
 * @param {string} path
 */
function saveConfigFile(path){
    currentConfig = path;
    exec(`cp -f ${CONFIG_FILE} ${currentConfig}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return false;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return false;
        }
        return true;
    });
}

/**
 * Loads the config file from path
 * @param {string} path 
 */
function openConfigFile(path){
    currentConfig = path;
    exec(`cp -f ${currentConfig} ${CONFIG_FILE}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return false;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return false;
        }
        return true;
    });
}

const template = [
    {
        label: 'File',
        submenu: [
        {
            label: 'Open',
            accelerator: 'CmdOrCtrl+O',
            click: async () => {
                const path = await openConfig();
                if (path){
                    openConfigFile(path);  
                }
            }
        },
        
        {
            label: 'Save As',
            accelerator: 'CmdOrCtrl+Shift+S',
            click: async () => {
                const path = await saveConfig();
                if (path){
                    saveConfigFile(path);
                }
            }
        },
        
        {
            label: 'Save',
            accelerator: 'CmdOrCtrl+S',
            click: async () => {
                saveConfigFile(currentConfig);    
            }
        }
        ]
    }
]

module.exports.mainMenu = Menu.buildFromTemplate(template)