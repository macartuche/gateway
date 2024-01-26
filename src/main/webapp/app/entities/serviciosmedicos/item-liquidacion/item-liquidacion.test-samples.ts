import dayjs from 'dayjs/esm';

import { IItemLiquidacion, NewItemLiquidacion } from './item-liquidacion.model';

export const sampleWithRequiredData: IItemLiquidacion = {
  id: 9827,
  fecha: dayjs('2024-01-26'),
  habilitado: true,
};

export const sampleWithPartialData: IItemLiquidacion = {
  id: 19523,
  fecha: dayjs('2024-01-26'),
  habilitado: false,
};

export const sampleWithFullData: IItemLiquidacion = {
  id: 12443,
  fecha: dayjs('2024-01-26'),
  habilitado: true,
};

export const sampleWithNewData: NewItemLiquidacion = {
  fecha: dayjs('2024-01-26'),
  habilitado: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
