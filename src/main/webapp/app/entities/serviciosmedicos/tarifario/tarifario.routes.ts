import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TarifarioComponent } from './list/tarifario.component';
import { TarifarioDetailComponent } from './detail/tarifario-detail.component';
import { TarifarioUpdateComponent } from './update/tarifario-update.component';
import TarifarioResolve from './route/tarifario-routing-resolve.service';

const tarifarioRoute: Routes = [
  {
    path: '',
    component: TarifarioComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TarifarioDetailComponent,
    resolve: {
      tarifario: TarifarioResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TarifarioUpdateComponent,
    resolve: {
      tarifario: TarifarioResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TarifarioUpdateComponent,
    resolve: {
      tarifario: TarifarioResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tarifarioRoute;
