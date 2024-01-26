import { IContactoEmergenciaPaciente, NewContactoEmergenciaPaciente } from './contacto-emergencia-paciente.model';

export const sampleWithRequiredData: IContactoEmergenciaPaciente = {
  id: 1745,
  nombre: 'hmph',
};

export const sampleWithPartialData: IContactoEmergenciaPaciente = {
  id: 4472,
  nombre: 'center wombat',
};

export const sampleWithFullData: IContactoEmergenciaPaciente = {
  id: 19049,
  nombre: 'bravely without',
  telefono: 'mysteriously rescue',
  direccion: 'pro cheerfully',
};

export const sampleWithNewData: NewContactoEmergenciaPaciente = {
  nombre: 'action er',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
