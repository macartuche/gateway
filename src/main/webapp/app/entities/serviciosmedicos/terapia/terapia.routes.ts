import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TerapiaComponent } from './list/terapia.component';
import { TerapiaDetailComponent } from './detail/terapia-detail.component';
import { TerapiaUpdateComponent } from './update/terapia-update.component';
import TerapiaResolve from './route/terapia-routing-resolve.service';

const terapiaRoute: Routes = [
  {
    path: '',
    component: TerapiaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TerapiaDetailComponent,
    resolve: {
      terapia: TerapiaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TerapiaUpdateComponent,
    resolve: {
      terapia: TerapiaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TerapiaUpdateComponent,
    resolve: {
      terapia: TerapiaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default terapiaRoute;
