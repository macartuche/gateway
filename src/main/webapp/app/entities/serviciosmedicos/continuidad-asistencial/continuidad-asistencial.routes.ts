import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ContinuidadAsistencialComponent } from './list/continuidad-asistencial.component';
import { ContinuidadAsistencialDetailComponent } from './detail/continuidad-asistencial-detail.component';
import { ContinuidadAsistencialUpdateComponent } from './update/continuidad-asistencial-update.component';
import ContinuidadAsistencialResolve from './route/continuidad-asistencial-routing-resolve.service';

const continuidadAsistencialRoute: Routes = [
  {
    path: '',
    component: ContinuidadAsistencialComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContinuidadAsistencialDetailComponent,
    resolve: {
      continuidadAsistencial: ContinuidadAsistencialResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContinuidadAsistencialUpdateComponent,
    resolve: {
      continuidadAsistencial: ContinuidadAsistencialResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContinuidadAsistencialUpdateComponent,
    resolve: {
      continuidadAsistencial: ContinuidadAsistencialResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default continuidadAsistencialRoute;
