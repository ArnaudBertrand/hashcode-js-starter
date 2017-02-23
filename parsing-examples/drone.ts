import {fill, ITemplate} from './reader';

interface IInputs {
  NB_ROWS: number;
  NB_COLUMNS: number;
  NB_DRONES: number;
  NB_TURNS: number;
  MAX_PAYLOAD: number;
  NB_PRODUCTS_TYPES: number;
  products: number [];
  NB_WAREHOUSE: number;
  warehouses: IWarehouse [];
  NB_ORDERS: number;
  orders: IOrder,
}

interface IWarehouse {
  x: number;
  y: number;
  items: number [];
}

interface IOrder {
  x: number;
  y: number;
  items: number [];
}

const template: ITemplate = [
  ['NB_ROWS', 'NB_COLUMNS', 'NB_DRONES', 'NB_TURNS', 'MAX_PAYLOAD'],
  'NB_PRODUCTS_TYPES',
  '...products',
  'NB_WAREHOUSE',
  {
    times: 'NB_WAREHOUSE',
    template: [
      ['x', 'y'],
      '...items',
    ],
    into: 'warehouses',
  },
  'NB_ORDERS',
  {
    times: 'NB_ORDERS',
    template: [
      ['x', 'y'],
      [],
      '...items',
    ],
    into: 'orders',
  }
];

export const inputs: IInputs = <any> {};
fill(inputs, template);
