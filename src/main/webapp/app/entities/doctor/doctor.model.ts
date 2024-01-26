import { IPersona } from 'app/entities/persona/persona.model';

export interface IDoctor {
  id: number;
  codigo?: string | null;
  activo?: boolean | null;
  persona?: Pick<IPersona, 'id' | 'primerNombre'> | null;
}

export type NewDoctor = Omit<IDoctor, 'id'> & { id: null };
