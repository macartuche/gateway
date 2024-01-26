import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICitaMedica } from '../cita-medica.model';
import { CitaMedicaService } from '../service/cita-medica.service';

export const citaMedicaResolve = (route: ActivatedRouteSnapshot): Observable<null | ICitaMedica> => {
  const id = route.params['id'];
  if (id) {
    return inject(CitaMedicaService)
      .find(id)
      .pipe(
        mergeMap((citaMedica: HttpResponse<ICitaMedica>) => {
          if (citaMedica.body) {
            return of(citaMedica.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default citaMedicaResolve;
