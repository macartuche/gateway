import dayjs from 'dayjs/esm';
import { IContinuidadAsistencial } from 'app/entities/serviciosmedicos/continuidad-asistencial/continuidad-asistencial.model';

export interface IItemLiquidacion {
  id: number;
  fecha?: dayjs.Dayjs | null;
  habilitado?: boolean | null;
  continuidad?: Pick<IContinuidadAsistencial, 'id'> | null;
}

export type NewItemLiquidacion = Omit<IItemLiquidacion, 'id'> & { id: null };
