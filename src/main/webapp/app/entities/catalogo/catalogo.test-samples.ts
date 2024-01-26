import { ICatalogo, NewCatalogo } from './catalogo.model';

export const sampleWithRequiredData: ICatalogo = {
  id: 28903,
  nombre: 'reconstruct legitimacy',
  codigo: 'joyously inasmuch',
};

export const sampleWithPartialData: ICatalogo = {
  id: 20477,
  nombre: 'blissful whoever',
  codigo: 'ouch',
  descripcion: 'whose creative',
};

export const sampleWithFullData: ICatalogo = {
  id: 9282,
  nombre: 'nervously message huzzah',
  codigo: 'radio spawn although',
  descripcion: 'lost',
};

export const sampleWithNewData: NewCatalogo = {
  nombre: 'gravity overwork',
  codigo: 'tweet ick',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
