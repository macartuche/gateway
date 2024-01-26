export interface ITarifario {
  id: number;
  codigo?: string | null;
  descripcion?: string | null;
  valor?: number | null;
}

export type NewTarifario = Omit<ITarifario, 'id'> & { id: null };
