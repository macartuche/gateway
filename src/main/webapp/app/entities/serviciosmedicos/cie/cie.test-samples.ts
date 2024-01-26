import { ICie, NewCie } from './cie.model';

export const sampleWithRequiredData: ICie = {
  id: 15630,
  nombre: 'woot',
  activo: false,
};

export const sampleWithPartialData: ICie = {
  id: 28228,
  nombre: 'yet gratefully second-hand',
  activo: true,
};

export const sampleWithFullData: ICie = {
  id: 15596,
  nombre: 'separately',
  activo: true,
};

export const sampleWithNewData: NewCie = {
  nombre: 'readily',
  activo: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
