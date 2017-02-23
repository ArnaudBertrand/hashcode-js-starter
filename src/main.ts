import {inputs} from './inputs';
import {command} from './commands';

export function main() {
  console.log(JSON.stringify(inputs, null, 2));
  command('Hello world');
}
