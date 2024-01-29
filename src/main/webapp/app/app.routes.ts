import { Routes } from '@angular/router';

import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { errorRoute } from './layouts/error/error.route';

import HomeComponent from './home/home.component';
import LoginComponent from './login/login.component';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login.title',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [UserRouteAccessService],
    data: {
      title: 'Home',
      authorities: [],
    },
    children: [
      {
        path: 'home',
        data: {
          authorities: [],
        },
        component: HomeComponent,
        title: 'home.title',
      },
      {
        path: 'admin',
        data: {
          authorities: [Authority.ADMIN],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./admin/admin.routes'),
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.route'),
      },

      {
        path: 'entidades',
        loadChildren: () => import(`./entities/entity.routes`),
      },
      /* {
        path: 'establecimientos',
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import(`./establecimientos/establecimientos-routing.module`).then(
            ({ EstablecimientosRoutingModule }) => EstablecimientosRoutingModule,
          ),
      },
      {
        path: 'cronogramas',
        loadChildren: () =>
          import(`./cronogramas/cronogramas-routing.module`).then(({ CronogramasRoutingModule }) => CronogramasRoutingModule),
      },
      {
        path: 'citas-medicas',
        loadChildren: () =>
          import(`./citas-medicas/citas-medicas-routing.module`).then(({ CitasMedicasRoutingModule }) => CitasMedicasRoutingModule),
      },
      {
        path: 'servicios-medicos',
        loadChildren: () =>
          import(`./servicios-medicos/servicios-medicos-routing.module`).then(
            ({ ServiciosMedicosRoutingModule }) => ServiciosMedicosRoutingModule,
          ),
      },
      {
        path: 'administracion',
        loadChildren: () =>
          import(`./administracion/administracion-routing.module`).then(({ AdmimistracionRoutingModule }) => AdmimistracionRoutingModule),
      },*/
    ],
  },
  ...errorRoute,
];

export default routes;
