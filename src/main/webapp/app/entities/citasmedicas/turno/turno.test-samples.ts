import dayjs from 'dayjs/esm';

import { ITurno, NewTurno } from './turno.model';

export const sampleWithRequiredData: ITurno = {
  id: 12797,
  orden: 11050,
  horaInicio: dayjs('2024-01-26T11:01'),
  horaFin: dayjs('2024-01-26T04:47'),
  extra: true,
};

export const sampleWithPartialData: ITurno = {
  id: 23843,
  orden: 23140,
  horaInicio: dayjs('2024-01-26T04:27'),
  horaFin: dayjs('2024-01-25T19:53'),
  extra: true,
};

export const sampleWithFullData: ITurno = {
  id: 14733,
  orden: 5081,
  horaInicio: dayjs('2024-01-25T22:21'),
  horaFin: dayjs('2024-01-26T05:40'),
  activo: true,
  extra: true,
};

export const sampleWithNewData: NewTurno = {
  orden: 16248,
  horaInicio: dayjs('2024-01-25T17:08'),
  horaFin: dayjs('2024-01-26T02:05'),
  extra: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
