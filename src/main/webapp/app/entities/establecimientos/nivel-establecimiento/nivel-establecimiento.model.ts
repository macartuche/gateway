export interface INivelEstablecimiento {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  descripcion?: string | null;
}

export type NewNivelEstablecimiento = Omit<INivelEstablecimiento, 'id'> & { id: null };
