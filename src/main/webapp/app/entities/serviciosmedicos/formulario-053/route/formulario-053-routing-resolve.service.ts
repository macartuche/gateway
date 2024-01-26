import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFormulario053 } from '../formulario-053.model';
import { Formulario053Service } from '../service/formulario-053.service';

export const formulario053Resolve = (route: ActivatedRouteSnapshot): Observable<null | IFormulario053> => {
  const id = route.params['id'];
  if (id) {
    return inject(Formulario053Service)
      .find(id)
      .pipe(
        mergeMap((formulario053: HttpResponse<IFormulario053>) => {
          if (formulario053.body) {
            return of(formulario053.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default formulario053Resolve;
