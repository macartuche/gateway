import dayjs from 'dayjs/esm';

export interface IFormulario053 {
  id: number;
  fecha?: dayjs.Dayjs | null;
  numeroHistoriaClinica?: string | null;
  servicioEspecialidad?: string | null;
  tipoId?: number | null;
  pacienteId?: number | null;
  doctorId?: number | null;
  establecimientoOrigenId?: number | null;
  establecimientoDestinoId?: number | null;
  especialidadId?: number | null;
}

export type NewFormulario053 = Omit<IFormulario053, 'id'> & { id: null };
