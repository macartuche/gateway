import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ZonaComponent } from './list/zona.component';
import { ZonaDetailComponent } from './detail/zona-detail.component';
import { ZonaUpdateComponent } from './update/zona-update.component';
import ZonaResolve from './route/zona-routing-resolve.service';

const zonaRoute: Routes = [
  {
    path: '',
    component: ZonaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ZonaDetailComponent,
    resolve: {
      zona: ZonaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ZonaUpdateComponent,
    resolve: {
      zona: ZonaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ZonaUpdateComponent,
    resolve: {
      zona: ZonaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default zonaRoute;
