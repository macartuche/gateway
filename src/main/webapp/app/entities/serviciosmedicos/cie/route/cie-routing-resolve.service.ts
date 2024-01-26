import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICie } from '../cie.model';
import { CieService } from '../service/cie.service';

export const cieResolve = (route: ActivatedRouteSnapshot): Observable<null | ICie> => {
  const id = route.params['id'];
  if (id) {
    return inject(CieService)
      .find(id)
      .pipe(
        mergeMap((cie: HttpResponse<ICie>) => {
          if (cie.body) {
            return of(cie.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default cieResolve;
