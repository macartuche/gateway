import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CantonTerritorioComponent } from './list/canton-territorio.component';
import { CantonTerritorioDetailComponent } from './detail/canton-territorio-detail.component';
import { CantonTerritorioUpdateComponent } from './update/canton-territorio-update.component';
import CantonTerritorioResolve from './route/canton-territorio-routing-resolve.service';

const cantonTerritorioRoute: Routes = [
  {
    path: '',
    component: CantonTerritorioComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CantonTerritorioDetailComponent,
    resolve: {
      cantonTerritorio: CantonTerritorioResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CantonTerritorioUpdateComponent,
    resolve: {
      cantonTerritorio: CantonTerritorioResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CantonTerritorioUpdateComponent,
    resolve: {
      cantonTerritorio: CantonTerritorioResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cantonTerritorioRoute;
