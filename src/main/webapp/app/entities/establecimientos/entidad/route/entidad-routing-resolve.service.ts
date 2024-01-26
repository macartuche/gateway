import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEntidad } from '../entidad.model';
import { EntidadService } from '../service/entidad.service';

export const entidadResolve = (route: ActivatedRouteSnapshot): Observable<null | IEntidad> => {
  const id = route.params['id'];
  if (id) {
    return inject(EntidadService)
      .find(id)
      .pipe(
        mergeMap((entidad: HttpResponse<IEntidad>) => {
          if (entidad.body) {
            return of(entidad.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default entidadResolve;
