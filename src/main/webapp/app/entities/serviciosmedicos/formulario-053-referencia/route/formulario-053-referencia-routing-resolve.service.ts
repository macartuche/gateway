import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFormulario053Referencia } from '../formulario-053-referencia.model';
import { Formulario053ReferenciaService } from '../service/formulario-053-referencia.service';

export const formulario053ReferenciaResolve = (route: ActivatedRouteSnapshot): Observable<null | IFormulario053Referencia> => {
  const id = route.params['id'];
  if (id) {
    return inject(Formulario053ReferenciaService)
      .find(id)
      .pipe(
        mergeMap((formulario053Referencia: HttpResponse<IFormulario053Referencia>) => {
          if (formulario053Referencia.body) {
            return of(formulario053Referencia.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default formulario053ReferenciaResolve;
