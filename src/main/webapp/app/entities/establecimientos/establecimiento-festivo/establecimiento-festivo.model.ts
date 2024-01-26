import { IEstablecimiento } from 'app/entities/establecimientos/establecimiento/establecimiento.model';
import { IFestivo } from 'app/entities/establecimientos/festivo/festivo.model';

export interface IEstablecimientoFestivo {
  id: number;
  activo?: boolean | null;
  establecimiento?: Pick<IEstablecimiento, 'id'> | null;
  festivo?: Pick<IFestivo, 'id'> | null;
}

export type NewEstablecimientoFestivo = Omit<IEstablecimientoFestivo, 'id'> & { id: null };
