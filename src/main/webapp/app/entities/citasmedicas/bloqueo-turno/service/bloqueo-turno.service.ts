import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBloqueoTurno, NewBloqueoTurno } from '../bloqueo-turno.model';

export type PartialUpdateBloqueoTurno = Partial<IBloqueoTurno> & Pick<IBloqueoTurno, 'id'>;

type RestOf<T extends IBloqueoTurno | NewBloqueoTurno> = Omit<T, 'fecha'> & {
  fecha?: string | null;
};

export type RestBloqueoTurno = RestOf<IBloqueoTurno>;

export type NewRestBloqueoTurno = RestOf<NewBloqueoTurno>;

export type PartialUpdateRestBloqueoTurno = RestOf<PartialUpdateBloqueoTurno>;

export type EntityResponseType = HttpResponse<IBloqueoTurno>;
export type EntityArrayResponseType = HttpResponse<IBloqueoTurno[]>;

@Injectable({ providedIn: 'root' })
export class BloqueoTurnoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/bloqueo-turnos', 'citasmedicas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(bloqueoTurno: NewBloqueoTurno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bloqueoTurno);
    return this.http
      .post<RestBloqueoTurno>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(bloqueoTurno: IBloqueoTurno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bloqueoTurno);
    return this.http
      .put<RestBloqueoTurno>(`${this.resourceUrl}/${this.getBloqueoTurnoIdentifier(bloqueoTurno)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(bloqueoTurno: PartialUpdateBloqueoTurno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bloqueoTurno);
    return this.http
      .patch<RestBloqueoTurno>(`${this.resourceUrl}/${this.getBloqueoTurnoIdentifier(bloqueoTurno)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestBloqueoTurno>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestBloqueoTurno[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getBloqueoTurnoIdentifier(bloqueoTurno: Pick<IBloqueoTurno, 'id'>): number {
    return bloqueoTurno.id;
  }

  compareBloqueoTurno(o1: Pick<IBloqueoTurno, 'id'> | null, o2: Pick<IBloqueoTurno, 'id'> | null): boolean {
    return o1 && o2 ? this.getBloqueoTurnoIdentifier(o1) === this.getBloqueoTurnoIdentifier(o2) : o1 === o2;
  }

  addBloqueoTurnoToCollectionIfMissing<Type extends Pick<IBloqueoTurno, 'id'>>(
    bloqueoTurnoCollection: Type[],
    ...bloqueoTurnosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const bloqueoTurnos: Type[] = bloqueoTurnosToCheck.filter(isPresent);
    if (bloqueoTurnos.length > 0) {
      const bloqueoTurnoCollectionIdentifiers = bloqueoTurnoCollection.map(
        bloqueoTurnoItem => this.getBloqueoTurnoIdentifier(bloqueoTurnoItem)!,
      );
      const bloqueoTurnosToAdd = bloqueoTurnos.filter(bloqueoTurnoItem => {
        const bloqueoTurnoIdentifier = this.getBloqueoTurnoIdentifier(bloqueoTurnoItem);
        if (bloqueoTurnoCollectionIdentifiers.includes(bloqueoTurnoIdentifier)) {
          return false;
        }
        bloqueoTurnoCollectionIdentifiers.push(bloqueoTurnoIdentifier);
        return true;
      });
      return [...bloqueoTurnosToAdd, ...bloqueoTurnoCollection];
    }
    return bloqueoTurnoCollection;
  }

  protected convertDateFromClient<T extends IBloqueoTurno | NewBloqueoTurno | PartialUpdateBloqueoTurno>(bloqueoTurno: T): RestOf<T> {
    return {
      ...bloqueoTurno,
      fecha: bloqueoTurno.fecha?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restBloqueoTurno: RestBloqueoTurno): IBloqueoTurno {
    return {
      ...restBloqueoTurno,
      fecha: restBloqueoTurno.fecha ? dayjs(restBloqueoTurno.fecha) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestBloqueoTurno>): HttpResponse<IBloqueoTurno> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestBloqueoTurno[]>): HttpResponse<IBloqueoTurno[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
