import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDetalleCronograma } from '../detalle-cronograma.model';
import { DetalleCronogramaService } from '../service/detalle-cronograma.service';

export const detalleCronogramaResolve = (route: ActivatedRouteSnapshot): Observable<null | IDetalleCronograma> => {
  const id = route.params['id'];
  if (id) {
    return inject(DetalleCronogramaService)
      .find(id)
      .pipe(
        mergeMap((detalleCronograma: HttpResponse<IDetalleCronograma>) => {
          if (detalleCronograma.body) {
            return of(detalleCronograma.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default detalleCronogramaResolve;
