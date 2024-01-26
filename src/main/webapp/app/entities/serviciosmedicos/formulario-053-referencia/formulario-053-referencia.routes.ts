import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { Formulario053ReferenciaComponent } from './list/formulario-053-referencia.component';
import { Formulario053ReferenciaDetailComponent } from './detail/formulario-053-referencia-detail.component';
import { Formulario053ReferenciaUpdateComponent } from './update/formulario-053-referencia-update.component';
import Formulario053ReferenciaResolve from './route/formulario-053-referencia-routing-resolve.service';

const formulario053ReferenciaRoute: Routes = [
  {
    path: '',
    component: Formulario053ReferenciaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Formulario053ReferenciaDetailComponent,
    resolve: {
      formulario053Referencia: Formulario053ReferenciaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Formulario053ReferenciaUpdateComponent,
    resolve: {
      formulario053Referencia: Formulario053ReferenciaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Formulario053ReferenciaUpdateComponent,
    resolve: {
      formulario053Referencia: Formulario053ReferenciaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default formulario053ReferenciaRoute;
