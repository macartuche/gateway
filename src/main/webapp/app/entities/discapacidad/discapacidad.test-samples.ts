import { IDiscapacidad, NewDiscapacidad } from './discapacidad.model';

export const sampleWithRequiredData: IDiscapacidad = {
  id: 9859,
  porcentaje: 25411.81,
};

export const sampleWithPartialData: IDiscapacidad = {
  id: 31472,
  porcentaje: 12881.29,
};

export const sampleWithFullData: IDiscapacidad = {
  id: 15129,
  porcentaje: 9309.55,
};

export const sampleWithNewData: NewDiscapacidad = {
  porcentaje: 20487.45,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
