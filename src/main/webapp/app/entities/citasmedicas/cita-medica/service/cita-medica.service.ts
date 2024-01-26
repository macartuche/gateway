import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICitaMedica, NewCitaMedica } from '../cita-medica.model';

export type PartialUpdateCitaMedica = Partial<ICitaMedica> & Pick<ICitaMedica, 'id'>;

type RestOf<T extends ICitaMedica | NewCitaMedica> = Omit<
  T,
  'fechaInicioAtencion' | 'fechaFinAtencion' | 'horaInicioAtencion' | 'horaFinAtencion'
> & {
  fechaInicioAtencion?: string | null;
  fechaFinAtencion?: string | null;
  horaInicioAtencion?: string | null;
  horaFinAtencion?: string | null;
};

export type RestCitaMedica = RestOf<ICitaMedica>;

export type NewRestCitaMedica = RestOf<NewCitaMedica>;

export type PartialUpdateRestCitaMedica = RestOf<PartialUpdateCitaMedica>;

export type EntityResponseType = HttpResponse<ICitaMedica>;
export type EntityArrayResponseType = HttpResponse<ICitaMedica[]>;

@Injectable({ providedIn: 'root' })
export class CitaMedicaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cita-medicas', 'citasmedicas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(citaMedica: NewCitaMedica): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(citaMedica);
    return this.http
      .post<RestCitaMedica>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(citaMedica: ICitaMedica): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(citaMedica);
    return this.http
      .put<RestCitaMedica>(`${this.resourceUrl}/${this.getCitaMedicaIdentifier(citaMedica)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(citaMedica: PartialUpdateCitaMedica): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(citaMedica);
    return this.http
      .patch<RestCitaMedica>(`${this.resourceUrl}/${this.getCitaMedicaIdentifier(citaMedica)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCitaMedica>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCitaMedica[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCitaMedicaIdentifier(citaMedica: Pick<ICitaMedica, 'id'>): number {
    return citaMedica.id;
  }

  compareCitaMedica(o1: Pick<ICitaMedica, 'id'> | null, o2: Pick<ICitaMedica, 'id'> | null): boolean {
    return o1 && o2 ? this.getCitaMedicaIdentifier(o1) === this.getCitaMedicaIdentifier(o2) : o1 === o2;
  }

  addCitaMedicaToCollectionIfMissing<Type extends Pick<ICitaMedica, 'id'>>(
    citaMedicaCollection: Type[],
    ...citaMedicasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const citaMedicas: Type[] = citaMedicasToCheck.filter(isPresent);
    if (citaMedicas.length > 0) {
      const citaMedicaCollectionIdentifiers = citaMedicaCollection.map(citaMedicaItem => this.getCitaMedicaIdentifier(citaMedicaItem)!);
      const citaMedicasToAdd = citaMedicas.filter(citaMedicaItem => {
        const citaMedicaIdentifier = this.getCitaMedicaIdentifier(citaMedicaItem);
        if (citaMedicaCollectionIdentifiers.includes(citaMedicaIdentifier)) {
          return false;
        }
        citaMedicaCollectionIdentifiers.push(citaMedicaIdentifier);
        return true;
      });
      return [...citaMedicasToAdd, ...citaMedicaCollection];
    }
    return citaMedicaCollection;
  }

  protected convertDateFromClient<T extends ICitaMedica | NewCitaMedica | PartialUpdateCitaMedica>(citaMedica: T): RestOf<T> {
    return {
      ...citaMedica,
      fechaInicioAtencion: citaMedica.fechaInicioAtencion?.format(DATE_FORMAT) ?? null,
      fechaFinAtencion: citaMedica.fechaFinAtencion?.format(DATE_FORMAT) ?? null,
      horaInicioAtencion: citaMedica.horaInicioAtencion?.toJSON() ?? null,
      horaFinAtencion: citaMedica.horaFinAtencion?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCitaMedica: RestCitaMedica): ICitaMedica {
    return {
      ...restCitaMedica,
      fechaInicioAtencion: restCitaMedica.fechaInicioAtencion ? dayjs(restCitaMedica.fechaInicioAtencion) : undefined,
      fechaFinAtencion: restCitaMedica.fechaFinAtencion ? dayjs(restCitaMedica.fechaFinAtencion) : undefined,
      horaInicioAtencion: restCitaMedica.horaInicioAtencion ? dayjs(restCitaMedica.horaInicioAtencion) : undefined,
      horaFinAtencion: restCitaMedica.horaFinAtencion ? dayjs(restCitaMedica.horaFinAtencion) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCitaMedica>): HttpResponse<ICitaMedica> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCitaMedica[]>): HttpResponse<ICitaMedica[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
