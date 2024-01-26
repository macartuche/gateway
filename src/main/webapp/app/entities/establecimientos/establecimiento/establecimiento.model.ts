import { IParroquia } from 'app/entities/establecimientos/parroquia/parroquia.model';
import { IEntidad } from 'app/entities/establecimientos/entidad/entidad.model';
import { IInstitucion } from 'app/entities/establecimientos/institucion/institucion.model';
import { ITipoEstablecimiento } from 'app/entities/establecimientos/tipo-establecimiento/tipo-establecimiento.model';
import { IHorarioEstablecimiento } from 'app/entities/establecimientos/horario-establecimiento/horario-establecimiento.model';

export interface IEstablecimiento {
  id: number;
  unicodigo?: string | null;
  nombre?: string | null;
  barrio?: string | null;
  direccion?: string | null;
  referencia?: string | null;
  telefono?: string | null;
  ambitoId?: number | null;
  estadoId?: number | null;
  parroquia?: Pick<IParroquia, 'id' | 'nombre'> | null;
  entidad?: Pick<IEntidad, 'id' | 'nombre'> | null;
  institucion?: Pick<IInstitucion, 'id' | 'nombre'> | null;
  tipo?: Pick<ITipoEstablecimiento, 'id' | 'nombre'> | null;
  horario?: Pick<IHorarioEstablecimiento, 'id' | 'nombre'> | null;
}

export type NewEstablecimiento = Omit<IEstablecimiento, 'id'> & { id: null };
