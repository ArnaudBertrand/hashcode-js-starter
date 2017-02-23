const commands = [];

export function command(...args) {
  commands.push(args.join(' '));
}

export function generateReport() {
  console.log(commands);
}
