import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DetalleCronogramaComponent } from './list/detalle-cronograma.component';
import { DetalleCronogramaDetailComponent } from './detail/detalle-cronograma-detail.component';
import { DetalleCronogramaUpdateComponent } from './update/detalle-cronograma-update.component';
import DetalleCronogramaResolve from './route/detalle-cronograma-routing-resolve.service';

const detalleCronogramaRoute: Routes = [
  {
    path: '',
    component: DetalleCronogramaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DetalleCronogramaDetailComponent,
    resolve: {
      detalleCronograma: DetalleCronogramaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DetalleCronogramaUpdateComponent,
    resolve: {
      detalleCronograma: DetalleCronogramaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DetalleCronogramaUpdateComponent,
    resolve: {
      detalleCronograma: DetalleCronogramaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default detalleCronogramaRoute;
