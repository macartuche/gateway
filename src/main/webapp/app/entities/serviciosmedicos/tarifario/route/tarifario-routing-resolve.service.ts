import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITarifario } from '../tarifario.model';
import { TarifarioService } from '../service/tarifario.service';

export const tarifarioResolve = (route: ActivatedRouteSnapshot): Observable<null | ITarifario> => {
  const id = route.params['id'];
  if (id) {
    return inject(TarifarioService)
      .find(id)
      .pipe(
        mergeMap((tarifario: HttpResponse<ITarifario>) => {
          if (tarifario.body) {
            return of(tarifario.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tarifarioResolve;
