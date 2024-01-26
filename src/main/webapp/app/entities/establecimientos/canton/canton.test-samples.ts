import { ICanton, NewCanton } from './canton.model';

export const sampleWithRequiredData: ICanton = {
  id: 15809,
  codigo: 'despite',
  nombre: 'and thief',
};

export const sampleWithPartialData: ICanton = {
  id: 2497,
  codigo: 'oh regress shrill',
  nombre: 'top whereas',
};

export const sampleWithFullData: ICanton = {
  id: 23771,
  codigo: 'front asymmetry until',
  nombre: 'incidentally how woot',
};

export const sampleWithNewData: NewCanton = {
  codigo: 'yet blond reassign',
  nombre: 'separate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
