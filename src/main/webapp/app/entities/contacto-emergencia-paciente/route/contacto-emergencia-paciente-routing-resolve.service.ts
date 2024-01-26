import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IContactoEmergenciaPaciente } from '../contacto-emergencia-paciente.model';
import { ContactoEmergenciaPacienteService } from '../service/contacto-emergencia-paciente.service';

export const contactoEmergenciaPacienteResolve = (route: ActivatedRouteSnapshot): Observable<null | IContactoEmergenciaPaciente> => {
  const id = route.params['id'];
  if (id) {
    return inject(ContactoEmergenciaPacienteService)
      .find(id)
      .pipe(
        mergeMap((contactoEmergenciaPaciente: HttpResponse<IContactoEmergenciaPaciente>) => {
          if (contactoEmergenciaPaciente.body) {
            return of(contactoEmergenciaPaciente.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default contactoEmergenciaPacienteResolve;
