import { IZona, NewZona } from './zona.model';

export const sampleWithRequiredData: IZona = {
  id: 2808,
  codigo: 'freight innocently',
  nombre: 'turtle fortunately atop',
  estadoId: 29734,
};

export const sampleWithPartialData: IZona = {
  id: 1604,
  codigo: 'vice definitive',
  nombre: 'per',
  estadoId: 20921,
};

export const sampleWithFullData: IZona = {
  id: 17960,
  codigo: 'hopelessly',
  nombre: 'fooey',
  estadoId: 13889,
};

export const sampleWithNewData: NewZona = {
  codigo: 'fortunately silent wonder',
  nombre: 'failing',
  estadoId: 30199,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
