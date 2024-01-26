import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IItemCie } from '../item-cie.model';
import { ItemCieService } from '../service/item-cie.service';

export const itemCieResolve = (route: ActivatedRouteSnapshot): Observable<null | IItemCie> => {
  const id = route.params['id'];
  if (id) {
    return inject(ItemCieService)
      .find(id)
      .pipe(
        mergeMap((itemCie: HttpResponse<IItemCie>) => {
          if (itemCie.body) {
            return of(itemCie.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default itemCieResolve;
