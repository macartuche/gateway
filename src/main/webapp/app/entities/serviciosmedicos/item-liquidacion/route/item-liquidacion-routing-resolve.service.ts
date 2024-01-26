import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IItemLiquidacion } from '../item-liquidacion.model';
import { ItemLiquidacionService } from '../service/item-liquidacion.service';

export const itemLiquidacionResolve = (route: ActivatedRouteSnapshot): Observable<null | IItemLiquidacion> => {
  const id = route.params['id'];
  if (id) {
    return inject(ItemLiquidacionService)
      .find(id)
      .pipe(
        mergeMap((itemLiquidacion: HttpResponse<IItemLiquidacion>) => {
          if (itemLiquidacion.body) {
            return of(itemLiquidacion.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default itemLiquidacionResolve;
