import { ITipoTramite } from 'app/entities/serviciosmedicos/tipo-tramite/tipo-tramite.model';

export interface IDocumento {
  id: number;
  nombre?: string | null;
  requerido?: boolean | null;
  codigo?: string | null;
  tipoTramite?: Pick<ITipoTramite, 'id'> | null;
}

export type NewDocumento = Omit<IDocumento, 'id'> & { id: null };
