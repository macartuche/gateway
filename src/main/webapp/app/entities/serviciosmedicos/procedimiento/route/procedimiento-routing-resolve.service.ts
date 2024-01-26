import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProcedimiento } from '../procedimiento.model';
import { ProcedimientoService } from '../service/procedimiento.service';

export const procedimientoResolve = (route: ActivatedRouteSnapshot): Observable<null | IProcedimiento> => {
  const id = route.params['id'];
  if (id) {
    return inject(ProcedimientoService)
      .find(id)
      .pipe(
        mergeMap((procedimiento: HttpResponse<IProcedimiento>) => {
          if (procedimiento.body) {
            return of(procedimiento.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default procedimientoResolve;
