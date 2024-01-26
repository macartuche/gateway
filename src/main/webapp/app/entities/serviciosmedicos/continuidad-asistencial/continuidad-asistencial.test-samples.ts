import { IContinuidadAsistencial, NewContinuidadAsistencial } from './continuidad-asistencial.model';

export const sampleWithRequiredData: IContinuidadAsistencial = {
  id: 18821,
};

export const sampleWithPartialData: IContinuidadAsistencial = {
  id: 21204,
};

export const sampleWithFullData: IContinuidadAsistencial = {
  id: 31946,
  observacion: 'pause',
  servicioHospitalario: 'impolite',
};

export const sampleWithNewData: NewContinuidadAsistencial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
