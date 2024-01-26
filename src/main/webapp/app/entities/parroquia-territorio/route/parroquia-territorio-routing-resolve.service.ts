import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IParroquiaTerritorio } from '../parroquia-territorio.model';
import { ParroquiaTerritorioService } from '../service/parroquia-territorio.service';

export const parroquiaTerritorioResolve = (route: ActivatedRouteSnapshot): Observable<null | IParroquiaTerritorio> => {
  const id = route.params['id'];
  if (id) {
    return inject(ParroquiaTerritorioService)
      .find(id)
      .pipe(
        mergeMap((parroquiaTerritorio: HttpResponse<IParroquiaTerritorio>) => {
          if (parroquiaTerritorio.body) {
            return of(parroquiaTerritorio.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default parroquiaTerritorioResolve;
