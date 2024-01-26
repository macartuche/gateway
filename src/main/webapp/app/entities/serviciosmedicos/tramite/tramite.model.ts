import { IFormulario053 } from 'app/entities/serviciosmedicos/formulario-053/formulario-053.model';
import { ITipoTramite } from 'app/entities/serviciosmedicos/tipo-tramite/tipo-tramite.model';

export interface ITramite {
  id: number;
  codigoValidacion?: string | null;
  numero?: string | null;
  estadoId?: number | null;
  pacienteId?: number | null;
  establecimientoOrigenId?: number | null;
  establecimientoDestinoId?: number | null;
  formulario?: Pick<IFormulario053, 'id'> | null;
  tipoTramite?: Pick<ITipoTramite, 'id' | 'nombre'> | null;
}

export type NewTramite = Omit<ITramite, 'id'> & { id: null };
