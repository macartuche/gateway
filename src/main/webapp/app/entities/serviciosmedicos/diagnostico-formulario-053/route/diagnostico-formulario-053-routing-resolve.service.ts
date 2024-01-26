import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDiagnosticoFormulario053 } from '../diagnostico-formulario-053.model';
import { DiagnosticoFormulario053Service } from '../service/diagnostico-formulario-053.service';

export const diagnosticoFormulario053Resolve = (route: ActivatedRouteSnapshot): Observable<null | IDiagnosticoFormulario053> => {
  const id = route.params['id'];
  if (id) {
    return inject(DiagnosticoFormulario053Service)
      .find(id)
      .pipe(
        mergeMap((diagnosticoFormulario053: HttpResponse<IDiagnosticoFormulario053>) => {
          if (diagnosticoFormulario053.body) {
            return of(diagnosticoFormulario053.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default diagnosticoFormulario053Resolve;
