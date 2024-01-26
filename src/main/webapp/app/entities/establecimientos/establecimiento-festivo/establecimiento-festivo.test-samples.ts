import { IEstablecimientoFestivo, NewEstablecimientoFestivo } from './establecimiento-festivo.model';

export const sampleWithRequiredData: IEstablecimientoFestivo = {
  id: 24527,
  activo: true,
};

export const sampleWithPartialData: IEstablecimientoFestivo = {
  id: 31850,
  activo: false,
};

export const sampleWithFullData: IEstablecimientoFestivo = {
  id: 21286,
  activo: true,
};

export const sampleWithNewData: NewEstablecimientoFestivo = {
  activo: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
