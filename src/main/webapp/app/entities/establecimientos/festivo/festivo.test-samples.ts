import dayjs from 'dayjs/esm';

import { IFestivo, NewFestivo } from './festivo.model';

export const sampleWithRequiredData: IFestivo = {
  id: 29081,
  nombre: 'exert',
  fechaInicio: dayjs('2024-01-26'),
  fechaFin: dayjs('2024-01-26'),
  activo: true,
};

export const sampleWithPartialData: IFestivo = {
  id: 7438,
  nombre: 'attempt rebellion',
  fechaInicio: dayjs('2024-01-26'),
  fechaFin: dayjs('2024-01-26'),
  activo: false,
};

export const sampleWithFullData: IFestivo = {
  id: 27138,
  nombre: 'polarize',
  fechaInicio: dayjs('2024-01-26'),
  fechaFin: dayjs('2024-01-26'),
  activo: false,
};

export const sampleWithNewData: NewFestivo = {
  nombre: 'inferior ick',
  fechaInicio: dayjs('2024-01-26'),
  fechaFin: dayjs('2024-01-26'),
  activo: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
