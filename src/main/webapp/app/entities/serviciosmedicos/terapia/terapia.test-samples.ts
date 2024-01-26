import { ITerapia, NewTerapia } from './terapia.model';

export const sampleWithRequiredData: ITerapia = {
  id: 12028,
  cantidad: 27346,
  descripcion: 'a why rustle',
  habilitado: true,
  valorUnitarioEstablecimiento: 4577.87,
};

export const sampleWithPartialData: ITerapia = {
  id: 6654,
  cantidad: 20267,
  descripcion: 'waterski properly phew',
  habilitado: true,
  valorUnitarioEstablecimiento: 12455.28,
};

export const sampleWithFullData: ITerapia = {
  id: 27981,
  cantidad: 31081,
  descripcion: 'phew',
  habilitado: false,
  valorUnitarioEstablecimiento: 16014.04,
};

export const sampleWithNewData: NewTerapia = {
  cantidad: 2655,
  descripcion: 'incidentally but indeed',
  habilitado: false,
  valorUnitarioEstablecimiento: 30037.02,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
