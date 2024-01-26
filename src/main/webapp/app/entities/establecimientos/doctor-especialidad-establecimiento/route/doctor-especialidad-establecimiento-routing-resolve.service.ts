import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDoctorEspecialidadEstablecimiento } from '../doctor-especialidad-establecimiento.model';
import { DoctorEspecialidadEstablecimientoService } from '../service/doctor-especialidad-establecimiento.service';

export const doctorEspecialidadEstablecimientoResolve = (
  route: ActivatedRouteSnapshot,
): Observable<null | IDoctorEspecialidadEstablecimiento> => {
  const id = route.params['id'];
  if (id) {
    return inject(DoctorEspecialidadEstablecimientoService)
      .find(id)
      .pipe(
        mergeMap((doctorEspecialidadEstablecimiento: HttpResponse<IDoctorEspecialidadEstablecimiento>) => {
          if (doctorEspecialidadEstablecimiento.body) {
            return of(doctorEspecialidadEstablecimiento.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default doctorEspecialidadEstablecimientoResolve;
