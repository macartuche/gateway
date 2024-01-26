import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoTramite } from '../tipo-tramite.model';
import { TipoTramiteService } from '../service/tipo-tramite.service';

export const tipoTramiteResolve = (route: ActivatedRouteSnapshot): Observable<null | ITipoTramite> => {
  const id = route.params['id'];
  if (id) {
    return inject(TipoTramiteService)
      .find(id)
      .pipe(
        mergeMap((tipoTramite: HttpResponse<ITipoTramite>) => {
          if (tipoTramite.body) {
            return of(tipoTramite.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tipoTramiteResolve;
