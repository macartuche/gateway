import { IFormulario053 } from 'app/entities/serviciosmedicos/formulario-053/formulario-053.model';

export interface IFormulario053Referencia {
  id: number;
  cuadroClinico?: string | null;
  hallazgosRelevantes?: string | null;
  formulario?: Pick<IFormulario053, 'id'> | null;
}

export type NewFormulario053Referencia = Omit<IFormulario053Referencia, 'id'> & { id: null };
