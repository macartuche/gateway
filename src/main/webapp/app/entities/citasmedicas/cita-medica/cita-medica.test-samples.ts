import dayjs from 'dayjs/esm';

import { ICitaMedica, NewCitaMedica } from './cita-medica.model';

export const sampleWithRequiredData: ICitaMedica = {
  id: 11773,
  activa: false,
  estadoId: 6271,
  pacienteId: 15037,
};

export const sampleWithPartialData: ICitaMedica = {
  id: 27041,
  activa: false,
  estadoId: 28890,
  pacienteId: 2701,
  tramiteId: 6656,
};

export const sampleWithFullData: ICitaMedica = {
  id: 7017,
  fechaInicioAtencion: dayjs('2024-01-26'),
  fechaFinAtencion: dayjs('2024-01-26'),
  horaInicioAtencion: dayjs('2024-01-26T02:03'),
  horaFinAtencion: dayjs('2024-01-25T16:48'),
  activa: true,
  observacion: 'which though hydrocarb',
  estadoId: 22995,
  pacienteId: 29389,
  tramiteId: 23223,
};

export const sampleWithNewData: NewCitaMedica = {
  activa: false,
  estadoId: 24133,
  pacienteId: 20268,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
