import { IProvinciaTerritorio, NewProvinciaTerritorio } from './provincia-territorio.model';

export const sampleWithRequiredData: IProvinciaTerritorio = {
  id: 26342,
  codigo: 'joyful uh-huh around',
  nombre: 'save splosh unselfish',
  pais: 'disloyal',
};

export const sampleWithPartialData: IProvinciaTerritorio = {
  id: 29860,
  codigo: 'proof-reader',
  nombre: 'yowza pencil',
  pais: 'before snoopy',
};

export const sampleWithFullData: IProvinciaTerritorio = {
  id: 8982,
  codigo: 'zowie frightfully slipper',
  nombre: 'growling venti',
  pais: 'viciously instead inside',
};

export const sampleWithNewData: NewProvinciaTerritorio = {
  codigo: 'rest sigh before',
  nombre: 'precis why deluge',
  pais: 'merrily',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
