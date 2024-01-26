import dayjs from 'dayjs/esm';
import { ITurno } from 'app/entities/citasmedicas/turno/turno.model';

export interface IBloqueoTurno {
  id: number;
  fecha?: dayjs.Dayjs | null;
  explicacion?: string | null;
  activo?: boolean | null;
  turno?: Pick<ITurno, 'id'> | null;
}

export type NewBloqueoTurno = Omit<IBloqueoTurno, 'id'> & { id: null };
