import { IFormulario053 } from 'app/entities/serviciosmedicos/formulario-053/formulario-053.model';

export interface IFormulario053Contrareferencia {
  id: number;
  hallazgosRelevantes?: string | null;
  resumen?: string | null;
  tratamientoProcedimientosRealizados?: string | null;
  tratamientoRecomendado?: string | null;
  referenciaJustificada?: boolean | null;
  formulario?: Pick<IFormulario053, 'id'> | null;
}

export type NewFormulario053Contrareferencia = Omit<IFormulario053Contrareferencia, 'id'> & { id: null };
