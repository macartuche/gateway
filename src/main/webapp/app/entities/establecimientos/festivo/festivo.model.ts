import dayjs from 'dayjs/esm';

export interface IFestivo {
  id: number;
  nombre?: string | null;
  fechaInicio?: dayjs.Dayjs | null;
  fechaFin?: dayjs.Dayjs | null;
  activo?: boolean | null;
}

export type NewFestivo = Omit<IFestivo, 'id'> & { id: null };
