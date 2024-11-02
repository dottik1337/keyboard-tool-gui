

export function handleKeyEvent(event) {
  let combination = [];

  if (event.ctrlKey) combination.push('ctrl');
  if (event.shiftKey) combination.push('shift');
  if (event.altKey) combination.push('alt');
  if (event.metaKey) combination.push('win');
  const modifiers = ['Control', 'Shift', 'Alt', 'Meta'];

  if (!modifiers.includes(event.key)) {
    combination.push(getKeyAlias(event));
  }
  if (combination.length === 0) {
    return '';
  }
  return combination.join('-');
}

function getKeyAlias(event){
  const key = event.key.toLowerCase();
  const keyChar = event.keyCode;
  switch (key) {
    case ' ':
      return 'space';
    case '.':
      return 'dot';
    case ',':
      return 'comma';
    case '/':
      return 'slash';
    case '\\':
      return 'backslash';
    case ';':
      return 'semicolon';
    case '\'':
      return 'quote';
    case '(':
      return 'leftbracket';
    case ')':
      return 'rightbracket';
    case '-':
      return 'minus';
    case '=':
      return 'equal';
    case 'arrowup':
      return 'up';
    case 'arrowdown':
      return 'down';
    case 'arrowleft':
      return 'left';
    case 'arrowright':
      return 'right';
    case '`':
      return 'grave';
    case '+':
      return 'numpadplus';
    case '*':
      return 'numpadasterisk';
    case 'escape':
    case 'enter':
    case 'tab':
    case 'backspace':
    case 'delete':
    case 'insert':
    case 'pageup':
    case 'pagedown':
    case 'home':
    case 'end':
      return key;
  }
  if ((key.charCodeAt(0) >= 97 && key.charCodeAt(0) <= 122)
    || (key.charCodeAt(0) >= 48 && key.charCodeAt(0) <= 57)) {
    return key;
  }

  if ((event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 96 && event.keyCode <= 105)) {
    return String.fromCharCode(keyChar).toLowerCase();
  }
  return '';
}