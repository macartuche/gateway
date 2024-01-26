import dayjs from 'dayjs/esm';
import { ICronograma } from 'app/entities/citasmedicas/cronograma/cronograma.model';

export interface IDetalleCronograma {
  id: number;
  fecha?: dayjs.Dayjs | null;
  cantidad?: number | null;
  activo?: boolean | null;
  fechaDesactivacion?: dayjs.Dayjs | null;
  tipoId?: number | null;
  cronograma?: Pick<ICronograma, 'id'> | null;
}

export type NewDetalleCronograma = Omit<IDetalleCronograma, 'id'> & { id: null };
