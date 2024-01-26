import { IPersona, NewPersona } from './persona.model';

export const sampleWithRequiredData: IPersona = {
  id: 5606,
  identificacion: 'yum urgently',
  primerApellido: 'stretcher ugh blissfully',
  primerNombre: 'pertinent astride',
};

export const sampleWithPartialData: IPersona = {
  id: 15470,
  identificacion: 'theology beneath',
  primerApellido: 'demotivate crazy',
  segundoApellido: 'inwardly',
  primerNombre: 'which',
  celular: 'gargle',
};

export const sampleWithFullData: IPersona = {
  id: 3434,
  identificacion: 'yum emphasize from',
  primerApellido: 'absent distant',
  segundoApellido: 'delayed',
  primerNombre: 'woot gadzooks',
  segundoNombre: 'tote',
  celular: 'behove',
  telefonoConvencional: 'awkward',
  correo: 'cleverly phooey who',
};

export const sampleWithNewData: NewPersona = {
  identificacion: 'well-groomed geez carriage',
  primerApellido: 'fooey meh ocelot',
  primerNombre: 'rich',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
