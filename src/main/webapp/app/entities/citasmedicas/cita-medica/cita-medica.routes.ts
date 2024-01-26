import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CitaMedicaComponent } from './list/cita-medica.component';
import { CitaMedicaDetailComponent } from './detail/cita-medica-detail.component';
import { CitaMedicaUpdateComponent } from './update/cita-medica-update.component';
import CitaMedicaResolve from './route/cita-medica-routing-resolve.service';

const citaMedicaRoute: Routes = [
  {
    path: '',
    component: CitaMedicaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CitaMedicaDetailComponent,
    resolve: {
      citaMedica: CitaMedicaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CitaMedicaUpdateComponent,
    resolve: {
      citaMedica: CitaMedicaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CitaMedicaUpdateComponent,
    resolve: {
      citaMedica: CitaMedicaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default citaMedicaRoute;
