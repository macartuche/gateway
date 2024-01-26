import { IItemCie } from 'app/entities/serviciosmedicos/item-cie/item-cie.model';

export interface IContinuidadAsistencial {
  id: number;
  observacion?: string | null;
  servicioHospitalario?: string | null;
  itemCie?: Pick<IItemCie, 'id' | 'nombre'> | null;
}

export type NewContinuidadAsistencial = Omit<IContinuidadAsistencial, 'id'> & { id: null };
