import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INivelEstablecimiento } from '../nivel-establecimiento.model';
import { NivelEstablecimientoService } from '../service/nivel-establecimiento.service';

export const nivelEstablecimientoResolve = (route: ActivatedRouteSnapshot): Observable<null | INivelEstablecimiento> => {
  const id = route.params['id'];
  if (id) {
    return inject(NivelEstablecimientoService)
      .find(id)
      .pipe(
        mergeMap((nivelEstablecimiento: HttpResponse<INivelEstablecimiento>) => {
          if (nivelEstablecimiento.body) {
            return of(nivelEstablecimiento.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default nivelEstablecimientoResolve;
