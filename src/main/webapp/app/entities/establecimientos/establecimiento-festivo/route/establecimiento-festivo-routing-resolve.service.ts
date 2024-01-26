import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEstablecimientoFestivo } from '../establecimiento-festivo.model';
import { EstablecimientoFestivoService } from '../service/establecimiento-festivo.service';

export const establecimientoFestivoResolve = (route: ActivatedRouteSnapshot): Observable<null | IEstablecimientoFestivo> => {
  const id = route.params['id'];
  if (id) {
    return inject(EstablecimientoFestivoService)
      .find(id)
      .pipe(
        mergeMap((establecimientoFestivo: HttpResponse<IEstablecimientoFestivo>) => {
          if (establecimientoFestivo.body) {
            return of(establecimientoFestivo.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default establecimientoFestivoResolve;
