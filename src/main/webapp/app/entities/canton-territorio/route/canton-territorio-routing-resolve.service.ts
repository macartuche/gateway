import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICantonTerritorio } from '../canton-territorio.model';
import { CantonTerritorioService } from '../service/canton-territorio.service';

export const cantonTerritorioResolve = (route: ActivatedRouteSnapshot): Observable<null | ICantonTerritorio> => {
  const id = route.params['id'];
  if (id) {
    return inject(CantonTerritorioService)
      .find(id)
      .pipe(
        mergeMap((cantonTerritorio: HttpResponse<ICantonTerritorio>) => {
          if (cantonTerritorio.body) {
            return of(cantonTerritorio.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default cantonTerritorioResolve;
