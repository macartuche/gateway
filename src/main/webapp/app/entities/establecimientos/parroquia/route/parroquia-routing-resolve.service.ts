import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IParroquia } from '../parroquia.model';
import { ParroquiaService } from '../service/parroquia.service';

export const parroquiaResolve = (route: ActivatedRouteSnapshot): Observable<null | IParroquia> => {
  const id = route.params['id'];
  if (id) {
    return inject(ParroquiaService)
      .find(id)
      .pipe(
        mergeMap((parroquia: HttpResponse<IParroquia>) => {
          if (parroquia.body) {
            return of(parroquia.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default parroquiaResolve;
