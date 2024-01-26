export interface IEntidad {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  ruc?: string | null;
}

export type NewEntidad = Omit<IEntidad, 'id'> & { id: null };
