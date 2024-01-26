import { IParametroSistema, NewParametroSistema } from './parametro-sistema.model';

export const sampleWithRequiredData: IParametroSistema = {
  id: 29936,
  nombre: 'aw competent absolute',
  codigo: 'quickly yet croup',
  clase: 'cruelly excluding portrait',
  valor: 'undercharge rib circa',
};

export const sampleWithPartialData: IParametroSistema = {
  id: 9950,
  nombre: 'athwart behind apropos',
  codigo: 'aw idealistic vivaciously',
  clase: 'big',
  valor: 'courageously flute',
};

export const sampleWithFullData: IParametroSistema = {
  id: 16384,
  nombre: 'or internet',
  codigo: 'acidly',
  clase: 'mortgage',
  valor: 'whereas misty deeply',
};

export const sampleWithNewData: NewParametroSistema = {
  nombre: 'an yaw',
  codigo: 'below panel appetizer',
  clase: 'scarcely gratefully',
  valor: 'smelting unwelcome that',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
