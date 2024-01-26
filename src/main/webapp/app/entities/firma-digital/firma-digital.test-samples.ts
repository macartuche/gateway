import dayjs from 'dayjs/esm';

import { IFirmaDigital, NewFirmaDigital } from './firma-digital.model';

export const sampleWithRequiredData: IFirmaDigital = {
  id: 31661,
  fechaDesde: dayjs('2024-01-26'),
  fechaHasta: dayjs('2024-01-26'),
};

export const sampleWithPartialData: IFirmaDigital = {
  id: 25981,
  fechaDesde: dayjs('2024-01-25'),
  fechaHasta: dayjs('2024-01-25'),
  path: 'naturally',
};

export const sampleWithFullData: IFirmaDigital = {
  id: 21082,
  fechaDesde: dayjs('2024-01-26'),
  fechaHasta: dayjs('2024-01-26'),
  path: 'wolf meanwhile almighty',
};

export const sampleWithNewData: NewFirmaDigital = {
  fechaDesde: dayjs('2024-01-26'),
  fechaHasta: dayjs('2024-01-26'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
