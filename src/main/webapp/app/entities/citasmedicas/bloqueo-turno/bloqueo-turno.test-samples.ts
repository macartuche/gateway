import dayjs from 'dayjs/esm';

import { IBloqueoTurno, NewBloqueoTurno } from './bloqueo-turno.model';

export const sampleWithRequiredData: IBloqueoTurno = {
  id: 2915,
};

export const sampleWithPartialData: IBloqueoTurno = {
  id: 9756,
  fecha: dayjs('2024-01-26'),
  explicacion: 'task meaningfully',
};

export const sampleWithFullData: IBloqueoTurno = {
  id: 27765,
  fecha: dayjs('2024-01-25'),
  explicacion: 'arrogantly',
  activo: true,
};

export const sampleWithNewData: NewBloqueoTurno = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
