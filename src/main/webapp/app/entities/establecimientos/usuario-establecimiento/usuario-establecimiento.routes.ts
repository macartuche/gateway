import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { UsuarioEstablecimientoComponent } from './list/usuario-establecimiento.component';
import { UsuarioEstablecimientoDetailComponent } from './detail/usuario-establecimiento-detail.component';
import { UsuarioEstablecimientoUpdateComponent } from './update/usuario-establecimiento-update.component';
import UsuarioEstablecimientoResolve from './route/usuario-establecimiento-routing-resolve.service';

const usuarioEstablecimientoRoute: Routes = [
  {
    path: '',
    component: UsuarioEstablecimientoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UsuarioEstablecimientoDetailComponent,
    resolve: {
      usuarioEstablecimiento: UsuarioEstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UsuarioEstablecimientoUpdateComponent,
    resolve: {
      usuarioEstablecimiento: UsuarioEstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UsuarioEstablecimientoUpdateComponent,
    resolve: {
      usuarioEstablecimiento: UsuarioEstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default usuarioEstablecimientoRoute;
