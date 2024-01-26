import dayjs from 'dayjs/esm';

import { ICronograma, NewCronograma } from './cronograma.model';

export const sampleWithRequiredData: ICronograma = {
  id: 29759,
  fechaInicio: dayjs('2024-01-26'),
  fechaFin: dayjs('2024-01-25'),
  activo: true,
  especialidadId: 29020,
  doctorId: 12695,
  establecimientoId: 20017,
};

export const sampleWithPartialData: ICronograma = {
  id: 11751,
  fechaInicio: dayjs('2024-01-25'),
  fechaFin: dayjs('2024-01-26'),
  activo: true,
  especialidadId: 6809,
  doctorId: 27071,
  establecimientoId: 410,
};

export const sampleWithFullData: ICronograma = {
  id: 11424,
  fechaInicio: dayjs('2024-01-26'),
  fechaFin: dayjs('2024-01-26'),
  activo: false,
  especialidadId: 29998,
  doctorId: 5356,
  establecimientoId: 16268,
};

export const sampleWithNewData: NewCronograma = {
  fechaInicio: dayjs('2024-01-26'),
  fechaFin: dayjs('2024-01-25'),
  activo: true,
  especialidadId: 873,
  doctorId: 30668,
  establecimientoId: 27261,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
