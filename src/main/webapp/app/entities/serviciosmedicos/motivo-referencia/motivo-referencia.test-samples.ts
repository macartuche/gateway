import { IMotivoReferencia, NewMotivoReferencia } from './motivo-referencia.model';

export const sampleWithRequiredData: IMotivoReferencia = {
  id: 22490,
  tipoId: 7072,
};

export const sampleWithPartialData: IMotivoReferencia = {
  id: 7210,
  detalle: 'as',
  tipoId: 12633,
};

export const sampleWithFullData: IMotivoReferencia = {
  id: 24953,
  detalle: 'including defiantly',
  tipoId: 22295,
};

export const sampleWithNewData: NewMotivoReferencia = {
  tipoId: 3825,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
