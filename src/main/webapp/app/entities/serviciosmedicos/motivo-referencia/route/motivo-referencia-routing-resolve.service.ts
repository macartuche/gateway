import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMotivoReferencia } from '../motivo-referencia.model';
import { MotivoReferenciaService } from '../service/motivo-referencia.service';

export const motivoReferenciaResolve = (route: ActivatedRouteSnapshot): Observable<null | IMotivoReferencia> => {
  const id = route.params['id'];
  if (id) {
    return inject(MotivoReferenciaService)
      .find(id)
      .pipe(
        mergeMap((motivoReferencia: HttpResponse<IMotivoReferencia>) => {
          if (motivoReferencia.body) {
            return of(motivoReferencia.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default motivoReferenciaResolve;
