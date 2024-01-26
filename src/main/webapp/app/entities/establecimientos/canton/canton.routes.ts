import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CantonComponent } from './list/canton.component';
import { CantonDetailComponent } from './detail/canton-detail.component';
import { CantonUpdateComponent } from './update/canton-update.component';
import CantonResolve from './route/canton-routing-resolve.service';

const cantonRoute: Routes = [
  {
    path: '',
    component: CantonComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CantonDetailComponent,
    resolve: {
      canton: CantonResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CantonUpdateComponent,
    resolve: {
      canton: CantonResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CantonUpdateComponent,
    resolve: {
      canton: CantonResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cantonRoute;
