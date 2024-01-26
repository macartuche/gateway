import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDocumento } from '../documento.model';
import { DocumentoService } from '../service/documento.service';

export const documentoResolve = (route: ActivatedRouteSnapshot): Observable<null | IDocumento> => {
  const id = route.params['id'];
  if (id) {
    return inject(DocumentoService)
      .find(id)
      .pipe(
        mergeMap((documento: HttpResponse<IDocumento>) => {
          if (documento.body) {
            return of(documento.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default documentoResolve;
