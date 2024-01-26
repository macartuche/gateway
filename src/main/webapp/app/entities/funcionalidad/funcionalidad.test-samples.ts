import { IFuncionalidad, NewFuncionalidad } from './funcionalidad.model';

export const sampleWithRequiredData: IFuncionalidad = {
  id: 18881,
  nombre: 'beyond',
  activo: true,
};

export const sampleWithPartialData: IFuncionalidad = {
  id: 12693,
  nombre: 'rightfully',
  descripcion: 'ah tear',
  url: 'https://neat-cluster.biz/',
  activo: true,
  icono: 'apropos',
  visible: true,
};

export const sampleWithFullData: IFuncionalidad = {
  id: 19314,
  nombre: 'before hourly',
  descripcion: 'upside-down colorful',
  url: 'https://pleasant-self.com',
  activo: true,
  icono: 'morphology',
  visible: false,
};

export const sampleWithNewData: NewFuncionalidad = {
  nombre: 'ugh jumbo',
  activo: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
