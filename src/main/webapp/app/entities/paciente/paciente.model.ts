import dayjs from 'dayjs/esm';
import { IDiscapacidad } from 'app/entities/discapacidad/discapacidad.model';
import { IPersona } from 'app/entities/persona/persona.model';
import { IParroquiaTerritorio } from 'app/entities/parroquia-territorio/parroquia-territorio.model';
import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';

export interface IPaciente {
  id: number;
  lugarNacimiento?: string | null;
  fechaNacimiento?: dayjs.Dayjs | null;
  callePrincipal?: string | null;
  numeroCasa?: string | null;
  calleSecundaria?: string | null;
  barrio?: string | null;
  referenciaDomicilio?: string | null;
  seguroSaludSecundario?: string | null;
  identificacionRepresentante?: string | null;
  discapacidad?: Pick<IDiscapacidad, 'id'> | null;
  persona?: Pick<IPersona, 'id' | 'primerNombre'> | null;
  parroquiaNacimiento?: Pick<IParroquiaTerritorio, 'id' | 'nombre'> | null;
  parroquiaResidencia?: Pick<IParroquiaTerritorio, 'id' | 'nombre'> | null;
  autoidentificacionEtnica?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
  nacionalidadEtnica?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
  pueblo?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
  tipoEmpresaTrabajo?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
  profesionOcupacion?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
  seguroSaludPrincipal?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
  tipoBono?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
  procedenciaRepresentante?: Pick<ICatalogoItem, 'id' | 'nombre'> | null;
}

export type NewPaciente = Omit<IPaciente, 'id'> & { id: null };
