import { IParroquiaTerritorio, NewParroquiaTerritorio } from './parroquia-territorio.model';

export const sampleWithRequiredData: IParroquiaTerritorio = {
  id: 8599,
  codigo: 'freely till',
  nombre: 'cover',
};

export const sampleWithPartialData: IParroquiaTerritorio = {
  id: 20671,
  codigo: 'yahoo savour',
  nombre: 'citizen choice huzzah',
};

export const sampleWithFullData: IParroquiaTerritorio = {
  id: 26094,
  codigo: 'and debtor',
  nombre: 'so pish over',
};

export const sampleWithNewData: NewParroquiaTerritorio = {
  codigo: 'through intelligent',
  nombre: 'ha yum schlepp',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
