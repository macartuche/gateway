import { IEspecialidad, NewEspecialidad } from './especialidad.model';

export const sampleWithRequiredData: IEspecialidad = {
  id: 9225,
  nombre: 'spicy',
  activa: false,
};

export const sampleWithPartialData: IEspecialidad = {
  id: 11034,
  nombre: 'regal whoa annul',
  activa: true,
};

export const sampleWithFullData: IEspecialidad = {
  id: 1638,
  nombre: 'whether into',
  activa: false,
};

export const sampleWithNewData: NewEspecialidad = {
  nombre: 'dishonest',
  activa: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
