import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TipoEstablecimientoComponent } from './list/tipo-establecimiento.component';
import { TipoEstablecimientoDetailComponent } from './detail/tipo-establecimiento-detail.component';
import { TipoEstablecimientoUpdateComponent } from './update/tipo-establecimiento-update.component';
import TipoEstablecimientoResolve from './route/tipo-establecimiento-routing-resolve.service';

const tipoEstablecimientoRoute: Routes = [
  {
    path: '',
    component: TipoEstablecimientoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoEstablecimientoDetailComponent,
    resolve: {
      tipoEstablecimiento: TipoEstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoEstablecimientoUpdateComponent,
    resolve: {
      tipoEstablecimiento: TipoEstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoEstablecimientoUpdateComponent,
    resolve: {
      tipoEstablecimiento: TipoEstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tipoEstablecimientoRoute;
