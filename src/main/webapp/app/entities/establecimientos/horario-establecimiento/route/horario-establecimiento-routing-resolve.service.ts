import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHorarioEstablecimiento } from '../horario-establecimiento.model';
import { HorarioEstablecimientoService } from '../service/horario-establecimiento.service';

export const horarioEstablecimientoResolve = (route: ActivatedRouteSnapshot): Observable<null | IHorarioEstablecimiento> => {
  const id = route.params['id'];
  if (id) {
    return inject(HorarioEstablecimientoService)
      .find(id)
      .pipe(
        mergeMap((horarioEstablecimiento: HttpResponse<IHorarioEstablecimiento>) => {
          if (horarioEstablecimiento.body) {
            return of(horarioEstablecimiento.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default horarioEstablecimientoResolve;
