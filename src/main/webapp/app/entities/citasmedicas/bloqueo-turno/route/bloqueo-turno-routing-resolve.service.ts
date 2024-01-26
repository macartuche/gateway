import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBloqueoTurno } from '../bloqueo-turno.model';
import { BloqueoTurnoService } from '../service/bloqueo-turno.service';

export const bloqueoTurnoResolve = (route: ActivatedRouteSnapshot): Observable<null | IBloqueoTurno> => {
  const id = route.params['id'];
  if (id) {
    return inject(BloqueoTurnoService)
      .find(id)
      .pipe(
        mergeMap((bloqueoTurno: HttpResponse<IBloqueoTurno>) => {
          if (bloqueoTurno.body) {
            return of(bloqueoTurno.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default bloqueoTurnoResolve;
