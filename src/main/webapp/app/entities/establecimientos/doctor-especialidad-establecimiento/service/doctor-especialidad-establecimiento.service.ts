import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDoctorEspecialidadEstablecimiento, NewDoctorEspecialidadEstablecimiento } from '../doctor-especialidad-establecimiento.model';

export type PartialUpdateDoctorEspecialidadEstablecimiento = Partial<IDoctorEspecialidadEstablecimiento> &
  Pick<IDoctorEspecialidadEstablecimiento, 'id'>;

export type EntityResponseType = HttpResponse<IDoctorEspecialidadEstablecimiento>;
export type EntityArrayResponseType = HttpResponse<IDoctorEspecialidadEstablecimiento[]>;

@Injectable({ providedIn: 'root' })
export class DoctorEspecialidadEstablecimientoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/doctor-especialidad-establecimientos', 'establecimientos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(doctorEspecialidadEstablecimiento: NewDoctorEspecialidadEstablecimiento): Observable<EntityResponseType> {
    return this.http.post<IDoctorEspecialidadEstablecimiento>(this.resourceUrl, doctorEspecialidadEstablecimiento, { observe: 'response' });
  }

  update(doctorEspecialidadEstablecimiento: IDoctorEspecialidadEstablecimiento): Observable<EntityResponseType> {
    return this.http.put<IDoctorEspecialidadEstablecimiento>(
      `${this.resourceUrl}/${this.getDoctorEspecialidadEstablecimientoIdentifier(doctorEspecialidadEstablecimiento)}`,
      doctorEspecialidadEstablecimiento,
      { observe: 'response' },
    );
  }

  partialUpdate(doctorEspecialidadEstablecimiento: PartialUpdateDoctorEspecialidadEstablecimiento): Observable<EntityResponseType> {
    return this.http.patch<IDoctorEspecialidadEstablecimiento>(
      `${this.resourceUrl}/${this.getDoctorEspecialidadEstablecimientoIdentifier(doctorEspecialidadEstablecimiento)}`,
      doctorEspecialidadEstablecimiento,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDoctorEspecialidadEstablecimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDoctorEspecialidadEstablecimiento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDoctorEspecialidadEstablecimientoIdentifier(
    doctorEspecialidadEstablecimiento: Pick<IDoctorEspecialidadEstablecimiento, 'id'>,
  ): number {
    return doctorEspecialidadEstablecimiento.id;
  }

  compareDoctorEspecialidadEstablecimiento(
    o1: Pick<IDoctorEspecialidadEstablecimiento, 'id'> | null,
    o2: Pick<IDoctorEspecialidadEstablecimiento, 'id'> | null,
  ): boolean {
    return o1 && o2
      ? this.getDoctorEspecialidadEstablecimientoIdentifier(o1) === this.getDoctorEspecialidadEstablecimientoIdentifier(o2)
      : o1 === o2;
  }

  addDoctorEspecialidadEstablecimientoToCollectionIfMissing<Type extends Pick<IDoctorEspecialidadEstablecimiento, 'id'>>(
    doctorEspecialidadEstablecimientoCollection: Type[],
    ...doctorEspecialidadEstablecimientosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const doctorEspecialidadEstablecimientos: Type[] = doctorEspecialidadEstablecimientosToCheck.filter(isPresent);
    if (doctorEspecialidadEstablecimientos.length > 0) {
      const doctorEspecialidadEstablecimientoCollectionIdentifiers = doctorEspecialidadEstablecimientoCollection.map(
        doctorEspecialidadEstablecimientoItem =>
          this.getDoctorEspecialidadEstablecimientoIdentifier(doctorEspecialidadEstablecimientoItem)!,
      );
      const doctorEspecialidadEstablecimientosToAdd = doctorEspecialidadEstablecimientos.filter(doctorEspecialidadEstablecimientoItem => {
        const doctorEspecialidadEstablecimientoIdentifier = this.getDoctorEspecialidadEstablecimientoIdentifier(
          doctorEspecialidadEstablecimientoItem,
        );
        if (doctorEspecialidadEstablecimientoCollectionIdentifiers.includes(doctorEspecialidadEstablecimientoIdentifier)) {
          return false;
        }
        doctorEspecialidadEstablecimientoCollectionIdentifiers.push(doctorEspecialidadEstablecimientoIdentifier);
        return true;
      });
      return [...doctorEspecialidadEstablecimientosToAdd, ...doctorEspecialidadEstablecimientoCollection];
    }
    return doctorEspecialidadEstablecimientoCollection;
  }
}
