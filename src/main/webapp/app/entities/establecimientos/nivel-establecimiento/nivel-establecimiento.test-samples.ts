import { INivelEstablecimiento, NewNivelEstablecimiento } from './nivel-establecimiento.model';

export const sampleWithRequiredData: INivelEstablecimiento = {
  id: 31330,
  nombre: 'vacantly furthermore',
};

export const sampleWithPartialData: INivelEstablecimiento = {
  id: 16022,
  nombre: 'over grit',
};

export const sampleWithFullData: INivelEstablecimiento = {
  id: 30778,
  codigo: 'enthusiastically warped',
  nombre: 'a winged',
  descripcion: 'maim havoc left',
};

export const sampleWithNewData: NewNivelEstablecimiento = {
  nombre: 'below',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
