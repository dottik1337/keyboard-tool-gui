import React from 'react'
import Key from './Key.jsx';
import PlusMinus from './PlusMinus.jsx';
import Knob from './Knob.jsx';
import { useState, useContext, useEffect } from 'react';
import { FileHandler } from '../fileHandler.js';
import { KeyboardContext } from './App.jsx';

const fh = new FileHandler();

const MAX_ROWS = 4;
const MAX_COLUMNS = 3;
const MAX_KNOBS = 2;


export default function Keyboard() {

  const [keyboard, setKeyboard] = useContext(KeyboardContext);
  

  const clickPlusColumn = () => {
    if (keyboard.columns < MAX_COLUMNS) {
      setKeyboard(k => ({...k, columns: k.columns + 1}));
      fh.addColumn();
    }
  }
  const clickMinusColumn = () => {
    if (keyboard.columns > 1){
      setKeyboard(k => ({...k, columns: k.columns - 1}));
      fh.removeColumn();
    }
  }
  const clickPlusRow = () => {
    if (keyboard.rows < MAX_ROWS) {
      setKeyboard(k => ({...k, rows: k.rows + 1}));
      fh.addRow();
    }
  }
  const clickMinusRow = () => {
    if (keyboard.rows > 1){
      setKeyboard(k => ({...k, rows: k.rows - 1}));
      fh.removeRow();
    }
  }
  const clickPlusKnob = () => {
    if (keyboard.knobs < MAX_KNOBS) {
      setKeyboard(k => ({...k, knobs: k.knobs + 1}));
      fh.addKnob();
    }
  }
  const clickMinusKnob = () => {
    if (keyboard.knobs > 1){
      setKeyboard(k => ({...k, knobs: k.knobs - 1}));
      fh.removeKnob();
    }
  }

  const knobPlusMinus = {
    gridColumn: '2',
    gridRow: '4'
  };
  const firstPlusMinus = {
    gridColumn: '2',
    gridRow: '1'
  };
  const secondPlusMinus = {
    gridColumn: '1',
    gridRow: '2'
  };
  return (
    <div className='keyboard'>
      <div></div>
      <PlusMinus style={firstPlusMinus} clickPlus={clickPlusColumn} clickMinus={clickMinusColumn}/>
      <PlusMinus style={secondPlusMinus} clickPlus={clickPlusRow} clickMinus={clickMinusRow}/>
      <Keys rows={keyboard.rows} columns={keyboard.columns}/>
      <div></div>
      <Knobs knobs={keyboard.knobs} />
      <PlusMinus style={knobPlusMinus} clickPlus={clickPlusKnob} clickMinus={clickMinusKnob}/>
    </div>
    
  );
} 

function Keys(props) {

  let keys = [];

  for (let i = 0; i < props.rows; i++) {
    for (let j = 0; j < props.columns; j++) {
      keys.push({ row: i, column: j });
    }
  }
  
  let keys_grid = {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
    gridTemplateRows: `repeat(${props.rows}, 1fr)`,
    gap: '1px',
    maxWidth: '300px',
    justifyItems: 'center',
    margin: 'auto',
    gridColumn: '2',
    gridRow: '2'
  };


  return (
    <div style={keys_grid}>
      {keys.map((key, index) => {
        return <Key key={index} row={key.row} column={key.column}/>
          
      })}
    </div>
  )
}

function Knobs(props) {
  let knbs=[]

  for (let i = 0; i < props.knobs; i++) {
    knbs.push({ knob: i });
  } 


  const style = {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
  }
  return (
    <div style={style}>
      {knbs.map((knob, index) => {
        return <Knob key={index} knob={knob.knob}/>
      })}
    </div>
  )
}
