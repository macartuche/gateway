import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TurnoComponent } from './list/turno.component';
import { TurnoDetailComponent } from './detail/turno-detail.component';
import { TurnoUpdateComponent } from './update/turno-update.component';
import TurnoResolve from './route/turno-routing-resolve.service';

const turnoRoute: Routes = [
  {
    path: '',
    component: TurnoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TurnoDetailComponent,
    resolve: {
      turno: TurnoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TurnoUpdateComponent,
    resolve: {
      turno: TurnoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TurnoUpdateComponent,
    resolve: {
      turno: TurnoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default turnoRoute;
