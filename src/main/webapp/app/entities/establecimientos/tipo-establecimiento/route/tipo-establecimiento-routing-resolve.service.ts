import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoEstablecimiento } from '../tipo-establecimiento.model';
import { TipoEstablecimientoService } from '../service/tipo-establecimiento.service';

export const tipoEstablecimientoResolve = (route: ActivatedRouteSnapshot): Observable<null | ITipoEstablecimiento> => {
  const id = route.params['id'];
  if (id) {
    return inject(TipoEstablecimientoService)
      .find(id)
      .pipe(
        mergeMap((tipoEstablecimiento: HttpResponse<ITipoEstablecimiento>) => {
          if (tipoEstablecimiento.body) {
            return of(tipoEstablecimiento.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tipoEstablecimientoResolve;
