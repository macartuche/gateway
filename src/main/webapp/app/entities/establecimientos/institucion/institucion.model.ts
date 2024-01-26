export interface IInstitucion {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  permiteDerivacion?: boolean | null;
  permiteReferencia?: boolean | null;
  permiteContrareferencia?: boolean | null;
  estadoId?: number | null;
}

export type NewInstitucion = Omit<IInstitucion, 'id'> & { id: null };
