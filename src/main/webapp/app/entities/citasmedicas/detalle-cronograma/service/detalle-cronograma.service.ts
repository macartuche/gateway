import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDetalleCronograma, NewDetalleCronograma } from '../detalle-cronograma.model';

export type PartialUpdateDetalleCronograma = Partial<IDetalleCronograma> & Pick<IDetalleCronograma, 'id'>;

type RestOf<T extends IDetalleCronograma | NewDetalleCronograma> = Omit<T, 'fecha' | 'fechaDesactivacion'> & {
  fecha?: string | null;
  fechaDesactivacion?: string | null;
};

export type RestDetalleCronograma = RestOf<IDetalleCronograma>;

export type NewRestDetalleCronograma = RestOf<NewDetalleCronograma>;

export type PartialUpdateRestDetalleCronograma = RestOf<PartialUpdateDetalleCronograma>;

export type EntityResponseType = HttpResponse<IDetalleCronograma>;
export type EntityArrayResponseType = HttpResponse<IDetalleCronograma[]>;

@Injectable({ providedIn: 'root' })
export class DetalleCronogramaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/detalle-cronogramas', 'citasmedicas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(detalleCronograma: NewDetalleCronograma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detalleCronograma);
    return this.http
      .post<RestDetalleCronograma>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(detalleCronograma: IDetalleCronograma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detalleCronograma);
    return this.http
      .put<RestDetalleCronograma>(`${this.resourceUrl}/${this.getDetalleCronogramaIdentifier(detalleCronograma)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(detalleCronograma: PartialUpdateDetalleCronograma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detalleCronograma);
    return this.http
      .patch<RestDetalleCronograma>(`${this.resourceUrl}/${this.getDetalleCronogramaIdentifier(detalleCronograma)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDetalleCronograma>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDetalleCronograma[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDetalleCronogramaIdentifier(detalleCronograma: Pick<IDetalleCronograma, 'id'>): number {
    return detalleCronograma.id;
  }

  compareDetalleCronograma(o1: Pick<IDetalleCronograma, 'id'> | null, o2: Pick<IDetalleCronograma, 'id'> | null): boolean {
    return o1 && o2 ? this.getDetalleCronogramaIdentifier(o1) === this.getDetalleCronogramaIdentifier(o2) : o1 === o2;
  }

  addDetalleCronogramaToCollectionIfMissing<Type extends Pick<IDetalleCronograma, 'id'>>(
    detalleCronogramaCollection: Type[],
    ...detalleCronogramasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const detalleCronogramas: Type[] = detalleCronogramasToCheck.filter(isPresent);
    if (detalleCronogramas.length > 0) {
      const detalleCronogramaCollectionIdentifiers = detalleCronogramaCollection.map(
        detalleCronogramaItem => this.getDetalleCronogramaIdentifier(detalleCronogramaItem)!,
      );
      const detalleCronogramasToAdd = detalleCronogramas.filter(detalleCronogramaItem => {
        const detalleCronogramaIdentifier = this.getDetalleCronogramaIdentifier(detalleCronogramaItem);
        if (detalleCronogramaCollectionIdentifiers.includes(detalleCronogramaIdentifier)) {
          return false;
        }
        detalleCronogramaCollectionIdentifiers.push(detalleCronogramaIdentifier);
        return true;
      });
      return [...detalleCronogramasToAdd, ...detalleCronogramaCollection];
    }
    return detalleCronogramaCollection;
  }

  protected convertDateFromClient<T extends IDetalleCronograma | NewDetalleCronograma | PartialUpdateDetalleCronograma>(
    detalleCronograma: T,
  ): RestOf<T> {
    return {
      ...detalleCronograma,
      fecha: detalleCronograma.fecha?.format(DATE_FORMAT) ?? null,
      fechaDesactivacion: detalleCronograma.fechaDesactivacion?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDetalleCronograma: RestDetalleCronograma): IDetalleCronograma {
    return {
      ...restDetalleCronograma,
      fecha: restDetalleCronograma.fecha ? dayjs(restDetalleCronograma.fecha) : undefined,
      fechaDesactivacion: restDetalleCronograma.fechaDesactivacion ? dayjs(restDetalleCronograma.fechaDesactivacion) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDetalleCronograma>): HttpResponse<IDetalleCronograma> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDetalleCronograma[]>): HttpResponse<IDetalleCronograma[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
