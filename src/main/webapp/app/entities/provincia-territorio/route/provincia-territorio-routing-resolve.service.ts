import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProvinciaTerritorio } from '../provincia-territorio.model';
import { ProvinciaTerritorioService } from '../service/provincia-territorio.service';

export const provinciaTerritorioResolve = (route: ActivatedRouteSnapshot): Observable<null | IProvinciaTerritorio> => {
  const id = route.params['id'];
  if (id) {
    return inject(ProvinciaTerritorioService)
      .find(id)
      .pipe(
        mergeMap((provinciaTerritorio: HttpResponse<IProvinciaTerritorio>) => {
          if (provinciaTerritorio.body) {
            return of(provinciaTerritorio.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default provinciaTerritorioResolve;
