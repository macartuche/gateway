import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInstitucion } from '../institucion.model';
import { InstitucionService } from '../service/institucion.service';

export const institucionResolve = (route: ActivatedRouteSnapshot): Observable<null | IInstitucion> => {
  const id = route.params['id'];
  if (id) {
    return inject(InstitucionService)
      .find(id)
      .pipe(
        mergeMap((institucion: HttpResponse<IInstitucion>) => {
          if (institucion.body) {
            return of(institucion.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default institucionResolve;
