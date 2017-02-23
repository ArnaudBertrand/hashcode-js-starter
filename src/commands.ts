const fs = require('fs');
const path = require('path');
const commands = [];

export function command(...args) {
  commands.push(args.join(' '));
}

export function generateReport() {

  fs.writeFileSync(path.join(__dirname, '..', 'outputs', process.argv[2]), [commands.length, commands].join('\n'));
}
