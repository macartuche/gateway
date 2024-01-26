import { ICircuito } from 'app/entities/establecimientos/circuito/circuito.model';

export interface IParroquia {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  tipoId?: number | null;
  circuito?: Pick<ICircuito, 'id' | 'nombre'> | null;
}

export type NewParroquia = Omit<IParroquia, 'id'> & { id: null };
