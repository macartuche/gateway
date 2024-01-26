import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { InstitucionComponent } from './list/institucion.component';
import { InstitucionDetailComponent } from './detail/institucion-detail.component';
import { InstitucionUpdateComponent } from './update/institucion-update.component';
import InstitucionResolve from './route/institucion-routing-resolve.service';

const institucionRoute: Routes = [
  {
    path: '',
    component: InstitucionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InstitucionDetailComponent,
    resolve: {
      institucion: InstitucionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InstitucionUpdateComponent,
    resolve: {
      institucion: InstitucionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InstitucionUpdateComponent,
    resolve: {
      institucion: InstitucionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default institucionRoute;
