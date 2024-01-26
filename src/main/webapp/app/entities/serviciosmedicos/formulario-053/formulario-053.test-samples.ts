import dayjs from 'dayjs/esm';

import { IFormulario053, NewFormulario053 } from './formulario-053.model';

export const sampleWithRequiredData: IFormulario053 = {
  id: 20072,
  fecha: dayjs('2024-01-26'),
  numeroHistoriaClinica: 'detour',
  servicioEspecialidad: 'sunlight',
  tipoId: 1565,
  pacienteId: 26827,
  doctorId: 3759,
  establecimientoOrigenId: 26877,
  establecimientoDestinoId: 5944,
  especialidadId: 28225,
};

export const sampleWithPartialData: IFormulario053 = {
  id: 16528,
  fecha: dayjs('2024-01-25'),
  numeroHistoriaClinica: 'brewer',
  servicioEspecialidad: 'remark unlike vice',
  tipoId: 4127,
  pacienteId: 18178,
  doctorId: 12306,
  establecimientoOrigenId: 16326,
  establecimientoDestinoId: 24432,
  especialidadId: 24147,
};

export const sampleWithFullData: IFormulario053 = {
  id: 9615,
  fecha: dayjs('2024-01-25'),
  numeroHistoriaClinica: 'wherever onto',
  servicioEspecialidad: 'proselytise including',
  tipoId: 18534,
  pacienteId: 28693,
  doctorId: 20046,
  establecimientoOrigenId: 10512,
  establecimientoDestinoId: 24776,
  especialidadId: 19672,
};

export const sampleWithNewData: NewFormulario053 = {
  fecha: dayjs('2024-01-26'),
  numeroHistoriaClinica: 'midst',
  servicioEspecialidad: 'joint chop',
  tipoId: 25011,
  pacienteId: 14693,
  doctorId: 8247,
  establecimientoOrigenId: 8441,
  establecimientoDestinoId: 30657,
  especialidadId: 23973,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
