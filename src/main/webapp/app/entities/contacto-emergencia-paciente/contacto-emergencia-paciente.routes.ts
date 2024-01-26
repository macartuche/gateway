import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ContactoEmergenciaPacienteComponent } from './list/contacto-emergencia-paciente.component';
import { ContactoEmergenciaPacienteDetailComponent } from './detail/contacto-emergencia-paciente-detail.component';
import { ContactoEmergenciaPacienteUpdateComponent } from './update/contacto-emergencia-paciente-update.component';
import ContactoEmergenciaPacienteResolve from './route/contacto-emergencia-paciente-routing-resolve.service';

const contactoEmergenciaPacienteRoute: Routes = [
  {
    path: '',
    component: ContactoEmergenciaPacienteComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContactoEmergenciaPacienteDetailComponent,
    resolve: {
      contactoEmergenciaPaciente: ContactoEmergenciaPacienteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContactoEmergenciaPacienteUpdateComponent,
    resolve: {
      contactoEmergenciaPaciente: ContactoEmergenciaPacienteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContactoEmergenciaPacienteUpdateComponent,
    resolve: {
      contactoEmergenciaPaciente: ContactoEmergenciaPacienteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default contactoEmergenciaPacienteRoute;
