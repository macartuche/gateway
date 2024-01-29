import { ICanton } from 'app/entities/canton/canton.model';

export interface ICircuito {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  canton?: Pick<ICanton, 'id' | 'nombre'> | null;
}

export type NewCircuito = Omit<ICircuito, 'id'> & { id: null };
