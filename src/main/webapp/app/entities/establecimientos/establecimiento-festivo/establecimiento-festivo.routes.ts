import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { EstablecimientoFestivoComponent } from './list/establecimiento-festivo.component';
import { EstablecimientoFestivoDetailComponent } from './detail/establecimiento-festivo-detail.component';
import { EstablecimientoFestivoUpdateComponent } from './update/establecimiento-festivo-update.component';
import EstablecimientoFestivoResolve from './route/establecimiento-festivo-routing-resolve.service';

const establecimientoFestivoRoute: Routes = [
  {
    path: '',
    component: EstablecimientoFestivoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstablecimientoFestivoDetailComponent,
    resolve: {
      establecimientoFestivo: EstablecimientoFestivoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstablecimientoFestivoUpdateComponent,
    resolve: {
      establecimientoFestivo: EstablecimientoFestivoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstablecimientoFestivoUpdateComponent,
    resolve: {
      establecimientoFestivo: EstablecimientoFestivoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default establecimientoFestivoRoute;
