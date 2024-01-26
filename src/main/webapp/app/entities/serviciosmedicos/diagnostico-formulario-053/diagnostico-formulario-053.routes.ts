import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DiagnosticoFormulario053Component } from './list/diagnostico-formulario-053.component';
import { DiagnosticoFormulario053DetailComponent } from './detail/diagnostico-formulario-053-detail.component';
import { DiagnosticoFormulario053UpdateComponent } from './update/diagnostico-formulario-053-update.component';
import DiagnosticoFormulario053Resolve from './route/diagnostico-formulario-053-routing-resolve.service';

const diagnosticoFormulario053Route: Routes = [
  {
    path: '',
    component: DiagnosticoFormulario053Component,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiagnosticoFormulario053DetailComponent,
    resolve: {
      diagnosticoFormulario053: DiagnosticoFormulario053Resolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiagnosticoFormulario053UpdateComponent,
    resolve: {
      diagnosticoFormulario053: DiagnosticoFormulario053Resolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiagnosticoFormulario053UpdateComponent,
    resolve: {
      diagnosticoFormulario053: DiagnosticoFormulario053Resolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default diagnosticoFormulario053Route;
