import {fill, ITemplate} from './reader';

interface IInputs {
  NB_TURN: number;
  NB_SAT: number;
  sats: ISat;
  NB_IMG: number;
  images: IImage [];
}

interface ISat {
  lat: number;
  lon: number;
  velocity: number;
  maxOrientationChange: number;
  maxOrientationValue: number;
}

interface IImage {
  score: number;
  nbImages: number;
  nbTimeRange: number;
  locations: [{x: number; y: number;}];
  ranges: [{start: number; end: number}];
}

const template: ITemplate = [
  'NB_TURNS',
  'NB_SAT',
  {
    times: 'NB_SAT',
    template: [
      ['lat', 'lon', 'velocity', 'maxOrientationChange', 'maxOrientationValue'],
    ],
    into: 'sats',
  },
  'NB_IMG',
  {
    times: 'NB_IMG',
    template: [
      ['score', 'nbImages', 'nbTimeRange'],
      {
        times: 'nbImages',
        template: [['lon', 'lat']],
        into: 'locations',
      },
      {
        times: 'nbTimeRange',
        template: [['start', 'end']],
        into: 'ranges',
      }
    ],
    into: 'images',
  }
];

export const inputs: IInputs = <any> {};
fill(inputs, template);
