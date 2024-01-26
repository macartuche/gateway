import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { MotivoReferenciaComponent } from './list/motivo-referencia.component';
import { MotivoReferenciaDetailComponent } from './detail/motivo-referencia-detail.component';
import { MotivoReferenciaUpdateComponent } from './update/motivo-referencia-update.component';
import MotivoReferenciaResolve from './route/motivo-referencia-routing-resolve.service';

const motivoReferenciaRoute: Routes = [
  {
    path: '',
    component: MotivoReferenciaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MotivoReferenciaDetailComponent,
    resolve: {
      motivoReferencia: MotivoReferenciaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MotivoReferenciaUpdateComponent,
    resolve: {
      motivoReferencia: MotivoReferenciaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MotivoReferenciaUpdateComponent,
    resolve: {
      motivoReferencia: MotivoReferenciaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default motivoReferenciaRoute;
