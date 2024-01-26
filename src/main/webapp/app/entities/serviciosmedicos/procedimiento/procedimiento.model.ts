import dayjs from 'dayjs/esm';
import { ITramite } from 'app/entities/serviciosmedicos/tramite/tramite.model';

export interface IProcedimiento {
  id: number;
  fecha?: dayjs.Dayjs | null;
  observacion?: string | null;
  estadoId?: number | null;
  usuarioId?: number | null;
  tramite?: Pick<ITramite, 'id' | 'codigoValidacion'> | null;
}

export type NewProcedimiento = Omit<IProcedimiento, 'id'> & { id: null };
