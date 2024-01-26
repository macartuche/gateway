import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUsuarioEstablecimiento } from '../usuario-establecimiento.model';
import { UsuarioEstablecimientoService } from '../service/usuario-establecimiento.service';

export const usuarioEstablecimientoResolve = (route: ActivatedRouteSnapshot): Observable<null | IUsuarioEstablecimiento> => {
  const id = route.params['id'];
  if (id) {
    return inject(UsuarioEstablecimientoService)
      .find(id)
      .pipe(
        mergeMap((usuarioEstablecimiento: HttpResponse<IUsuarioEstablecimiento>) => {
          if (usuarioEstablecimiento.body) {
            return of(usuarioEstablecimiento.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default usuarioEstablecimientoResolve;
