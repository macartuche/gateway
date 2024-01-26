import { IRolFuncionalidad, NewRolFuncionalidad } from './rol-funcionalidad.model';

export const sampleWithRequiredData: IRolFuncionalidad = {
  id: 7465,
  rol: 'geez whack',
  prioridad: 27032,
};

export const sampleWithPartialData: IRolFuncionalidad = {
  id: 23393,
  rol: 'than um while',
  prioridad: 17996,
};

export const sampleWithFullData: IRolFuncionalidad = {
  id: 16763,
  rol: 'abaft',
  activo: false,
  prioridad: 10223,
};

export const sampleWithNewData: NewRolFuncionalidad = {
  rol: 'like informal till',
  prioridad: 11632,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
