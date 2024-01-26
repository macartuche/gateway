import { IInstitucion, NewInstitucion } from './institucion.model';

export const sampleWithRequiredData: IInstitucion = {
  id: 7261,
  codigo: 'reform',
  nombre: 'jot boohoo',
  permiteDerivacion: true,
  permiteReferencia: false,
  permiteContrareferencia: false,
  estadoId: 18027,
};

export const sampleWithPartialData: IInstitucion = {
  id: 16363,
  codigo: 'variable gratefully',
  nombre: 'or vice how',
  permiteDerivacion: true,
  permiteReferencia: false,
  permiteContrareferencia: false,
  estadoId: 22941,
};

export const sampleWithFullData: IInstitucion = {
  id: 12037,
  codigo: 'canoe',
  nombre: 'yuck tighten pigeon',
  permiteDerivacion: true,
  permiteReferencia: true,
  permiteContrareferencia: false,
  estadoId: 26737,
};

export const sampleWithNewData: NewInstitucion = {
  codigo: 'so swiftly caper',
  nombre: 'scarify',
  permiteDerivacion: false,
  permiteReferencia: true,
  permiteContrareferencia: false,
  estadoId: 12760,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
