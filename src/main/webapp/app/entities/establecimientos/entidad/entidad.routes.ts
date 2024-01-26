import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { EntidadComponent } from './list/entidad.component';
import { EntidadDetailComponent } from './detail/entidad-detail.component';
import { EntidadUpdateComponent } from './update/entidad-update.component';
import EntidadResolve from './route/entidad-routing-resolve.service';

const entidadRoute: Routes = [
  {
    path: '',
    component: EntidadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntidadDetailComponent,
    resolve: {
      entidad: EntidadResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntidadUpdateComponent,
    resolve: {
      entidad: EntidadResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntidadUpdateComponent,
    resolve: {
      entidad: EntidadResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default entidadRoute;
