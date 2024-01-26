import { ICantonTerritorio, NewCantonTerritorio } from './canton-territorio.model';

export const sampleWithRequiredData: ICantonTerritorio = {
  id: 10924,
  codigo: 'numb',
  nombre: 'frightfully nervously',
};

export const sampleWithPartialData: ICantonTerritorio = {
  id: 5381,
  codigo: 'jut zowie',
  nombre: 'dislike',
};

export const sampleWithFullData: ICantonTerritorio = {
  id: 16688,
  codigo: 'pose blah',
  nombre: 'woolens plasticize',
};

export const sampleWithNewData: NewCantonTerritorio = {
  codigo: 'while',
  nombre: 'incidentally',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
