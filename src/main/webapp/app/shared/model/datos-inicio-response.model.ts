export interface DatosInicioRespuesta {
  ok: boolean;
  mensaje: string;
  datos: DatosInicio[];
}

export interface DatosInicio {
  usuariosEstablecimiento: number;
  doctoresEstablecimiento: number;
  citasMedicas: number;
  citasExtras: number;
  referencias: number;
  contrareferencias: number;
  derivacion: number;
  subsecuente: number;
  refereciainversa: number;
}
