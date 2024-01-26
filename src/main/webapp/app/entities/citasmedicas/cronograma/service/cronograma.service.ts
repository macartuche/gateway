import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICronograma, NewCronograma } from '../cronograma.model';

export type PartialUpdateCronograma = Partial<ICronograma> & Pick<ICronograma, 'id'>;

type RestOf<T extends ICronograma | NewCronograma> = Omit<T, 'fechaInicio' | 'fechaFin'> & {
  fechaInicio?: string | null;
  fechaFin?: string | null;
};

export type RestCronograma = RestOf<ICronograma>;

export type NewRestCronograma = RestOf<NewCronograma>;

export type PartialUpdateRestCronograma = RestOf<PartialUpdateCronograma>;

export type EntityResponseType = HttpResponse<ICronograma>;
export type EntityArrayResponseType = HttpResponse<ICronograma[]>;

@Injectable({ providedIn: 'root' })
export class CronogramaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cronogramas', 'citasmedicas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(cronograma: NewCronograma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cronograma);
    return this.http
      .post<RestCronograma>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(cronograma: ICronograma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cronograma);
    return this.http
      .put<RestCronograma>(`${this.resourceUrl}/${this.getCronogramaIdentifier(cronograma)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(cronograma: PartialUpdateCronograma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cronograma);
    return this.http
      .patch<RestCronograma>(`${this.resourceUrl}/${this.getCronogramaIdentifier(cronograma)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCronograma>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCronograma[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCronogramaIdentifier(cronograma: Pick<ICronograma, 'id'>): number {
    return cronograma.id;
  }

  compareCronograma(o1: Pick<ICronograma, 'id'> | null, o2: Pick<ICronograma, 'id'> | null): boolean {
    return o1 && o2 ? this.getCronogramaIdentifier(o1) === this.getCronogramaIdentifier(o2) : o1 === o2;
  }

  addCronogramaToCollectionIfMissing<Type extends Pick<ICronograma, 'id'>>(
    cronogramaCollection: Type[],
    ...cronogramasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cronogramas: Type[] = cronogramasToCheck.filter(isPresent);
    if (cronogramas.length > 0) {
      const cronogramaCollectionIdentifiers = cronogramaCollection.map(cronogramaItem => this.getCronogramaIdentifier(cronogramaItem)!);
      const cronogramasToAdd = cronogramas.filter(cronogramaItem => {
        const cronogramaIdentifier = this.getCronogramaIdentifier(cronogramaItem);
        if (cronogramaCollectionIdentifiers.includes(cronogramaIdentifier)) {
          return false;
        }
        cronogramaCollectionIdentifiers.push(cronogramaIdentifier);
        return true;
      });
      return [...cronogramasToAdd, ...cronogramaCollection];
    }
    return cronogramaCollection;
  }

  protected convertDateFromClient<T extends ICronograma | NewCronograma | PartialUpdateCronograma>(cronograma: T): RestOf<T> {
    return {
      ...cronograma,
      fechaInicio: cronograma.fechaInicio?.format(DATE_FORMAT) ?? null,
      fechaFin: cronograma.fechaFin?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCronograma: RestCronograma): ICronograma {
    return {
      ...restCronograma,
      fechaInicio: restCronograma.fechaInicio ? dayjs(restCronograma.fechaInicio) : undefined,
      fechaFin: restCronograma.fechaFin ? dayjs(restCronograma.fechaFin) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCronograma>): HttpResponse<ICronograma> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCronograma[]>): HttpResponse<ICronograma[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
