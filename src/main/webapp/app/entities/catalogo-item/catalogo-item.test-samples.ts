import { ICatalogoItem, NewCatalogoItem } from './catalogo-item.model';

export const sampleWithRequiredData: ICatalogoItem = {
  id: 13885,
  nombre: 'ha versus equally',
  codigo: 'mechanically duh who',
  catalogoCodigo: 'wiggly than',
};

export const sampleWithPartialData: ICatalogoItem = {
  id: 21523,
  nombre: 'cautiously heart-throb',
  codigo: 'plus',
  descripcion: 'likely tightly less',
  catalogoCodigo: 'truly',
  activo: false,
};

export const sampleWithFullData: ICatalogoItem = {
  id: 728,
  nombre: 'civilization salami woot',
  codigo: 'hem',
  descripcion: 'nocturnal corsage meh',
  catalogoCodigo: 'phew pulse',
  activo: false,
};

export const sampleWithNewData: NewCatalogoItem = {
  nombre: 'impede',
  codigo: 'calmly obvious',
  catalogoCodigo: 'socialism',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
