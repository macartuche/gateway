import { IProvincia } from 'app/entities/establecimientos/provincia/provincia.model';

export interface IDistrito {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  provincia?: Pick<IProvincia, 'id' | 'nombre'> | null;
}

export type NewDistrito = Omit<IDistrito, 'id'> & { id: null };
