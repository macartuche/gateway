import { IProvinciaTerritorio } from 'app/entities/provincia-territorio/provincia-territorio.model';

export interface ICantonTerritorio {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  provincia?: Pick<IProvinciaTerritorio, 'id' | 'nombre'> | null;
}

export type NewCantonTerritorio = Omit<ICantonTerritorio, 'id'> & { id: null };
