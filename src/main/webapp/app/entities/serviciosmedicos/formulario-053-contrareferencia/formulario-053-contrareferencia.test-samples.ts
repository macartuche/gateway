import { IFormulario053Contrareferencia, NewFormulario053Contrareferencia } from './formulario-053-contrareferencia.model';

export const sampleWithRequiredData: IFormulario053Contrareferencia = {
  id: 8967,
  referenciaJustificada: false,
};

export const sampleWithPartialData: IFormulario053Contrareferencia = {
  id: 9751,
  resumen: 'hence limply',
  tratamientoRecomendado: 'cruelly thoughtful',
  referenciaJustificada: true,
};

export const sampleWithFullData: IFormulario053Contrareferencia = {
  id: 3841,
  hallazgosRelevantes: 'consequently absent indeed',
  resumen: 'eek costly agglomerate',
  tratamientoProcedimientosRealizados: 'who except restfully',
  tratamientoRecomendado: 'broadly',
  referenciaJustificada: true,
};

export const sampleWithNewData: NewFormulario053Contrareferencia = {
  referenciaJustificada: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
