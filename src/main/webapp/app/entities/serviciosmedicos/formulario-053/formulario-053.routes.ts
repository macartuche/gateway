import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { Formulario053Component } from './list/formulario-053.component';
import { Formulario053DetailComponent } from './detail/formulario-053-detail.component';
import { Formulario053UpdateComponent } from './update/formulario-053-update.component';
import Formulario053Resolve from './route/formulario-053-routing-resolve.service';

const formulario053Route: Routes = [
  {
    path: '',
    component: Formulario053Component,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Formulario053DetailComponent,
    resolve: {
      formulario053: Formulario053Resolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Formulario053UpdateComponent,
    resolve: {
      formulario053: Formulario053Resolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Formulario053UpdateComponent,
    resolve: {
      formulario053: Formulario053Resolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default formulario053Route;
