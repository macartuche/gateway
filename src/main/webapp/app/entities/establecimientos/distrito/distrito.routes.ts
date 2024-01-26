import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DistritoComponent } from './list/distrito.component';
import { DistritoDetailComponent } from './detail/distrito-detail.component';
import { DistritoUpdateComponent } from './update/distrito-update.component';
import DistritoResolve from './route/distrito-routing-resolve.service';

const distritoRoute: Routes = [
  {
    path: '',
    component: DistritoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DistritoDetailComponent,
    resolve: {
      distrito: DistritoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DistritoUpdateComponent,
    resolve: {
      distrito: DistritoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DistritoUpdateComponent,
    resolve: {
      distrito: DistritoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default distritoRoute;
