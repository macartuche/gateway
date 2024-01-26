import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFormulario053Contrareferencia } from '../formulario-053-contrareferencia.model';
import { Formulario053ContrareferenciaService } from '../service/formulario-053-contrareferencia.service';

export const formulario053ContrareferenciaResolve = (route: ActivatedRouteSnapshot): Observable<null | IFormulario053Contrareferencia> => {
  const id = route.params['id'];
  if (id) {
    return inject(Formulario053ContrareferenciaService)
      .find(id)
      .pipe(
        mergeMap((formulario053Contrareferencia: HttpResponse<IFormulario053Contrareferencia>) => {
          if (formulario053Contrareferencia.body) {
            return of(formulario053Contrareferencia.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default formulario053ContrareferenciaResolve;
