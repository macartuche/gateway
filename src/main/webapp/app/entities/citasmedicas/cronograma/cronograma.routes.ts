import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CronogramaComponent } from './list/cronograma.component';
import { CronogramaDetailComponent } from './detail/cronograma-detail.component';
import { CronogramaUpdateComponent } from './update/cronograma-update.component';
import CronogramaResolve from './route/cronograma-routing-resolve.service';

const cronogramaRoute: Routes = [
  {
    path: '',
    component: CronogramaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CronogramaDetailComponent,
    resolve: {
      cronograma: CronogramaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CronogramaUpdateComponent,
    resolve: {
      cronograma: CronogramaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CronogramaUpdateComponent,
    resolve: {
      cronograma: CronogramaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cronogramaRoute;
