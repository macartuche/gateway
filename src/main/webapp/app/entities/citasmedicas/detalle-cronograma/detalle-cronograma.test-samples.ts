import dayjs from 'dayjs/esm';

import { IDetalleCronograma, NewDetalleCronograma } from './detalle-cronograma.model';

export const sampleWithRequiredData: IDetalleCronograma = {
  id: 10470,
  fecha: dayjs('2024-01-25'),
  tipoId: 14311,
};

export const sampleWithPartialData: IDetalleCronograma = {
  id: 25312,
  fecha: dayjs('2024-01-25'),
  cantidad: 714,
  tipoId: 2631,
};

export const sampleWithFullData: IDetalleCronograma = {
  id: 10686,
  fecha: dayjs('2024-01-26'),
  cantidad: 11295,
  activo: true,
  fechaDesactivacion: dayjs('2024-01-25'),
  tipoId: 3330,
};

export const sampleWithNewData: NewDetalleCronograma = {
  fecha: dayjs('2024-01-26'),
  tipoId: 4894,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
