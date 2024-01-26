import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';
import { IUser } from 'app/entities/user/user.model';

export interface IPersona {
  id: number;
  identificacion?: string | null;
  primerApellido?: string | null;
  segundoApellido?: string | null;
  primerNombre?: string | null;
  segundoNombre?: string | null;
  celular?: string | null;
  telefonoConvencional?: string | null;
  correo?: string | null;
  tipoIdentificacion?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
  nacionalidad?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
  usuario?: Pick<IUser, 'id' | 'login'> | null;
  genero?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
  estadoCivil?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
  nivelEducacion?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
  estadoNivelEducacion?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
}

export type NewPersona = Omit<IPersona, 'id'> & { id: null };
