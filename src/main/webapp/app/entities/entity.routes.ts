import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'catalogo',
    data: { pageTitle: 'gatewayApp.catalogo.home.title' },
    loadChildren: () => import('./catalogo/catalogo.routes'),
  },
  {
    path: 'catalogo-item',
    data: { pageTitle: 'gatewayApp.catalogoItem.home.title' },
    loadChildren: () => import('./catalogo-item/catalogo-item.routes'),
  },
  {
    path: 'parametro-sistema',
    data: { pageTitle: 'gatewayApp.parametroSistema.home.title' },
    loadChildren: () => import('./parametro-sistema/parametro-sistema.routes'),
  },
  {
    path: 'funcionalidad',
    data: { pageTitle: 'gatewayApp.funcionalidad.home.title' },
    loadChildren: () => import('./funcionalidad/funcionalidad.routes'),
  },
  {
    path: 'rol-funcionalidad',
    data: { pageTitle: 'gatewayApp.rolFuncionalidad.home.title' },
    loadChildren: () => import('./rol-funcionalidad/rol-funcionalidad.routes'),
  },
  {
    path: 'persona',
    data: { pageTitle: 'gatewayApp.persona.home.title' },
    loadChildren: () => import('./persona/persona.routes'),
  },
  {
    path: 'discapacidad',
    data: { pageTitle: 'gatewayApp.discapacidad.home.title' },
    loadChildren: () => import('./discapacidad/discapacidad.routes'),
  },
  {
    path: 'zona',
    data: { pageTitle: 'gatewayApp.establecimientosZona.home.title' },
    loadChildren: () => import('./establecimientos/zona/zona.routes'),
  },
  {
    path: 'provincia',
    data: { pageTitle: 'gatewayApp.establecimientosProvincia.home.title' },
    loadChildren: () => import('./establecimientos/provincia/provincia.routes'),
  },
  {
    path: 'distrito',
    data: { pageTitle: 'gatewayApp.establecimientosDistrito.home.title' },
    loadChildren: () => import('./establecimientos/distrito/distrito.routes'),
  },
  {
    path: 'canton',
    data: { pageTitle: 'gatewayApp.establecimientosCanton.home.title' },
    loadChildren: () => import('./establecimientos/canton/canton.routes'),
  },
  {
    path: 'circuito',
    data: { pageTitle: 'gatewayApp.establecimientosCircuito.home.title' },
    loadChildren: () => import('./establecimientos/circuito/circuito.routes'),
  },
  {
    path: 'parroquia',
    data: { pageTitle: 'gatewayApp.establecimientosParroquia.home.title' },
    loadChildren: () => import('./establecimientos/parroquia/parroquia.routes'),
  },
  {
    path: 'entidad',
    data: { pageTitle: 'gatewayApp.establecimientosEntidad.home.title' },
    loadChildren: () => import('./establecimientos/entidad/entidad.routes'),
  },
  {
    path: 'institucion',
    data: { pageTitle: 'gatewayApp.establecimientosInstitucion.home.title' },
    loadChildren: () => import('./establecimientos/institucion/institucion.routes'),
  },
  {
    path: 'establecimiento',
    data: { pageTitle: 'gatewayApp.establecimientosEstablecimiento.home.title' },
    loadChildren: () => import('./establecimientos/establecimiento/establecimiento.routes'),
  },
  {
    path: 'doctor',
    data: { pageTitle: 'gatewayApp.doctor.home.title' },
    loadChildren: () => import('./doctor/doctor.routes'),
  },
  {
    path: 'doctor-especialidad-establecimiento',
    data: { pageTitle: 'gatewayApp.establecimientosDoctorEspecialidadEstablecimiento.home.title' },
    loadChildren: () => import('./establecimientos/doctor-especialidad-establecimiento/doctor-especialidad-establecimiento.routes'),
  },
  {
    path: 'provincia-territorio',
    data: { pageTitle: 'gatewayApp.provinciaTerritorio.home.title' },
    loadChildren: () => import('./provincia-territorio/provincia-territorio.routes'),
  },
  {
    path: 'canton-territorio',
    data: { pageTitle: 'gatewayApp.cantonTerritorio.home.title' },
    loadChildren: () => import('./canton-territorio/canton-territorio.routes'),
  },
  {
    path: 'parroquia-territorio',
    data: { pageTitle: 'gatewayApp.parroquiaTerritorio.home.title' },
    loadChildren: () => import('./parroquia-territorio/parroquia-territorio.routes'),
  },
  {
    path: 'paciente',
    data: { pageTitle: 'gatewayApp.paciente.home.title' },
    loadChildren: () => import('./paciente/paciente.routes'),
  },
  {
    path: 'contacto-emergencia-paciente',
    data: { pageTitle: 'gatewayApp.contactoEmergenciaPaciente.home.title' },
    loadChildren: () => import('./contacto-emergencia-paciente/contacto-emergencia-paciente.routes'),
  },
  {
    path: 'especialidad',
    data: { pageTitle: 'gatewayApp.especialidad.home.title' },
    loadChildren: () => import('./especialidad/especialidad.routes'),
  },
  {
    path: 'festivo',
    data: { pageTitle: 'gatewayApp.establecimientosFestivo.home.title' },
    loadChildren: () => import('./establecimientos/festivo/festivo.routes'),
  },
  {
    path: 'cronograma',
    data: { pageTitle: 'gatewayApp.citasmedicasCronograma.home.title' },
    loadChildren: () => import('./citasmedicas/cronograma/cronograma.routes'),
  },
  {
    path: 'detalle-cronograma',
    data: { pageTitle: 'gatewayApp.citasmedicasDetalleCronograma.home.title' },
    loadChildren: () => import('./citasmedicas/detalle-cronograma/detalle-cronograma.routes'),
  },
  {
    path: 'cita-medica',
    data: { pageTitle: 'gatewayApp.citasmedicasCitaMedica.home.title' },
    loadChildren: () => import('./citasmedicas/cita-medica/cita-medica.routes'),
  },
  {
    path: 'turno',
    data: { pageTitle: 'gatewayApp.citasmedicasTurno.home.title' },
    loadChildren: () => import('./citasmedicas/turno/turno.routes'),
  },
  {
    path: 'bloqueo-turno',
    data: { pageTitle: 'gatewayApp.citasmedicasBloqueoTurno.home.title' },
    loadChildren: () => import('./citasmedicas/bloqueo-turno/bloqueo-turno.routes'),
  },
  {
    path: 'usuario-establecimiento',
    data: { pageTitle: 'gatewayApp.establecimientosUsuarioEstablecimiento.home.title' },
    loadChildren: () => import('./establecimientos/usuario-establecimiento/usuario-establecimiento.routes'),
  },
  {
    path: 'cie',
    data: { pageTitle: 'gatewayApp.serviciosmedicosCie.home.title' },
    loadChildren: () => import('./serviciosmedicos/cie/cie.routes'),
  },
  {
    path: 'item-cie',
    data: { pageTitle: 'gatewayApp.serviciosmedicosItemCie.home.title' },
    loadChildren: () => import('./serviciosmedicos/item-cie/item-cie.routes'),
  },
  {
    path: 'formulario-053',
    data: { pageTitle: 'gatewayApp.serviciosmedicosFormulario053.home.title' },
    loadChildren: () => import('./serviciosmedicos/formulario-053/formulario-053.routes'),
  },
  {
    path: 'formulario-053-referencia',
    data: { pageTitle: 'gatewayApp.serviciosmedicosFormulario053Referencia.home.title' },
    loadChildren: () => import('./serviciosmedicos/formulario-053-referencia/formulario-053-referencia.routes'),
  },
  {
    path: 'motivo-referencia',
    data: { pageTitle: 'gatewayApp.serviciosmedicosMotivoReferencia.home.title' },
    loadChildren: () => import('./serviciosmedicos/motivo-referencia/motivo-referencia.routes'),
  },
  {
    path: 'diagnostico-formulario-053',
    data: { pageTitle: 'gatewayApp.serviciosmedicosDiagnosticoFormulario053.home.title' },
    loadChildren: () => import('./serviciosmedicos/diagnostico-formulario-053/diagnostico-formulario-053.routes'),
  },
  {
    path: 'formulario-053-contrareferencia',
    data: { pageTitle: 'gatewayApp.serviciosmedicosFormulario053Contrareferencia.home.title' },
    loadChildren: () => import('./serviciosmedicos/formulario-053-contrareferencia/formulario-053-contrareferencia.routes'),
  },
  {
    path: 'tramite',
    data: { pageTitle: 'gatewayApp.serviciosmedicosTramite.home.title' },
    loadChildren: () => import('./serviciosmedicos/tramite/tramite.routes'),
  },
  {
    path: 'tipo-tramite',
    data: { pageTitle: 'gatewayApp.serviciosmedicosTipoTramite.home.title' },
    loadChildren: () => import('./serviciosmedicos/tipo-tramite/tipo-tramite.routes'),
  },
  {
    path: 'documento',
    data: { pageTitle: 'gatewayApp.serviciosmedicosDocumento.home.title' },
    loadChildren: () => import('./serviciosmedicos/documento/documento.routes'),
  },
  {
    path: 'documento-tramite',
    data: { pageTitle: 'gatewayApp.serviciosmedicosDocumentoTramite.home.title' },
    loadChildren: () => import('./serviciosmedicos/documento-tramite/documento-tramite.routes'),
  },
  {
    path: 'procedimiento',
    data: { pageTitle: 'gatewayApp.serviciosmedicosProcedimiento.home.title' },
    loadChildren: () => import('./serviciosmedicos/procedimiento/procedimiento.routes'),
  },
  {
    path: 'continuidad-asistencial',
    data: { pageTitle: 'gatewayApp.serviciosmedicosContinuidadAsistencial.home.title' },
    loadChildren: () => import('./serviciosmedicos/continuidad-asistencial/continuidad-asistencial.routes'),
  },
  {
    path: 'item-liquidacion',
    data: { pageTitle: 'gatewayApp.serviciosmedicosItemLiquidacion.home.title' },
    loadChildren: () => import('./serviciosmedicos/item-liquidacion/item-liquidacion.routes'),
  },
  {
    path: 'terapia',
    data: { pageTitle: 'gatewayApp.serviciosmedicosTerapia.home.title' },
    loadChildren: () => import('./serviciosmedicos/terapia/terapia.routes'),
  },
  {
    path: 'tarifario',
    data: { pageTitle: 'gatewayApp.serviciosmedicosTarifario.home.title' },
    loadChildren: () => import('./serviciosmedicos/tarifario/tarifario.routes'),
  },
  {
    path: 'firma-digital',
    data: { pageTitle: 'gatewayApp.firmaDigital.home.title' },
    loadChildren: () => import('./firma-digital/firma-digital.routes'),
  },
  {
    path: 'establecimiento-festivo',
    data: { pageTitle: 'gatewayApp.establecimientosEstablecimientoFestivo.home.title' },
    loadChildren: () => import('./establecimientos/establecimiento-festivo/establecimiento-festivo.routes'),
  },
  {
    path: 'nivel-establecimiento',
    data: { pageTitle: 'gatewayApp.establecimientosNivelEstablecimiento.home.title' },
    loadChildren: () => import('./establecimientos/nivel-establecimiento/nivel-establecimiento.routes'),
  },
  {
    path: 'tipo-establecimiento',
    data: { pageTitle: 'gatewayApp.establecimientosTipoEstablecimiento.home.title' },
    loadChildren: () => import('./establecimientos/tipo-establecimiento/tipo-establecimiento.routes'),
  },
  {
    path: 'horario-establecimiento',
    data: { pageTitle: 'gatewayApp.establecimientosHorarioEstablecimiento.home.title' },
    loadChildren: () => import('./establecimientos/horario-establecimiento/horario-establecimiento.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
