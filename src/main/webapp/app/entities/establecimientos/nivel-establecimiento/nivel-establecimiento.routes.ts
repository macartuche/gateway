import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { NivelEstablecimientoComponent } from './list/nivel-establecimiento.component';
import { NivelEstablecimientoDetailComponent } from './detail/nivel-establecimiento-detail.component';
import { NivelEstablecimientoUpdateComponent } from './update/nivel-establecimiento-update.component';
import NivelEstablecimientoResolve from './route/nivel-establecimiento-routing-resolve.service';

const nivelEstablecimientoRoute: Routes = [
  {
    path: '',
    component: NivelEstablecimientoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NivelEstablecimientoDetailComponent,
    resolve: {
      nivelEstablecimiento: NivelEstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NivelEstablecimientoUpdateComponent,
    resolve: {
      nivelEstablecimiento: NivelEstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NivelEstablecimientoUpdateComponent,
    resolve: {
      nivelEstablecimiento: NivelEstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default nivelEstablecimientoRoute;
