import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDiscapacidad, NewDiscapacidad } from '../discapacidad.model';

export type PartialUpdateDiscapacidad = Partial<IDiscapacidad> & Pick<IDiscapacidad, 'id'>;

export type EntityResponseType = HttpResponse<IDiscapacidad>;
export type EntityArrayResponseType = HttpResponse<IDiscapacidad[]>;

@Injectable({ providedIn: 'root' })
export class DiscapacidadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/discapacidads');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(discapacidad: NewDiscapacidad): Observable<EntityResponseType> {
    return this.http.post<IDiscapacidad>(this.resourceUrl, discapacidad, { observe: 'response' });
  }

  update(discapacidad: IDiscapacidad): Observable<EntityResponseType> {
    return this.http.put<IDiscapacidad>(`${this.resourceUrl}/${this.getDiscapacidadIdentifier(discapacidad)}`, discapacidad, {
      observe: 'response',
    });
  }

  partialUpdate(discapacidad: PartialUpdateDiscapacidad): Observable<EntityResponseType> {
    return this.http.patch<IDiscapacidad>(`${this.resourceUrl}/${this.getDiscapacidadIdentifier(discapacidad)}`, discapacidad, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDiscapacidad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDiscapacidad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDiscapacidadIdentifier(discapacidad: Pick<IDiscapacidad, 'id'>): number {
    return discapacidad.id;
  }

  compareDiscapacidad(o1: Pick<IDiscapacidad, 'id'> | null, o2: Pick<IDiscapacidad, 'id'> | null): boolean {
    return o1 && o2 ? this.getDiscapacidadIdentifier(o1) === this.getDiscapacidadIdentifier(o2) : o1 === o2;
  }

  addDiscapacidadToCollectionIfMissing<Type extends Pick<IDiscapacidad, 'id'>>(
    discapacidadCollection: Type[],
    ...discapacidadsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const discapacidads: Type[] = discapacidadsToCheck.filter(isPresent);
    if (discapacidads.length > 0) {
      const discapacidadCollectionIdentifiers = discapacidadCollection.map(
        discapacidadItem => this.getDiscapacidadIdentifier(discapacidadItem)!,
      );
      const discapacidadsToAdd = discapacidads.filter(discapacidadItem => {
        const discapacidadIdentifier = this.getDiscapacidadIdentifier(discapacidadItem);
        if (discapacidadCollectionIdentifiers.includes(discapacidadIdentifier)) {
          return false;
        }
        discapacidadCollectionIdentifiers.push(discapacidadIdentifier);
        return true;
      });
      return [...discapacidadsToAdd, ...discapacidadCollection];
    }
    return discapacidadCollection;
  }
}
