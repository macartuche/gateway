import dayjs from 'dayjs/esm';

import { IDocumentoTramite, NewDocumentoTramite } from './documento-tramite.model';

export const sampleWithRequiredData: IDocumentoTramite = {
  id: 23722,
  nombre: 'at yippee characterise',
  fecha: dayjs('2024-01-26'),
  url: 'https://emotional-tinderbox.com/',
};

export const sampleWithPartialData: IDocumentoTramite = {
  id: 20728,
  nombre: 'rile',
  fecha: dayjs('2024-01-25'),
  url: 'https://grubby-belfry.org/',
};

export const sampleWithFullData: IDocumentoTramite = {
  id: 7705,
  nombre: 'than pfft what',
  fecha: dayjs('2024-01-26'),
  url: 'https://worst-synthesis.biz',
};

export const sampleWithNewData: NewDocumentoTramite = {
  nombre: 'until',
  fecha: dayjs('2024-01-26'),
  url: 'https://tinted-absence.info',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
