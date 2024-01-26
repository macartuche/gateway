import { IItemCie, NewItemCie } from './item-cie.model';

export const sampleWithRequiredData: IItemCie = {
  id: 17196,
  nombre: 'emancipate after',
  codigo: 'quixotic inasmuch',
  activo: true,
};

export const sampleWithPartialData: IItemCie = {
  id: 12804,
  nombre: 'publication',
  codigo: 'overtax',
  activo: false,
};

export const sampleWithFullData: IItemCie = {
  id: 8834,
  nombre: 'madly phooey admission',
  codigo: 'opposite solidify rim',
  activo: true,
};

export const sampleWithNewData: NewItemCie = {
  nombre: 'pish own',
  codigo: 'likely',
  activo: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
