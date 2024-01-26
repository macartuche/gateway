import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';

export interface IEspecialidad {
  id: number;
  nombre?: string | null;
  activa?: boolean | null;
  tipo?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
}

export type NewEspecialidad = Omit<IEspecialidad, 'id'> & { id: null };
