import dayjs from 'dayjs/esm';

import { IProcedimiento, NewProcedimiento } from './procedimiento.model';

export const sampleWithRequiredData: IProcedimiento = {
  id: 20801,
  fecha: dayjs('2024-01-26'),
  estadoId: 16117,
  usuarioId: 15049,
};

export const sampleWithPartialData: IProcedimiento = {
  id: 18088,
  fecha: dayjs('2024-01-26'),
  estadoId: 30536,
  usuarioId: 22325,
};

export const sampleWithFullData: IProcedimiento = {
  id: 21124,
  fecha: dayjs('2024-01-25'),
  observacion: 'grizzled anguished',
  estadoId: 31212,
  usuarioId: 29311,
};

export const sampleWithNewData: NewProcedimiento = {
  fecha: dayjs('2024-01-25'),
  estadoId: 31774,
  usuarioId: 31485,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
