import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';

export interface IDiscapacidad {
  id: number;
  porcentaje?: number | null;
  tipo?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
  estado?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
}

export type NewDiscapacidad = Omit<IDiscapacidad, 'id'> & { id: null };
