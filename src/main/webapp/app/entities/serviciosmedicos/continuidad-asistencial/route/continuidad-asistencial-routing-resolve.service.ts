import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IContinuidadAsistencial } from '../continuidad-asistencial.model';
import { ContinuidadAsistencialService } from '../service/continuidad-asistencial.service';

export const continuidadAsistencialResolve = (route: ActivatedRouteSnapshot): Observable<null | IContinuidadAsistencial> => {
  const id = route.params['id'];
  if (id) {
    return inject(ContinuidadAsistencialService)
      .find(id)
      .pipe(
        mergeMap((continuidadAsistencial: HttpResponse<IContinuidadAsistencial>) => {
          if (continuidadAsistencial.body) {
            return of(continuidadAsistencial.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default continuidadAsistencialResolve;
