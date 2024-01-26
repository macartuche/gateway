export interface IProvinciaTerritorio {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  pais?: string | null;
}

export type NewProvinciaTerritorio = Omit<IProvinciaTerritorio, 'id'> & { id: null };
