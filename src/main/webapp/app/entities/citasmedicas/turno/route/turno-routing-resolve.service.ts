import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITurno } from '../turno.model';
import { TurnoService } from '../service/turno.service';

export const turnoResolve = (route: ActivatedRouteSnapshot): Observable<null | ITurno> => {
  const id = route.params['id'];
  if (id) {
    return inject(TurnoService)
      .find(id)
      .pipe(
        mergeMap((turno: HttpResponse<ITurno>) => {
          if (turno.body) {
            return of(turno.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default turnoResolve;
