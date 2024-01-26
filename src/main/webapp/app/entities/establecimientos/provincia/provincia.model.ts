import { IZona } from 'app/entities/establecimientos/zona/zona.model';

export interface IProvincia {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  zona?: Pick<IZona, 'id' | 'nombre'> | null;
}

export type NewProvincia = Omit<IProvincia, 'id'> & { id: null };
