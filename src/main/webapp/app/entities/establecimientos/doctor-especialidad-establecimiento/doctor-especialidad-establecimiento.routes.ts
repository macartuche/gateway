import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DoctorEspecialidadEstablecimientoComponent } from './list/doctor-especialidad-establecimiento.component';
import { DoctorEspecialidadEstablecimientoDetailComponent } from './detail/doctor-especialidad-establecimiento-detail.component';
import { DoctorEspecialidadEstablecimientoUpdateComponent } from './update/doctor-especialidad-establecimiento-update.component';
import DoctorEspecialidadEstablecimientoResolve from './route/doctor-especialidad-establecimiento-routing-resolve.service';

const doctorEspecialidadEstablecimientoRoute: Routes = [
  {
    path: '',
    component: DoctorEspecialidadEstablecimientoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DoctorEspecialidadEstablecimientoDetailComponent,
    resolve: {
      doctorEspecialidadEstablecimiento: DoctorEspecialidadEstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DoctorEspecialidadEstablecimientoUpdateComponent,
    resolve: {
      doctorEspecialidadEstablecimiento: DoctorEspecialidadEstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DoctorEspecialidadEstablecimientoUpdateComponent,
    resolve: {
      doctorEspecialidadEstablecimiento: DoctorEspecialidadEstablecimientoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default doctorEspecialidadEstablecimientoRoute;
