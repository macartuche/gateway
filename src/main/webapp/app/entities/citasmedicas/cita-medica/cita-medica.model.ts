import dayjs from 'dayjs/esm';
import { ITurno } from 'app/entities/citasmedicas/turno/turno.model';

export interface ICitaMedica {
  id: number;
  fechaInicioAtencion?: dayjs.Dayjs | null;
  fechaFinAtencion?: dayjs.Dayjs | null;
  horaInicioAtencion?: dayjs.Dayjs | null;
  horaFinAtencion?: dayjs.Dayjs | null;
  activa?: boolean | null;
  observacion?: string | null;
  estadoId?: number | null;
  pacienteId?: number | null;
  tramiteId?: number | null;
  turno?: Pick<ITurno, 'id'> | null;
}

export type NewCitaMedica = Omit<ICitaMedica, 'id'> & { id: null };
