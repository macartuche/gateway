import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { HorarioEstablecimientoComponent } from './list/horario-establecimiento.component';
import { HorarioEstablecimientoDetailComponent } from './detail/horario-establecimiento-detail.component';
import { HorarioEstablecimientoUpdateComponent } from './update/horario-establecimiento-update.component';
import HorarioEstablecimientoResolve from './route/horario-establecimiento-routing-resolve.service';

const horarioEstablecimientoRoute: Routes = [
  {
    path: '',
    component: HorarioEstablecimientoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HorarioEstablecimientoDetailComponent,
    resolve: {
      horarioEstablecimiento: HorarioEstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HorarioEstablecimientoUpdateComponent,
    resolve: {
      horarioEstablecimiento: HorarioEstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HorarioEstablecimientoUpdateComponent,
    resolve: {
      horarioEstablecimiento: HorarioEstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default horarioEstablecimientoRoute;
