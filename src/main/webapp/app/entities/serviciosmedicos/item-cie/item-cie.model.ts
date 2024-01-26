import { ICie } from 'app/entities/serviciosmedicos/cie/cie.model';

export interface IItemCie {
  id: number;
  nombre?: string | null;
  codigo?: string | null;
  activo?: boolean | null;
  hijos?: Pick<IItemCie, 'id'>[] | null;
  padre?: Pick<IItemCie, 'id'> | null;
  cie?: Pick<ICie, 'id'> | null;
}

export type NewItemCie = Omit<IItemCie, 'id'> & { id: null };
