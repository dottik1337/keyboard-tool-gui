import yaml from 'js-yaml';


const DEFAULT_BUTTON = 'x';                 // Default button bind
const CONFIG_FILE = '.config.yaml';         // Default config file path

export class FileHandler {
    constructor() {
    }

    // Read a yaml file
    async readYamlFile(filePath) {
        try {
            console.log(filePath);
            const file = await window.api.readFile(filePath);
            const data = yaml.load(file);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    // Write a yaml file
    async writeYamlFile(filePath, data) {
        try {
            const yamlDataStr = yaml.dump(data);
            await window.api.writeFile({path: filePath, data: yamlDataStr});
        } catch (error) {
            console.error(error);
        }
    }

    // Get the current bind of a key from config file
    async getCurrBind(key){
        if (key === null){
            return;
        }
        try {
            let data = await this.readYamlFile(CONFIG_FILE);
            if(key.type === "key"){
               return data.layers[0].buttons[key.y][key.x];
            }
            else if(key.type === "knob"){
                data = data.layers[0].knobs[key.x]
                if (key.y === "press"){
                    return data.press;
                }
                else if(key.y === "cw"){
                    return data.cw;
                }
                else if(key.y === "ccw"){
                    return data.ccw;
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    // Change the bind of a key in config file
    async changeBind(key, bind){
        try {
            let data = await this.readYamlFile(CONFIG_FILE);
            if(key.type === "key"){
               data.layers[0].buttons[key.y][key.x] = bind;
            }
            else if(key.type === "knob"){
                if (key.y === "press"){
                    data.layers[0].knobs[key.x].press = bind;
                }
                else if(key.y === "cw"){
                    data.layers[0].knobs[key.x].cw = bind;
                }
                else if(key.y === "ccw"){
                    data.layers[0].knobs[key.x].ccw = bind;
                }
            }
            await this.writeYamlFile(CONFIG_FILE, data);
        }
        catch (e) {
            console.error(e);
        }
    }

    // Adds row to the config file
    async addRow(){
        try {
            let data = await this.readYamlFile(CONFIG_FILE);
            let newRow = [];
            for (let i = 0; i < data.layers[0].buttons[0].length; i++){
                newRow.push(DEFAULT_BUTTON);
            }
            data.columns += 1;
            data.layers[0].buttons.push(newRow);
            await this.writeYamlFile(CONFIG_FILE, data);
        }
        catch (e) {
            console.error(e);
        }
    }

    // Removes row from the config file
    async removeRow(){
        try {
            let data = await this.readYamlFile(CONFIG_FILE);
            data.layers[0].buttons.pop();
            data.columns -= 1;
            await this.writeYamlFile(CONFIG_FILE, data);
        }
        catch (e) {
            console.error(e);
        }
    }

    // Adds column to the config file
    async addColumn(){
        try {
            let data = await this.readYamlFile(CONFIG_FILE);
            for (let i = 0; i < data.layers[0].buttons.length; i++){
                data.layers[0].buttons[i].push(DEFAULT_BUTTON);
            }
            data.rows += 1;
            await this.writeYamlFile(CONFIG_FILE, data);
        }
        catch (e) {
            console.error(e);
        }
    }

    // Removes column from the config file
    async removeColumn(){
        try {
            let data = await this.readYamlFile(CONFIG_FILE);
            for (let i = 0; i < data.layers[0].buttons.length; i++){
                data.layers[0].buttons[i].pop();
            }
            data.rows -= 1;
            await this.writeYamlFile(CONFIG_FILE, data);
        }
        catch (e) {
            console.error(e);
        }
    }

    // Adds knob to the config file
    async addKnob(){
        try {
            let data = await this.readYamlFile(CONFIG_FILE);
            data.layers[0].knobs.push({press: DEFAULT_BUTTON, cw: DEFAULT_BUTTON, ccw: DEFAULT_BUTTON});
            data.knobs += 1;
            await this.writeYamlFile(CONFIG_FILE, data);
        }
        catch (e) {
            console.error(e);
        }
    }

    // Removes knob from the config file
    async removeKnob(){
        try {
            let data = await this.readYamlFile(CONFIG_FILE);
            data.layers[0].knobs.pop();
            data.knobs -= 1;
            await this.writeYamlFile(CONFIG_FILE, data);
        }
        catch (e) {
            console.error(e);
        }
    }

    // Get the initial state of the config file
    async getInitState(){
        try {
            const data = await this.readYamlFile(CONFIG_FILE);
            const rows = data.layers[0].buttons.length;
            const columns = data.layers[0].buttons[0].length;
            const knobs = data.layers[0].knobs.length;
            return {rows: rows, columns: columns, knobs: knobs};
        }
        catch (e) {
            console.error(e);
        }
    }

    // Upload the config file to the keyboard
    uploadToKeyboard(){
        window.api.uploadToKeyboard(CONFIG_FILE);
    }
}
