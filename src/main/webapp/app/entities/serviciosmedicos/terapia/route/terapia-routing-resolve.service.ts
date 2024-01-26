import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITerapia } from '../terapia.model';
import { TerapiaService } from '../service/terapia.service';

export const terapiaResolve = (route: ActivatedRouteSnapshot): Observable<null | ITerapia> => {
  const id = route.params['id'];
  if (id) {
    return inject(TerapiaService)
      .find(id)
      .pipe(
        mergeMap((terapia: HttpResponse<ITerapia>) => {
          if (terapia.body) {
            return of(terapia.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default terapiaResolve;
