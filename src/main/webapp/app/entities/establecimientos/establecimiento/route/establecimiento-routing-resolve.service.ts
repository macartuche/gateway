import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEstablecimiento } from '../establecimiento.model';
import { EstablecimientoService } from '../service/establecimiento.service';

export const establecimientoResolve = (route: ActivatedRouteSnapshot): Observable<null | IEstablecimiento> => {
  const id = route.params['id'];
  if (id) {
    return inject(EstablecimientoService)
      .find(id)
      .pipe(
        mergeMap((establecimiento: HttpResponse<IEstablecimiento>) => {
          if (establecimiento.body) {
            return of(establecimiento.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default establecimientoResolve;
