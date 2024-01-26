import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CieComponent } from './list/cie.component';
import { CieDetailComponent } from './detail/cie-detail.component';
import { CieUpdateComponent } from './update/cie-update.component';
import CieResolve from './route/cie-routing-resolve.service';

const cieRoute: Routes = [
  {
    path: '',
    component: CieComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CieDetailComponent,
    resolve: {
      cie: CieResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CieUpdateComponent,
    resolve: {
      cie: CieResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CieUpdateComponent,
    resolve: {
      cie: CieResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cieRoute;
