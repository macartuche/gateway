import dayjs from 'dayjs/esm';

import { IPaciente, NewPaciente } from './paciente.model';

export const sampleWithRequiredData: IPaciente = {
  id: 31714,
  lugarNacimiento: 'marshmallow ugh in',
  fechaNacimiento: dayjs('2024-01-25'),
  barrio: 'after ah minus',
};

export const sampleWithPartialData: IPaciente = {
  id: 21206,
  lugarNacimiento: 'among opulent',
  fechaNacimiento: dayjs('2024-01-25'),
  callePrincipal: 'spawn ah',
  numeroCasa: 'phew boo manacle',
  barrio: 'font labourer unless',
};

export const sampleWithFullData: IPaciente = {
  id: 13599,
  lugarNacimiento: 'regarding',
  fechaNacimiento: dayjs('2024-01-26'),
  callePrincipal: 'whether',
  numeroCasa: 'put if though',
  calleSecundaria: 'soon yet within',
  barrio: 'outside connection own',
  referenciaDomicilio: 'fooey unwelcome drizzle',
  seguroSaludSecundario: 'yuck painfully',
  identificacionRepresentante: 'corny',
};

export const sampleWithNewData: NewPaciente = {
  lugarNacimiento: 'wrongly responsible retail',
  fechaNacimiento: dayjs('2024-01-26'),
  barrio: 'crossly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
