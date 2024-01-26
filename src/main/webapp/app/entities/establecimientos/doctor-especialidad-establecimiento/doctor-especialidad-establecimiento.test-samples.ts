import { IDoctorEspecialidadEstablecimiento, NewDoctorEspecialidadEstablecimiento } from './doctor-especialidad-establecimiento.model';

export const sampleWithRequiredData: IDoctorEspecialidadEstablecimiento = {
  id: 5180,
  doctorId: 3752,
  especialidadId: 20946,
};

export const sampleWithPartialData: IDoctorEspecialidadEstablecimiento = {
  id: 21617,
  doctorId: 9516,
  especialidadId: 9431,
};

export const sampleWithFullData: IDoctorEspecialidadEstablecimiento = {
  id: 11100,
  activo: false,
  doctorId: 28568,
  especialidadId: 19662,
};

export const sampleWithNewData: NewDoctorEspecialidadEstablecimiento = {
  doctorId: 21362,
  especialidadId: 26746,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
