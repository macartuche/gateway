import { IDoctor, NewDoctor } from './doctor.model';

export const sampleWithRequiredData: IDoctor = {
  id: 27405,
};

export const sampleWithPartialData: IDoctor = {
  id: 31478,
  codigo: 'overview sentencing unwitting',
};

export const sampleWithFullData: IDoctor = {
  id: 17302,
  codigo: 'perfumed',
  activo: false,
};

export const sampleWithNewData: NewDoctor = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
