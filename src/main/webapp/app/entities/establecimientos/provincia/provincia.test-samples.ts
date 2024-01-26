import { IProvincia, NewProvincia } from './provincia.model';

export const sampleWithRequiredData: IProvincia = {
  id: 6022,
  codigo: 'chopsticks portrait',
  nombre: 'spiral notwithstanding phew',
};

export const sampleWithPartialData: IProvincia = {
  id: 3832,
  codigo: 'wake',
  nombre: 'when',
};

export const sampleWithFullData: IProvincia = {
  id: 14940,
  codigo: 'through unabashedly',
  nombre: 'analogy the shoulder',
};

export const sampleWithNewData: NewProvincia = {
  codigo: 'report painfully relaxation',
  nombre: 'who',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
