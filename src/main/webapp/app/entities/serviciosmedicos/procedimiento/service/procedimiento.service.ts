import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProcedimiento, NewProcedimiento } from '../procedimiento.model';

export type PartialUpdateProcedimiento = Partial<IProcedimiento> & Pick<IProcedimiento, 'id'>;

type RestOf<T extends IProcedimiento | NewProcedimiento> = Omit<T, 'fecha'> & {
  fecha?: string | null;
};

export type RestProcedimiento = RestOf<IProcedimiento>;

export type NewRestProcedimiento = RestOf<NewProcedimiento>;

export type PartialUpdateRestProcedimiento = RestOf<PartialUpdateProcedimiento>;

export type EntityResponseType = HttpResponse<IProcedimiento>;
export type EntityArrayResponseType = HttpResponse<IProcedimiento[]>;

@Injectable({ providedIn: 'root' })
export class ProcedimientoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/procedimientos', 'serviciosmedicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(procedimiento: NewProcedimiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(procedimiento);
    return this.http
      .post<RestProcedimiento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(procedimiento: IProcedimiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(procedimiento);
    return this.http
      .put<RestProcedimiento>(`${this.resourceUrl}/${this.getProcedimientoIdentifier(procedimiento)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(procedimiento: PartialUpdateProcedimiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(procedimiento);
    return this.http
      .patch<RestProcedimiento>(`${this.resourceUrl}/${this.getProcedimientoIdentifier(procedimiento)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestProcedimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestProcedimiento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProcedimientoIdentifier(procedimiento: Pick<IProcedimiento, 'id'>): number {
    return procedimiento.id;
  }

  compareProcedimiento(o1: Pick<IProcedimiento, 'id'> | null, o2: Pick<IProcedimiento, 'id'> | null): boolean {
    return o1 && o2 ? this.getProcedimientoIdentifier(o1) === this.getProcedimientoIdentifier(o2) : o1 === o2;
  }

  addProcedimientoToCollectionIfMissing<Type extends Pick<IProcedimiento, 'id'>>(
    procedimientoCollection: Type[],
    ...procedimientosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const procedimientos: Type[] = procedimientosToCheck.filter(isPresent);
    if (procedimientos.length > 0) {
      const procedimientoCollectionIdentifiers = procedimientoCollection.map(
        procedimientoItem => this.getProcedimientoIdentifier(procedimientoItem)!,
      );
      const procedimientosToAdd = procedimientos.filter(procedimientoItem => {
        const procedimientoIdentifier = this.getProcedimientoIdentifier(procedimientoItem);
        if (procedimientoCollectionIdentifiers.includes(procedimientoIdentifier)) {
          return false;
        }
        procedimientoCollectionIdentifiers.push(procedimientoIdentifier);
        return true;
      });
      return [...procedimientosToAdd, ...procedimientoCollection];
    }
    return procedimientoCollection;
  }

  protected convertDateFromClient<T extends IProcedimiento | NewProcedimiento | PartialUpdateProcedimiento>(procedimiento: T): RestOf<T> {
    return {
      ...procedimiento,
      fecha: procedimiento.fecha?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restProcedimiento: RestProcedimiento): IProcedimiento {
    return {
      ...restProcedimiento,
      fecha: restProcedimiento.fecha ? dayjs(restProcedimiento.fecha) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestProcedimiento>): HttpResponse<IProcedimiento> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestProcedimiento[]>): HttpResponse<IProcedimiento[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
