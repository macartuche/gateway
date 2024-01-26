import { ITipoTramite, NewTipoTramite } from './tipo-tramite.model';

export const sampleWithRequiredData: ITipoTramite = {
  id: 4757,
  nombre: 'scarcely productive juvenile',
  estadosId: 3822,
};

export const sampleWithPartialData: ITipoTramite = {
  id: 30142,
  nombre: 'kit adorable off',
  codigo: 'absentmindedly fairly notwithstanding',
  estadosId: 11710,
};

export const sampleWithFullData: ITipoTramite = {
  id: 29698,
  nombre: 'pilfer rural',
  codigo: 'now emerald',
  estadosId: 22340,
};

export const sampleWithNewData: NewTipoTramite = {
  nombre: 'likewise however huzzah',
  estadosId: 15305,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
