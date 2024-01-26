import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ParroquiaComponent } from './list/parroquia.component';
import { ParroquiaDetailComponent } from './detail/parroquia-detail.component';
import { ParroquiaUpdateComponent } from './update/parroquia-update.component';
import ParroquiaResolve from './route/parroquia-routing-resolve.service';

const parroquiaRoute: Routes = [
  {
    path: '',
    component: ParroquiaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ParroquiaDetailComponent,
    resolve: {
      parroquia: ParroquiaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ParroquiaUpdateComponent,
    resolve: {
      parroquia: ParroquiaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ParroquiaUpdateComponent,
    resolve: {
      parroquia: ParroquiaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default parroquiaRoute;
