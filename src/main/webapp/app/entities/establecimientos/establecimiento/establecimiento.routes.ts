import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { EstablecimientoComponent } from './list/establecimiento.component';
import { EstablecimientoDetailComponent } from './detail/establecimiento-detail.component';
import { EstablecimientoUpdateComponent } from './update/establecimiento-update.component';
import EstablecimientoResolve from './route/establecimiento-routing-resolve.service';

const establecimientoRoute: Routes = [
  {
    path: '',
    component: EstablecimientoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstablecimientoDetailComponent,
    resolve: {
      establecimiento: EstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstablecimientoUpdateComponent,
    resolve: {
      establecimiento: EstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstablecimientoUpdateComponent,
    resolve: {
      establecimiento: EstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default establecimientoRoute;
