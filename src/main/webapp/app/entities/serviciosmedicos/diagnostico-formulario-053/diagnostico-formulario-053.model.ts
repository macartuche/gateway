import { IFormulario053Referencia } from 'app/entities/serviciosmedicos/formulario-053-referencia/formulario-053-referencia.model';
import { IFormulario053Contrareferencia } from 'app/entities/serviciosmedicos/formulario-053-contrareferencia/formulario-053-contrareferencia.model';
import { IItemCie } from 'app/entities/serviciosmedicos/item-cie/item-cie.model';

export interface IDiagnosticoFormulario053 {
  id: number;
  dep?: boolean | null;
  pre?: boolean | null;
  referencia?: Pick<IFormulario053Referencia, 'id'> | null;
  contrareferencia?: Pick<IFormulario053Contrareferencia, 'id'> | null;
  itemCie?: Pick<IItemCie, 'id' | 'nombre'> | null;
}

export type NewDiagnosticoFormulario053 = Omit<IDiagnosticoFormulario053, 'id'> & { id: null };
