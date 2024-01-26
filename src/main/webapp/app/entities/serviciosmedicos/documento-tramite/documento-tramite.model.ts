import dayjs from 'dayjs/esm';
import { IDocumento } from 'app/entities/serviciosmedicos/documento/documento.model';
import { ITramite } from 'app/entities/serviciosmedicos/tramite/tramite.model';

export interface IDocumentoTramite {
  id: number;
  nombre?: string | null;
  fecha?: dayjs.Dayjs | null;
  url?: string | null;
  documento?: Pick<IDocumento, 'id' | 'nombre'> | null;
  tramite?: Pick<ITramite, 'id' | 'codigoValidacion'> | null;
}

export type NewDocumentoTramite = Omit<IDocumentoTramite, 'id'> & { id: null };
