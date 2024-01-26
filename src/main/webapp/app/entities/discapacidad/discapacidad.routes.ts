import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DiscapacidadComponent } from './list/discapacidad.component';
import { DiscapacidadDetailComponent } from './detail/discapacidad-detail.component';
import { DiscapacidadUpdateComponent } from './update/discapacidad-update.component';
import DiscapacidadResolve from './route/discapacidad-routing-resolve.service';

const discapacidadRoute: Routes = [
  {
    path: '',
    component: DiscapacidadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiscapacidadDetailComponent,
    resolve: {
      discapacidad: DiscapacidadResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiscapacidadUpdateComponent,
    resolve: {
      discapacidad: DiscapacidadResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiscapacidadUpdateComponent,
    resolve: {
      discapacidad: DiscapacidadResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default discapacidadRoute;
