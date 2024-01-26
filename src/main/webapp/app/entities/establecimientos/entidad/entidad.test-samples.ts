import { IEntidad, NewEntidad } from './entidad.model';

export const sampleWithRequiredData: IEntidad = {
  id: 13381,
  codigo: 'certainly meh justly',
  nombre: 'humanise along psst',
  ruc: 'unless meh arrogantly',
};

export const sampleWithPartialData: IEntidad = {
  id: 9983,
  codigo: 'brightly pish ha',
  nombre: 'drill',
  ruc: 'last intrude',
};

export const sampleWithFullData: IEntidad = {
  id: 2648,
  codigo: 'gadzooks',
  nombre: 'upon',
  ruc: 'hopeful unlucky',
};

export const sampleWithNewData: NewEntidad = {
  codigo: 'meanwhile vital dizzy',
  nombre: 'yippee',
  ruc: 'inborn appropriate phew',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
