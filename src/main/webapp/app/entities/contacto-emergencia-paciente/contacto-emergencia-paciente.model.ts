import { IPaciente } from 'app/entities/paciente/paciente.model';
import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';

export interface IContactoEmergenciaPaciente {
  id: number;
  nombre?: string | null;
  telefono?: string | null;
  direccion?: string | null;
  paciente?: Pick<IPaciente, 'id'> | null;
  parentezco?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
}

export type NewContactoEmergenciaPaciente = Omit<IContactoEmergenciaPaciente, 'id'> & { id: null };
