import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IItemCie, NewItemCie } from '../item-cie.model';

export type PartialUpdateItemCie = Partial<IItemCie> & Pick<IItemCie, 'id'>;

export type EntityResponseType = HttpResponse<IItemCie>;
export type EntityArrayResponseType = HttpResponse<IItemCie[]>;

@Injectable({ providedIn: 'root' })
export class ItemCieService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/item-cies', 'serviciosmedicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(itemCie: NewItemCie): Observable<EntityResponseType> {
    return this.http.post<IItemCie>(this.resourceUrl, itemCie, { observe: 'response' });
  }

  update(itemCie: IItemCie): Observable<EntityResponseType> {
    return this.http.put<IItemCie>(`${this.resourceUrl}/${this.getItemCieIdentifier(itemCie)}`, itemCie, { observe: 'response' });
  }

  partialUpdate(itemCie: PartialUpdateItemCie): Observable<EntityResponseType> {
    return this.http.patch<IItemCie>(`${this.resourceUrl}/${this.getItemCieIdentifier(itemCie)}`, itemCie, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IItemCie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItemCie[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getItemCieIdentifier(itemCie: Pick<IItemCie, 'id'>): number {
    return itemCie.id;
  }

  compareItemCie(o1: Pick<IItemCie, 'id'> | null, o2: Pick<IItemCie, 'id'> | null): boolean {
    return o1 && o2 ? this.getItemCieIdentifier(o1) === this.getItemCieIdentifier(o2) : o1 === o2;
  }

  addItemCieToCollectionIfMissing<Type extends Pick<IItemCie, 'id'>>(
    itemCieCollection: Type[],
    ...itemCiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const itemCies: Type[] = itemCiesToCheck.filter(isPresent);
    if (itemCies.length > 0) {
      const itemCieCollectionIdentifiers = itemCieCollection.map(itemCieItem => this.getItemCieIdentifier(itemCieItem)!);
      const itemCiesToAdd = itemCies.filter(itemCieItem => {
        const itemCieIdentifier = this.getItemCieIdentifier(itemCieItem);
        if (itemCieCollectionIdentifiers.includes(itemCieIdentifier)) {
          return false;
        }
        itemCieCollectionIdentifiers.push(itemCieIdentifier);
        return true;
      });
      return [...itemCiesToAdd, ...itemCieCollection];
    }
    return itemCieCollection;
  }
}
