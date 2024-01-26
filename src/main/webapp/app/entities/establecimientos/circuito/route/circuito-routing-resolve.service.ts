import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICircuito } from '../circuito.model';
import { CircuitoService } from '../service/circuito.service';

export const circuitoResolve = (route: ActivatedRouteSnapshot): Observable<null | ICircuito> => {
  const id = route.params['id'];
  if (id) {
    return inject(CircuitoService)
      .find(id)
      .pipe(
        mergeMap((circuito: HttpResponse<ICircuito>) => {
          if (circuito.body) {
            return of(circuito.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default circuitoResolve;
