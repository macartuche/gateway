import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { BloqueoTurnoComponent } from './list/bloqueo-turno.component';
import { BloqueoTurnoDetailComponent } from './detail/bloqueo-turno-detail.component';
import { BloqueoTurnoUpdateComponent } from './update/bloqueo-turno-update.component';
import BloqueoTurnoResolve from './route/bloqueo-turno-routing-resolve.service';

const bloqueoTurnoRoute: Routes = [
  {
    path: '',
    component: BloqueoTurnoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BloqueoTurnoDetailComponent,
    resolve: {
      bloqueoTurno: BloqueoTurnoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BloqueoTurnoUpdateComponent,
    resolve: {
      bloqueoTurno: BloqueoTurnoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BloqueoTurnoUpdateComponent,
    resolve: {
      bloqueoTurno: BloqueoTurnoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default bloqueoTurnoRoute;
