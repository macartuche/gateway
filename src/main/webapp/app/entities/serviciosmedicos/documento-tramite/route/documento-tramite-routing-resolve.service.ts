import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDocumentoTramite } from '../documento-tramite.model';
import { DocumentoTramiteService } from '../service/documento-tramite.service';

export const documentoTramiteResolve = (route: ActivatedRouteSnapshot): Observable<null | IDocumentoTramite> => {
  const id = route.params['id'];
  if (id) {
    return inject(DocumentoTramiteService)
      .find(id)
      .pipe(
        mergeMap((documentoTramite: HttpResponse<IDocumentoTramite>) => {
          if (documentoTramite.body) {
            return of(documentoTramite.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default documentoTramiteResolve;
