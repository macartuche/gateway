import { ICircuito, NewCircuito } from './circuito.model';

export const sampleWithRequiredData: ICircuito = {
  id: 19085,
  codigo: 'yowza worker gummy',
  nombre: 'hence lively anchovy',
};

export const sampleWithPartialData: ICircuito = {
  id: 14418,
  codigo: 'executive hopelessly pace',
  nombre: 'chasten',
};

export const sampleWithFullData: ICircuito = {
  id: 29539,
  codigo: 'truly interestingly',
  nombre: 'instead',
};

export const sampleWithNewData: NewCircuito = {
  codigo: 'versus now major',
  nombre: 'briefly likely',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
