import { IItemCie } from 'app/entities/serviciosmedicos/item-cie/item-cie.model';

export interface ICie {
  id: number;
  nombre?: string | null;
  activo?: boolean | null;
  items?: Pick<IItemCie, 'id'>[] | null;
}

export type NewCie = Omit<ICie, 'id'> & { id: null };
