import { INivelEstablecimiento } from 'app/entities/establecimientos/nivel-establecimiento/nivel-establecimiento.model';

export interface ITipoEstablecimiento {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  descripcion?: string | null;
  nivel?: Pick<INivelEstablecimiento, 'id' | 'nombre'> | null;
}

export type NewTipoEstablecimiento = Omit<ITipoEstablecimiento, 'id'> & { id: null };
