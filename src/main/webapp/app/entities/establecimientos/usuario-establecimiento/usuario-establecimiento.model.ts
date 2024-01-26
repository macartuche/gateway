import { IEstablecimiento } from 'app/entities/establecimientos/establecimiento/establecimiento.model';

export interface IUsuarioEstablecimiento {
  id: number;
  activo?: boolean | null;
  usuarioId?: number | null;
  tipoId?: number | null;
  establecimiento?: Pick<IEstablecimiento, 'id' | 'nombre'> | null;
}

export type NewUsuarioEstablecimiento = Omit<IUsuarioEstablecimiento, 'id'> & { id: null };
