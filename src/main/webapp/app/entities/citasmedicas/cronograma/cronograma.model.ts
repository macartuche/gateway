import dayjs from 'dayjs/esm';

export interface ICronograma {
  id: number;
  fechaInicio?: dayjs.Dayjs | null;
  fechaFin?: dayjs.Dayjs | null;
  activo?: boolean | null;
  especialidadId?: number | null;
  doctorId?: number | null;
  establecimientoId?: number | null;
}

export type NewCronograma = Omit<ICronograma, 'id'> & { id: null };
