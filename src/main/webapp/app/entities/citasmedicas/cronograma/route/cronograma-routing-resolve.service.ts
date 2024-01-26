import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICronograma } from '../cronograma.model';
import { CronogramaService } from '../service/cronograma.service';

export const cronogramaResolve = (route: ActivatedRouteSnapshot): Observable<null | ICronograma> => {
  const id = route.params['id'];
  if (id) {
    return inject(CronogramaService)
      .find(id)
      .pipe(
        mergeMap((cronograma: HttpResponse<ICronograma>) => {
          if (cronograma.body) {
            return of(cronograma.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default cronogramaResolve;
