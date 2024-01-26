import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFestivo } from '../festivo.model';
import { FestivoService } from '../service/festivo.service';

export const festivoResolve = (route: ActivatedRouteSnapshot): Observable<null | IFestivo> => {
  const id = route.params['id'];
  if (id) {
    return inject(FestivoService)
      .find(id)
      .pipe(
        mergeMap((festivo: HttpResponse<IFestivo>) => {
          if (festivo.body) {
            return of(festivo.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default festivoResolve;
