import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ParroquiaTerritorioComponent } from './list/parroquia-territorio.component';
import { ParroquiaTerritorioDetailComponent } from './detail/parroquia-territorio-detail.component';
import { ParroquiaTerritorioUpdateComponent } from './update/parroquia-territorio-update.component';
import ParroquiaTerritorioResolve from './route/parroquia-territorio-routing-resolve.service';

const parroquiaTerritorioRoute: Routes = [
  {
    path: '',
    component: ParroquiaTerritorioComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ParroquiaTerritorioDetailComponent,
    resolve: {
      parroquiaTerritorio: ParroquiaTerritorioResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ParroquiaTerritorioUpdateComponent,
    resolve: {
      parroquiaTerritorio: ParroquiaTerritorioResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ParroquiaTerritorioUpdateComponent,
    resolve: {
      parroquiaTerritorio: ParroquiaTerritorioResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default parroquiaTerritorioRoute;
