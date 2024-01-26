import { ICantonTerritorio } from 'app/entities/canton-territorio/canton-territorio.model';

export interface IParroquiaTerritorio {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  canton?: Pick<ICantonTerritorio, 'id' | 'nombre'> | null;
}

export type NewParroquiaTerritorio = Omit<IParroquiaTerritorio, 'id'> & { id: null };
