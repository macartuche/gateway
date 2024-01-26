import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDistrito } from '../distrito.model';
import { DistritoService } from '../service/distrito.service';

export const distritoResolve = (route: ActivatedRouteSnapshot): Observable<null | IDistrito> => {
  const id = route.params['id'];
  if (id) {
    return inject(DistritoService)
      .find(id)
      .pipe(
        mergeMap((distrito: HttpResponse<IDistrito>) => {
          if (distrito.body) {
            return of(distrito.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default distritoResolve;
