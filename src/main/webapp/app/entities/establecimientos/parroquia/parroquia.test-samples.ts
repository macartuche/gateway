import { IParroquia, NewParroquia } from './parroquia.model';

export const sampleWithRequiredData: IParroquia = {
  id: 13186,
  codigo: 'out',
  nombre: 'gadzooks lively',
  tipoId: 5226,
};

export const sampleWithPartialData: IParroquia = {
  id: 30123,
  codigo: 'hedge focalise',
  nombre: 'absentmindedly reassuringly',
  tipoId: 25908,
};

export const sampleWithFullData: IParroquia = {
  id: 3046,
  codigo: 'terrify lest',
  nombre: 'lest',
  tipoId: 16828,
};

export const sampleWithNewData: NewParroquia = {
  codigo: 'despite gah of',
  nombre: 'though candidate',
  tipoId: 24184,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
