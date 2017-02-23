var fs = require('fs');
var path = require('path');

var ifile = fs.readFileSync(path.join(__dirname, '..', 'inputs', process.argv[2]), 'utf8');
var lines = ifile.split('\n');
var elems = lines.map(line => line.split(' '));

var cursor = 0;
export function fill(inputs, template: ITemplate, transfomations = {}) {
  var setInput = createSetInput(inputs, transfomations);

  for (var i = 0; i < template.length; i++) {
    var instruction = template[i];

    // Handle single elements
    if (instruction instanceof Array) {
      for (var j = 0; j < instruction.length; j++) {
        var key = instruction[j];
        setInput(key, elems[cursor][j]);
      }
      cursor++;
      continue;
    }

    if (typeof instruction === 'object') {
      const nj = typeof instruction.times === 'string' ? inputs[instruction.times] : instruction.times; 
      const items = [];

      for (var j = 0; j < nj; j++) {
        const obj = {};
        fill(obj, instruction.template);
        items.push(obj);
      }
      setInput(instruction.into, items)
    }

    if (typeof instruction === 'string') {
      var tempArr = instruction.split('...');

      // Single elements
      if (tempArr.length === 1) {
        setInput(tempArr[0], lines[cursor]);
        cursor++;
        continue;
      }

      const [nb, key] = tempArr;

      // Single line
      if (!nb) {
        setInput(key, elems[cursor]);
        cursor++;
        continue;
      }

      // Multi lines
      setInput(key, lines.slice(cursor, cursor + parseInt(inputs[nb])));
      cursor  += parseInt(nb);
    }
  }
}

function createSetInput(inputs, transfomations) {
  return (path, value) => {
    if (transfomations[path]) {
      inputs[path] = transfomations[path];
    }
    inputs[path] = type(value);
  }
}

function type(value) {
  if (typeof value === 'string') {
    return isNaN(parseInt(value)) ? value : parseInt(value)
  }

  if (value instanceof Array) {
    return value.map(val => type(val));
  }

  return value;
}

export type ITemplate = IInstruction [];

export type IInstruction = string | string [] | IMultilineInstruction;

export interface IMultilineInstruction {
  times: number | string;
  template: ITemplate;
  into: string;
}
