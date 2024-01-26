import { IDistrito, NewDistrito } from './distrito.model';

export const sampleWithRequiredData: IDistrito = {
  id: 22562,
  codigo: 'rehabilitate righteously',
  nombre: 'where',
};

export const sampleWithPartialData: IDistrito = {
  id: 24588,
  codigo: 'supposing',
  nombre: 'however yet',
};

export const sampleWithFullData: IDistrito = {
  id: 15321,
  codigo: 'slowly membrane',
  nombre: 'jewelry glorious worth',
};

export const sampleWithNewData: NewDistrito = {
  codigo: 'arrogantly',
  nombre: 'dimly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
