import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEntidad, NewEntidad } from '../entidad.model';

export type PartialUpdateEntidad = Partial<IEntidad> & Pick<IEntidad, 'id'>;

export type EntityResponseType = HttpResponse<IEntidad>;
export type EntityArrayResponseType = HttpResponse<IEntidad[]>;

@Injectable({ providedIn: 'root' })
export class EntidadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/entidads', 'establecimientos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(entidad: NewEntidad): Observable<EntityResponseType> {
    return this.http.post<IEntidad>(this.resourceUrl, entidad, { observe: 'response' });
  }

  update(entidad: IEntidad): Observable<EntityResponseType> {
    return this.http.put<IEntidad>(`${this.resourceUrl}/${this.getEntidadIdentifier(entidad)}`, entidad, { observe: 'response' });
  }

  partialUpdate(entidad: PartialUpdateEntidad): Observable<EntityResponseType> {
    return this.http.patch<IEntidad>(`${this.resourceUrl}/${this.getEntidadIdentifier(entidad)}`, entidad, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEntidad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntidad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEntidadIdentifier(entidad: Pick<IEntidad, 'id'>): number {
    return entidad.id;
  }

  compareEntidad(o1: Pick<IEntidad, 'id'> | null, o2: Pick<IEntidad, 'id'> | null): boolean {
    return o1 && o2 ? this.getEntidadIdentifier(o1) === this.getEntidadIdentifier(o2) : o1 === o2;
  }

  addEntidadToCollectionIfMissing<Type extends Pick<IEntidad, 'id'>>(
    entidadCollection: Type[],
    ...entidadsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const entidads: Type[] = entidadsToCheck.filter(isPresent);
    if (entidads.length > 0) {
      const entidadCollectionIdentifiers = entidadCollection.map(entidadItem => this.getEntidadIdentifier(entidadItem)!);
      const entidadsToAdd = entidads.filter(entidadItem => {
        const entidadIdentifier = this.getEntidadIdentifier(entidadItem);
        if (entidadCollectionIdentifiers.includes(entidadIdentifier)) {
          return false;
        }
        entidadCollectionIdentifiers.push(entidadIdentifier);
        return true;
      });
      return [...entidadsToAdd, ...entidadCollection];
    }
    return entidadCollection;
  }
}
