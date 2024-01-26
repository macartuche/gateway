import dayjs from 'dayjs/esm';
import { IDetalleCronograma } from 'app/entities/citasmedicas/detalle-cronograma/detalle-cronograma.model';

export interface ITurno {
  id: number;
  orden?: number | null;
  horaInicio?: dayjs.Dayjs | null;
  horaFin?: dayjs.Dayjs | null;
  activo?: boolean | null;
  extra?: boolean | null;
  detalleCronograma?: Pick<IDetalleCronograma, 'id'> | null;
}

export type NewTurno = Omit<ITurno, 'id'> & { id: null };
