import { IFormulario053Referencia } from 'app/entities/serviciosmedicos/formulario-053-referencia/formulario-053-referencia.model';

export interface IMotivoReferencia {
  id: number;
  detalle?: string | null;
  tipoId?: number | null;
  referencia?: Pick<IFormulario053Referencia, 'id'> | null;
}

export type NewMotivoReferencia = Omit<IMotivoReferencia, 'id'> & { id: null };
