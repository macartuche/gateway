import { IDistrito } from 'app/entities/establecimientos/distrito/distrito.model';

export interface ICanton {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  distrito?: Pick<IDistrito, 'id' | 'nombre'> | null;
}

export type NewCanton = Omit<ICanton, 'id'> & { id: null };
