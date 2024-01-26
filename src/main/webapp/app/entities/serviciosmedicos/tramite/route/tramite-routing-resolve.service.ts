import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITramite } from '../tramite.model';
import { TramiteService } from '../service/tramite.service';

export const tramiteResolve = (route: ActivatedRouteSnapshot): Observable<null | ITramite> => {
  const id = route.params['id'];
  if (id) {
    return inject(TramiteService)
      .find(id)
      .pipe(
        mergeMap((tramite: HttpResponse<ITramite>) => {
          if (tramite.body) {
            return of(tramite.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tramiteResolve;
