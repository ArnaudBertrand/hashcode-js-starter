import {inputs} from './inputs';
import {command} from './commands';

export function main() {
  console.log(inputs);
  console.log(inputs.warehouses, ' --- ',  inputs.orders)
  command('Hello world');
}
