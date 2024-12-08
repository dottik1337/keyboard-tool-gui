import React from 'react'
import styles from './css/PCKeyboard.module.css';
import { useContext, createContext, useEffect } from 'react';
import {KeyboardKey, KeyAndHalf, DoubleKey, DoubleAndHalfKey, Space} from './KeyboardKey.jsx';
import { KeyboardSettingsContext } from './Settings.jsx';

export const clickContext = createContext();

export default function PCKeyboardKeyboard() {
    
    const keyboard = useContext(KeyboardSettingsContext);
    const handleClick = (key) => {
        key = key.toLowerCase();
        if (key == 'esc') {
            key = 'escape';
        }
        //check for modifiers
        const keyList = keyboard.key.split('-');
        const modifiers = ['shift', 'ctrl', 'alt', 'win','rshift', 'rctrl', 'ralt', 'rwin' ];
        if (keyList.length > 0 && modifiers.includes(keyList[keyList.length-1])
            && !keyList.includes(key)) {

            keyboard.setKey((k) => k + '-' +key);
            return;
        }
        keyboard.setKey(key);
        
    }

    useEffect(() => {
        
        const handleClickEvent = (event) => {
            if(event.target.id === 'keyboardOverlay') {
                keyboard.setIsKeyboardOpen(false);
            }
        }

        document.getElementById('keyboardOverlay').addEventListener('click', handleClickEvent);
        
    
    }, []);

    return (
        <clickContext.Provider value={handleClick}>
            <div id="keyboardOverlay" className={`${styles.overlay}`}>
                <div className={styles.selectedkeys}>
                    <h1>Selected keys</h1>
                    <p>{keyboard.key}</p>
                </div>
                <div className={styles.keyboard}>
                    <div className={styles.row}>
                        <KeyboardKey><p>Esc</p></KeyboardKey>
                        <div className={styles.gap}></div>
                        <KeyboardKey><p>F1</p></KeyboardKey>
                        <KeyboardKey><p>F2</p></KeyboardKey>
                        <KeyboardKey><p>F3</p></KeyboardKey>
                        <KeyboardKey><p>F4</p></KeyboardKey>
                        <div className={styles.gap}></div>
                        <KeyboardKey><p>F5</p></KeyboardKey>
                        <KeyboardKey><p>F6</p></KeyboardKey>
                        <KeyboardKey><p>F7</p></KeyboardKey>
                        <KeyboardKey><p>F8</p></KeyboardKey>
                        <div className={styles.gap}></div>
                        <KeyboardKey><p>F9</p></KeyboardKey>
                        <KeyboardKey><p>F10</p></KeyboardKey>
                        <KeyboardKey><p>F11</p></KeyboardKey>
                        <KeyboardKey><p>F12</p></KeyboardKey>
                    </div>
                    <div className={styles.row}>
                        <KeyboardKey><p>`</p></KeyboardKey>
                        <KeyboardKey><p>1</p></KeyboardKey>
                        <KeyboardKey><p>2</p></KeyboardKey>
                        <KeyboardKey><p>3</p></KeyboardKey>
                        <KeyboardKey><p>4</p></KeyboardKey>
                        <KeyboardKey><p>5</p></KeyboardKey>
                        <KeyboardKey><p>6</p></KeyboardKey>
                        <KeyboardKey><p>7</p></KeyboardKey>
                        <KeyboardKey><p>8</p></KeyboardKey>
                        <KeyboardKey><p>9</p></KeyboardKey>
                        <KeyboardKey><p>0</p></KeyboardKey>
                        <KeyboardKey><p>-</p></KeyboardKey>
                        <KeyboardKey><p>=</p></KeyboardKey>
                        <KeyAndHalf><p>Backspace</p></KeyAndHalf>
                    </div>
                    <div className={styles.row}>
                        <KeyAndHalf><p>Tab</p></KeyAndHalf>
                        <KeyboardKey><p>Q</p></KeyboardKey>
                        <KeyboardKey><p>W</p></KeyboardKey>
                        <KeyboardKey><p>E</p></KeyboardKey>
                        <KeyboardKey><p>R</p></KeyboardKey>
                        <KeyboardKey><p>T</p></KeyboardKey>
                        <KeyboardKey><p>Y</p></KeyboardKey>
                        <KeyboardKey><p>U</p></KeyboardKey>
                        <KeyboardKey><p>I</p></KeyboardKey>
                        <KeyboardKey><p>O</p></KeyboardKey>
                        <KeyboardKey><p>P</p></KeyboardKey>
                        <KeyboardKey><p>(</p></KeyboardKey>
                        <KeyboardKey><p>)</p></KeyboardKey>
                        <KeyboardKey><p>\</p></KeyboardKey>
                    </div>
                    <div className={styles.row}>
                        <DoubleKey><p>CapsLock</p></DoubleKey>
                        <KeyboardKey><p>A</p></KeyboardKey>
                        <KeyboardKey><p>S</p></KeyboardKey>
                        <KeyboardKey><p>D</p></KeyboardKey>
                        <KeyboardKey><p>F</p></KeyboardKey>
                        <KeyboardKey><p>G</p></KeyboardKey>
                        <KeyboardKey><p>H</p></KeyboardKey>
                        <KeyboardKey><p>J</p></KeyboardKey>
                        <KeyboardKey><p>K</p></KeyboardKey>
                        <KeyboardKey><p>L</p></KeyboardKey>
                        <KeyboardKey><p>;</p></KeyboardKey>
                        <KeyboardKey><p>'</p></KeyboardKey>
                        <KeyAndHalf><p>Enter</p></KeyAndHalf>
                    </div>
                    <div className={styles.row}>
                        <KeyAndHalf><p>Shift</p></KeyAndHalf>
                        <KeyboardKey><p>Z</p></KeyboardKey>
                        <KeyboardKey><p>X</p></KeyboardKey>
                        <KeyboardKey><p>C</p></KeyboardKey>
                        <KeyboardKey><p>V</p></KeyboardKey>
                        <KeyboardKey><p>B</p></KeyboardKey>
                        <KeyboardKey><p>N</p></KeyboardKey>
                        <KeyboardKey><p>M</p></KeyboardKey>
                        <KeyboardKey><p>,</p></KeyboardKey>
                        <KeyboardKey><p>.</p></KeyboardKey>
                        <KeyboardKey><p>/</p></KeyboardKey>
                        <KeyboardKey><p>?</p></KeyboardKey>
                        <DoubleKey><p>RShift</p></DoubleKey>
                    </div>
                    <div className={styles.row}>
                        <KeyAndHalf><p>Ctrl</p></KeyAndHalf>
                        <KeyAndHalf><p>Win</p></KeyAndHalf>
                        <KeyAndHalf><p>Alt</p></KeyAndHalf>
                        <Space></Space>
                        <KeyAndHalf><p>RAlt</p></KeyAndHalf>
                        <KeyAndHalf><p>RWin</p></KeyAndHalf>
                        <KeyAndHalf><p>RCtrl</p></KeyAndHalf>
                    </div>
                
                </div>
                <div className={styles.randkeys}>
                    <KeyboardKey><p>F13</p></KeyboardKey>
                    <KeyboardKey><p>F14</p></KeyboardKey>
                    <KeyboardKey><p>F15</p></KeyboardKey>
                    <KeyboardKey><p>F16</p></KeyboardKey>
                    <KeyboardKey><p>F17</p></KeyboardKey>
                    <KeyboardKey><p>F18</p></KeyboardKey>
                    <KeyboardKey><p>F19</p></KeyboardKey>
                    <KeyboardKey><p>F20</p></KeyboardKey>
                    <KeyboardKey><p>F21</p></KeyboardKey>
                    <KeyboardKey><p>F22</p></KeyboardKey>
                    <KeyboardKey><p>F23</p></KeyboardKey>
                    <KeyboardKey><p>F24</p></KeyboardKey>
                    <DoubleKey><p>PrintScreen</p></DoubleKey>
                    <DoubleKey><p>ScrollLock</p></DoubleKey>
                    <DoubleKey><p>Pause</p></DoubleKey>
                    <DoubleKey><p>Insert</p></DoubleKey>
                    <DoubleKey><p>Home</p></DoubleKey>
                    <DoubleKey><p>PageUp</p></DoubleKey>
                    <DoubleKey><p>Delete</p></DoubleKey>
                    <DoubleKey><p>End</p></DoubleKey>
                    <DoubleKey><p>PageDown</p></DoubleKey>
                    <KeyboardKey><p>Right</p></KeyboardKey>
                    <KeyboardKey><p>Left</p></KeyboardKey>
                    <KeyboardKey><p>Down</p></KeyboardKey>
                    <KeyboardKey><p>Up</p></KeyboardKey>
                    <DoubleKey><p>NumLock</p></DoubleKey>
                    <DoubleAndHalfKey><p>NumpadSlash</p></DoubleAndHalfKey>
                    <DoubleAndHalfKey><p>NumpadAsterisk</p></DoubleAndHalfKey>
                    <DoubleAndHalfKey><p>NumpadMinus</p></DoubleAndHalfKey>
                    <DoubleKey><p>NumpadPlus</p></DoubleKey>
                    <DoubleKey><p>NumpadEnter</p></DoubleKey>
                    <KeyAndHalf><p>Numpad1</p></KeyAndHalf>
                    <KeyAndHalf><p>Numpad2</p></KeyAndHalf>
                    <KeyAndHalf><p>Numpad3</p></KeyAndHalf>
                    <KeyAndHalf><p>Numpad4</p></KeyAndHalf>
                    <KeyAndHalf><p>Numpad5</p></KeyAndHalf>
                    <KeyAndHalf><p>Numpad6</p></KeyAndHalf>
                    <KeyAndHalf><p>Numpad7</p></KeyAndHalf>
                    <KeyAndHalf><p>Numpad8</p></KeyAndHalf>
                    <KeyAndHalf><p>Numpad9</p></KeyAndHalf>
                    <KeyAndHalf><p>Numpad0</p></KeyAndHalf>
                    <DoubleKey><p>NumpadDot</p></DoubleKey>
                    <DoubleAndHalfKey><p>NonUsBackslash</p></DoubleAndHalfKey>
                    <DoubleKey><p>Application</p></DoubleKey>
                    <KeyAndHalf><p>Power</p></KeyAndHalf>
                    <DoubleKey><p>NumpadEqual</p></DoubleKey>
                    
                </div>
            </div>
        </clickContext.Provider>
    )
}
