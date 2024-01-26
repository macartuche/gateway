import { IEstablecimiento } from 'app/entities/establecimientos/establecimiento/establecimiento.model';

export interface IDoctorEspecialidadEstablecimiento {
  id: number;
  activo?: boolean | null;
  doctorId?: number | null;
  especialidadId?: number | null;
  establecimiento?: Pick<IEstablecimiento, 'id' | 'nombre'> | null;
}

export type NewDoctorEspecialidadEstablecimiento = Omit<IDoctorEspecialidadEstablecimiento, 'id'> & { id: null };
