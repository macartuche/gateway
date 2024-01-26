import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDiscapacidad } from '../discapacidad.model';
import { DiscapacidadService } from '../service/discapacidad.service';

export const discapacidadResolve = (route: ActivatedRouteSnapshot): Observable<null | IDiscapacidad> => {
  const id = route.params['id'];
  if (id) {
    return inject(DiscapacidadService)
      .find(id)
      .pipe(
        mergeMap((discapacidad: HttpResponse<IDiscapacidad>) => {
          if (discapacidad.body) {
            return of(discapacidad.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default discapacidadResolve;
