import { IDocumento, NewDocumento } from './documento.model';

export const sampleWithRequiredData: IDocumento = {
  id: 4059,
  nombre: 'even quaver',
  requerido: false,
};

export const sampleWithPartialData: IDocumento = {
  id: 6286,
  nombre: 'where playful regarding',
  requerido: true,
  codigo: 'submerge once pushy',
};

export const sampleWithFullData: IDocumento = {
  id: 21100,
  nombre: 'arrogance espalier vicinity',
  requerido: false,
  codigo: 'how',
};

export const sampleWithNewData: NewDocumento = {
  nombre: 'regard foolishly',
  requerido: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
