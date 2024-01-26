export interface IZona {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  estadoId?: number | null;
}

export type NewZona = Omit<IZona, 'id'> & { id: null };
