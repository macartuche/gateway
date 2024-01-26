import { IUsuarioEstablecimiento, NewUsuarioEstablecimiento } from './usuario-establecimiento.model';

export const sampleWithRequiredData: IUsuarioEstablecimiento = {
  id: 1117,
  activo: true,
  usuarioId: 29088,
  tipoId: 31448,
};

export const sampleWithPartialData: IUsuarioEstablecimiento = {
  id: 21418,
  activo: false,
  usuarioId: 12878,
  tipoId: 1927,
};

export const sampleWithFullData: IUsuarioEstablecimiento = {
  id: 5315,
  activo: true,
  usuarioId: 21582,
  tipoId: 31470,
};

export const sampleWithNewData: NewUsuarioEstablecimiento = {
  activo: false,
  usuarioId: 22615,
  tipoId: 9398,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
