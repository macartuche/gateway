import { IContinuidadAsistencial } from 'app/entities/serviciosmedicos/continuidad-asistencial/continuidad-asistencial.model';
import { IItemLiquidacion } from 'app/entities/serviciosmedicos/item-liquidacion/item-liquidacion.model';
import { ITarifario } from 'app/entities/serviciosmedicos/tarifario/tarifario.model';

export interface ITerapia {
  id: number;
  cantidad?: number | null;
  descripcion?: string | null;
  habilitado?: boolean | null;
  valorUnitarioEstablecimiento?: number | null;
  continuidad?: Pick<IContinuidadAsistencial, 'id'> | null;
  itemLiquidacion?: Pick<IItemLiquidacion, 'id'> | null;
  tarifario?: Pick<ITarifario, 'id'> | null;
}

export type NewTerapia = Omit<ITerapia, 'id'> & { id: null };
