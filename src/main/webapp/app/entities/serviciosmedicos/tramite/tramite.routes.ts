import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TramiteComponent } from './list/tramite.component';
import { TramiteDetailComponent } from './detail/tramite-detail.component';
import { TramiteUpdateComponent } from './update/tramite-update.component';
import TramiteResolve from './route/tramite-routing-resolve.service';

const tramiteRoute: Routes = [
  {
    path: '',
    component: TramiteComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TramiteDetailComponent,
    resolve: {
      tramite: TramiteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TramiteUpdateComponent,
    resolve: {
      tramite: TramiteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TramiteUpdateComponent,
    resolve: {
      tramite: TramiteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tramiteRoute;
