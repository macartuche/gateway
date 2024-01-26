import dayjs from 'dayjs/esm';

export interface IHorarioEstablecimiento {
  id: number;
  nombre?: string | null;
  numeroHoras?: number | null;
  descripcion?: string | null;
  horaInicio?: dayjs.Dayjs | null;
  horaFin?: dayjs.Dayjs | null;
}

export type NewHorarioEstablecimiento = Omit<IHorarioEstablecimiento, 'id'> & { id: null };
