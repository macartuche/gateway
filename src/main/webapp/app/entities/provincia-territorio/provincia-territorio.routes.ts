import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ProvinciaTerritorioComponent } from './list/provincia-territorio.component';
import { ProvinciaTerritorioDetailComponent } from './detail/provincia-territorio-detail.component';
import { ProvinciaTerritorioUpdateComponent } from './update/provincia-territorio-update.component';
import ProvinciaTerritorioResolve from './route/provincia-territorio-routing-resolve.service';

const provinciaTerritorioRoute: Routes = [
  {
    path: '',
    component: ProvinciaTerritorioComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProvinciaTerritorioDetailComponent,
    resolve: {
      provinciaTerritorio: ProvinciaTerritorioResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProvinciaTerritorioUpdateComponent,
    resolve: {
      provinciaTerritorio: ProvinciaTerritorioResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProvinciaTerritorioUpdateComponent,
    resolve: {
      provinciaTerritorio: ProvinciaTerritorioResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default provinciaTerritorioRoute;
