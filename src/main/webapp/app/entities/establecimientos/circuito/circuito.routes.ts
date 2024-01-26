import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CircuitoComponent } from './list/circuito.component';
import { CircuitoDetailComponent } from './detail/circuito-detail.component';
import { CircuitoUpdateComponent } from './update/circuito-update.component';
import CircuitoResolve from './route/circuito-routing-resolve.service';

const circuitoRoute: Routes = [
  {
    path: '',
    component: CircuitoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CircuitoDetailComponent,
    resolve: {
      circuito: CircuitoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CircuitoUpdateComponent,
    resolve: {
      circuito: CircuitoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CircuitoUpdateComponent,
    resolve: {
      circuito: CircuitoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default circuitoRoute;
