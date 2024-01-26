import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { EspecialidadComponent } from './list/especialidad.component';
import { EspecialidadDetailComponent } from './detail/especialidad-detail.component';
import { EspecialidadUpdateComponent } from './update/especialidad-update.component';
import EspecialidadResolve from './route/especialidad-routing-resolve.service';

const especialidadRoute: Routes = [
  {
    path: '',
    component: EspecialidadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EspecialidadDetailComponent,
    resolve: {
      especialidad: EspecialidadResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EspecialidadUpdateComponent,
    resolve: {
      especialidad: EspecialidadResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EspecialidadUpdateComponent,
    resolve: {
      especialidad: EspecialidadResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default especialidadRoute;
