import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { Formulario053ContrareferenciaComponent } from './list/formulario-053-contrareferencia.component';
import { Formulario053ContrareferenciaDetailComponent } from './detail/formulario-053-contrareferencia-detail.component';
import { Formulario053ContrareferenciaUpdateComponent } from './update/formulario-053-contrareferencia-update.component';
import Formulario053ContrareferenciaResolve from './route/formulario-053-contrareferencia-routing-resolve.service';

const formulario053ContrareferenciaRoute: Routes = [
  {
    path: '',
    component: Formulario053ContrareferenciaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Formulario053ContrareferenciaDetailComponent,
    resolve: {
      formulario053Contrareferencia: Formulario053ContrareferenciaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Formulario053ContrareferenciaUpdateComponent,
    resolve: {
      formulario053Contrareferencia: Formulario053ContrareferenciaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Formulario053ContrareferenciaUpdateComponent,
    resolve: {
      formulario053Contrareferencia: Formulario053ContrareferenciaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default formulario053ContrareferenciaRoute;
