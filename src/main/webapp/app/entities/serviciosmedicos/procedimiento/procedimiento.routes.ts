import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ProcedimientoComponent } from './list/procedimiento.component';
import { ProcedimientoDetailComponent } from './detail/procedimiento-detail.component';
import { ProcedimientoUpdateComponent } from './update/procedimiento-update.component';
import ProcedimientoResolve from './route/procedimiento-routing-resolve.service';

const procedimientoRoute: Routes = [
  {
    path: '',
    component: ProcedimientoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProcedimientoDetailComponent,
    resolve: {
      procedimiento: ProcedimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProcedimientoUpdateComponent,
    resolve: {
      procedimiento: ProcedimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProcedimientoUpdateComponent,
    resolve: {
      procedimiento: ProcedimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default procedimientoRoute;
