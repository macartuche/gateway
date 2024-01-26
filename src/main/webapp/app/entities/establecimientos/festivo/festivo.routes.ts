import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { FestivoComponent } from './list/festivo.component';
import { FestivoDetailComponent } from './detail/festivo-detail.component';
import { FestivoUpdateComponent } from './update/festivo-update.component';
import FestivoResolve from './route/festivo-routing-resolve.service';

const festivoRoute: Routes = [
  {
    path: '',
    component: FestivoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FestivoDetailComponent,
    resolve: {
      festivo: FestivoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FestivoUpdateComponent,
    resolve: {
      festivo: FestivoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FestivoUpdateComponent,
    resolve: {
      festivo: FestivoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default festivoRoute;
