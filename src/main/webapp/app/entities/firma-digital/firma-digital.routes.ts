import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { FirmaDigitalComponent } from './list/firma-digital.component';
import { FirmaDigitalDetailComponent } from './detail/firma-digital-detail.component';
import { FirmaDigitalUpdateComponent } from './update/firma-digital-update.component';
import FirmaDigitalResolve from './route/firma-digital-routing-resolve.service';

const firmaDigitalRoute: Routes = [
  {
    path: '',
    component: FirmaDigitalComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FirmaDigitalDetailComponent,
    resolve: {
      firmaDigital: FirmaDigitalResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FirmaDigitalUpdateComponent,
    resolve: {
      firmaDigital: FirmaDigitalResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FirmaDigitalUpdateComponent,
    resolve: {
      firmaDigital: FirmaDigitalResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default firmaDigitalRoute;
