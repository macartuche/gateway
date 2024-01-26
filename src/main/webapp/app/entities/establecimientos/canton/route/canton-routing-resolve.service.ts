import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICanton } from '../canton.model';
import { CantonService } from '../service/canton.service';

export const cantonResolve = (route: ActivatedRouteSnapshot): Observable<null | ICanton> => {
  const id = route.params['id'];
  if (id) {
    return inject(CantonService)
      .find(id)
      .pipe(
        mergeMap((canton: HttpResponse<ICanton>) => {
          if (canton.body) {
            return of(canton.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default cantonResolve;
