import { ITipoEstablecimiento, NewTipoEstablecimiento } from './tipo-establecimiento.model';

export const sampleWithRequiredData: ITipoEstablecimiento = {
  id: 3278,
  nombre: 'colonise',
};

export const sampleWithPartialData: ITipoEstablecimiento = {
  id: 11658,
  codigo: 'beside whoa',
  nombre: 'propagandize freak meanwhile',
  descripcion: 'oof',
};

export const sampleWithFullData: ITipoEstablecimiento = {
  id: 31520,
  codigo: 'cigarette militate',
  nombre: 'despise than',
  descripcion: 'although flexibility',
};

export const sampleWithNewData: NewTipoEstablecimiento = {
  nombre: 'sometimes amazon zowie',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
