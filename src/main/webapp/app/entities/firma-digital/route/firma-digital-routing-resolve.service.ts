import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFirmaDigital } from '../firma-digital.model';
import { FirmaDigitalService } from '../service/firma-digital.service';

export const firmaDigitalResolve = (route: ActivatedRouteSnapshot): Observable<null | IFirmaDigital> => {
  const id = route.params['id'];
  if (id) {
    return inject(FirmaDigitalService)
      .find(id)
      .pipe(
        mergeMap((firmaDigital: HttpResponse<IFirmaDigital>) => {
          if (firmaDigital.body) {
            return of(firmaDigital.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default firmaDigitalResolve;
