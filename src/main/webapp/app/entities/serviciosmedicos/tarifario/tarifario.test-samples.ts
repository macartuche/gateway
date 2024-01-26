import { ITarifario, NewTarifario } from './tarifario.model';

export const sampleWithRequiredData: ITarifario = {
  id: 754,
  codigo: 'diligently phooey monumental',
  valor: 5581.25,
};

export const sampleWithPartialData: ITarifario = {
  id: 13634,
  codigo: 'that',
  valor: 22619.72,
};

export const sampleWithFullData: ITarifario = {
  id: 5678,
  codigo: 'incident receive',
  descripcion: 'ugh uh-huh manufacturing',
  valor: 9257.81,
};

export const sampleWithNewData: NewTarifario = {
  codigo: 'huzzah',
  valor: 23364.96,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
