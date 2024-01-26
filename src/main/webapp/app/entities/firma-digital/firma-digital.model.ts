import dayjs from 'dayjs/esm';
import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';
import { IPersona } from 'app/entities/persona/persona.model';

export interface IFirmaDigital {
  id: number;
  fechaDesde?: dayjs.Dayjs | null;
  fechaHasta?: dayjs.Dayjs | null;
  path?: string | null;
  tipo?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
  persona?: Pick<IPersona, 'id' | 'identificacion'> | null;
}

export type NewFirmaDigital = Omit<IFirmaDigital, 'id'> & { id: null };
