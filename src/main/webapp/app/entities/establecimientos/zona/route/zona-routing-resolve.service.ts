import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IZona } from '../zona.model';
import { ZonaService } from '../service/zona.service';

export const zonaResolve = (route: ActivatedRouteSnapshot): Observable<null | IZona> => {
  const id = route.params['id'];
  if (id) {
    return inject(ZonaService)
      .find(id)
      .pipe(
        mergeMap((zona: HttpResponse<IZona>) => {
          if (zona.body) {
            return of(zona.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default zonaResolve;
