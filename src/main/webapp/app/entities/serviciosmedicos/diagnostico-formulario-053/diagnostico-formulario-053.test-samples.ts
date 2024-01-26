import { IDiagnosticoFormulario053, NewDiagnosticoFormulario053 } from './diagnostico-formulario-053.model';

export const sampleWithRequiredData: IDiagnosticoFormulario053 = {
  id: 15999,
  dep: false,
  pre: true,
};

export const sampleWithPartialData: IDiagnosticoFormulario053 = {
  id: 3966,
  dep: false,
  pre: false,
};

export const sampleWithFullData: IDiagnosticoFormulario053 = {
  id: 7730,
  dep: true,
  pre: false,
};

export const sampleWithNewData: NewDiagnosticoFormulario053 = {
  dep: false,
  pre: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
