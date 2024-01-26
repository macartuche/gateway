import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDoctor } from '../doctor.model';
import { DoctorService } from '../service/doctor.service';

export const doctorResolve = (route: ActivatedRouteSnapshot): Observable<null | IDoctor> => {
  const id = route.params['id'];
  if (id) {
    return inject(DoctorService)
      .find(id)
      .pipe(
        mergeMap((doctor: HttpResponse<IDoctor>) => {
          if (doctor.body) {
            return of(doctor.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default doctorResolve;
