import { IDocumento } from 'app/entities/serviciosmedicos/documento/documento.model';

export interface ITipoTramite {
  id: number;
  nombre?: string | null;
  codigo?: string | null;
  estadosId?: number | null;
  documentos?: Pick<IDocumento, 'id'>[] | null;
}

export type NewTipoTramite = Omit<ITipoTramite, 'id'> & { id: null };
