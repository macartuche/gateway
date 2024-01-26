import { ITramite, NewTramite } from './tramite.model';

export const sampleWithRequiredData: ITramite = {
  id: 16219,
  codigoValidacion: 'or beneath',
  estadoId: 17777,
  pacienteId: 5328,
  establecimientoOrigenId: 2637,
  establecimientoDestinoId: 19145,
};

export const sampleWithPartialData: ITramite = {
  id: 31117,
  codigoValidacion: 'enroll',
  numero: 'yowza supposing conquer',
  estadoId: 16855,
  pacienteId: 21828,
  establecimientoOrigenId: 30060,
  establecimientoDestinoId: 20294,
};

export const sampleWithFullData: ITramite = {
  id: 28733,
  codigoValidacion: 'ew gosh station',
  numero: 'eventually',
  estadoId: 19434,
  pacienteId: 1972,
  establecimientoOrigenId: 16700,
  establecimientoDestinoId: 31116,
};

export const sampleWithNewData: NewTramite = {
  codigoValidacion: 'caw entail near',
  estadoId: 28816,
  pacienteId: 30313,
  establecimientoOrigenId: 27030,
  establecimientoDestinoId: 9023,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
