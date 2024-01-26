import { IEstablecimiento, NewEstablecimiento } from './establecimiento.model';

export const sampleWithRequiredData: IEstablecimiento = {
  id: 3236,
  unicodigo: 'nicely tonight',
  nombre: 'what alleviate',
  ambitoId: 10806,
  estadoId: 24289,
};

export const sampleWithPartialData: IEstablecimiento = {
  id: 26633,
  unicodigo: 'flat',
  nombre: 'solidity',
  direccion: 'mobilise',
  telefono: 'helplessly invoice say',
  ambitoId: 5119,
  estadoId: 30500,
};

export const sampleWithFullData: IEstablecimiento = {
  id: 30417,
  unicodigo: 'where defenseless infinite',
  nombre: 'inside',
  barrio: 'gregarious',
  direccion: 'craft shock',
  referencia: 'yet duh',
  telefono: 'fondly that lunge',
  ambitoId: 18403,
  estadoId: 18431,
};

export const sampleWithNewData: NewEstablecimiento = {
  unicodigo: 'toward glass popcorn',
  nombre: 'slice nightgown terribly',
  ambitoId: 1060,
  estadoId: 13777,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
