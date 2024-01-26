import dayjs from 'dayjs/esm';

import { IHorarioEstablecimiento, NewHorarioEstablecimiento } from './horario-establecimiento.model';

export const sampleWithRequiredData: IHorarioEstablecimiento = {
  id: 2770,
  nombre: 'tart',
  numeroHoras: 29064,
};

export const sampleWithPartialData: IHorarioEstablecimiento = {
  id: 30845,
  nombre: 'shakily around ha',
  numeroHoras: 31691,
};

export const sampleWithFullData: IHorarioEstablecimiento = {
  id: 8110,
  nombre: 'force',
  numeroHoras: 11538,
  descripcion: 'territory',
  horaInicio: dayjs('2024-01-26T03:12'),
  horaFin: dayjs('2024-01-26T05:18'),
};

export const sampleWithNewData: NewHorarioEstablecimiento = {
  nombre: 'where',
  numeroHoras: 15063,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
