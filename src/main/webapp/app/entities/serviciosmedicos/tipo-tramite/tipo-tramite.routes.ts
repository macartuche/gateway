import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TipoTramiteComponent } from './list/tipo-tramite.component';
import { TipoTramiteDetailComponent } from './detail/tipo-tramite-detail.component';
import { TipoTramiteUpdateComponent } from './update/tipo-tramite-update.component';
import TipoTramiteResolve from './route/tipo-tramite-routing-resolve.service';

const tipoTramiteRoute: Routes = [
  {
    path: '',
    component: TipoTramiteComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoTramiteDetailComponent,
    resolve: {
      tipoTramite: TipoTramiteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoTramiteUpdateComponent,
    resolve: {
      tipoTramite: TipoTramiteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoTramiteUpdateComponent,
    resolve: {
      tipoTramite: TipoTramiteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tipoTramiteRoute;
