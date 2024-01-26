import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IItemLiquidacion, NewItemLiquidacion } from '../item-liquidacion.model';

export type PartialUpdateItemLiquidacion = Partial<IItemLiquidacion> & Pick<IItemLiquidacion, 'id'>;

type RestOf<T extends IItemLiquidacion | NewItemLiquidacion> = Omit<T, 'fecha'> & {
  fecha?: string | null;
};

export type RestItemLiquidacion = RestOf<IItemLiquidacion>;

export type NewRestItemLiquidacion = RestOf<NewItemLiquidacion>;

export type PartialUpdateRestItemLiquidacion = RestOf<PartialUpdateItemLiquidacion>;

export type EntityResponseType = HttpResponse<IItemLiquidacion>;
export type EntityArrayResponseType = HttpResponse<IItemLiquidacion[]>;

@Injectable({ providedIn: 'root' })
export class ItemLiquidacionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/item-liquidacions', 'serviciosmedicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(itemLiquidacion: NewItemLiquidacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemLiquidacion);
    return this.http
      .post<RestItemLiquidacion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(itemLiquidacion: IItemLiquidacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemLiquidacion);
    return this.http
      .put<RestItemLiquidacion>(`${this.resourceUrl}/${this.getItemLiquidacionIdentifier(itemLiquidacion)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(itemLiquidacion: PartialUpdateItemLiquidacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemLiquidacion);
    return this.http
      .patch<RestItemLiquidacion>(`${this.resourceUrl}/${this.getItemLiquidacionIdentifier(itemLiquidacion)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestItemLiquidacion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestItemLiquidacion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getItemLiquidacionIdentifier(itemLiquidacion: Pick<IItemLiquidacion, 'id'>): number {
    return itemLiquidacion.id;
  }

  compareItemLiquidacion(o1: Pick<IItemLiquidacion, 'id'> | null, o2: Pick<IItemLiquidacion, 'id'> | null): boolean {
    return o1 && o2 ? this.getItemLiquidacionIdentifier(o1) === this.getItemLiquidacionIdentifier(o2) : o1 === o2;
  }

  addItemLiquidacionToCollectionIfMissing<Type extends Pick<IItemLiquidacion, 'id'>>(
    itemLiquidacionCollection: Type[],
    ...itemLiquidacionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const itemLiquidacions: Type[] = itemLiquidacionsToCheck.filter(isPresent);
    if (itemLiquidacions.length > 0) {
      const itemLiquidacionCollectionIdentifiers = itemLiquidacionCollection.map(
        itemLiquidacionItem => this.getItemLiquidacionIdentifier(itemLiquidacionItem)!,
      );
      const itemLiquidacionsToAdd = itemLiquidacions.filter(itemLiquidacionItem => {
        const itemLiquidacionIdentifier = this.getItemLiquidacionIdentifier(itemLiquidacionItem);
        if (itemLiquidacionCollectionIdentifiers.includes(itemLiquidacionIdentifier)) {
          return false;
        }
        itemLiquidacionCollectionIdentifiers.push(itemLiquidacionIdentifier);
        return true;
      });
      return [...itemLiquidacionsToAdd, ...itemLiquidacionCollection];
    }
    return itemLiquidacionCollection;
  }

  protected convertDateFromClient<T extends IItemLiquidacion | NewItemLiquidacion | PartialUpdateItemLiquidacion>(
    itemLiquidacion: T,
  ): RestOf<T> {
    return {
      ...itemLiquidacion,
      fecha: itemLiquidacion.fecha?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restItemLiquidacion: RestItemLiquidacion): IItemLiquidacion {
    return {
      ...restItemLiquidacion,
      fecha: restItemLiquidacion.fecha ? dayjs(restItemLiquidacion.fecha) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestItemLiquidacion>): HttpResponse<IItemLiquidacion> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestItemLiquidacion[]>): HttpResponse<IItemLiquidacion[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
