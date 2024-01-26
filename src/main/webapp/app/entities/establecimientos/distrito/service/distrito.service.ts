import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDistrito, NewDistrito } from '../distrito.model';

export type PartialUpdateDistrito = Partial<IDistrito> & Pick<IDistrito, 'id'>;

export type EntityResponseType = HttpResponse<IDistrito>;
export type EntityArrayResponseType = HttpResponse<IDistrito[]>;

@Injectable({ providedIn: 'root' })
export class DistritoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/distritos', 'establecimientos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(distrito: NewDistrito): Observable<EntityResponseType> {
    return this.http.post<IDistrito>(this.resourceUrl, distrito, { observe: 'response' });
  }

  update(distrito: IDistrito): Observable<EntityResponseType> {
    return this.http.put<IDistrito>(`${this.resourceUrl}/${this.getDistritoIdentifier(distrito)}`, distrito, { observe: 'response' });
  }

  partialUpdate(distrito: PartialUpdateDistrito): Observable<EntityResponseType> {
    return this.http.patch<IDistrito>(`${this.resourceUrl}/${this.getDistritoIdentifier(distrito)}`, distrito, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDistrito>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDistrito[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDistritoIdentifier(distrito: Pick<IDistrito, 'id'>): number {
    return distrito.id;
  }

  compareDistrito(o1: Pick<IDistrito, 'id'> | null, o2: Pick<IDistrito, 'id'> | null): boolean {
    return o1 && o2 ? this.getDistritoIdentifier(o1) === this.getDistritoIdentifier(o2) : o1 === o2;
  }

  addDistritoToCollectionIfMissing<Type extends Pick<IDistrito, 'id'>>(
    distritoCollection: Type[],
    ...distritosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const distritos: Type[] = distritosToCheck.filter(isPresent);
    if (distritos.length > 0) {
      const distritoCollectionIdentifiers = distritoCollection.map(distritoItem => this.getDistritoIdentifier(distritoItem)!);
      const distritosToAdd = distritos.filter(distritoItem => {
        const distritoIdentifier = this.getDistritoIdentifier(distritoItem);
        if (distritoCollectionIdentifiers.includes(distritoIdentifier)) {
          return false;
        }
        distritoCollectionIdentifiers.push(distritoIdentifier);
        return true;
      });
      return [...distritosToAdd, ...distritoCollection];
    }
    return distritoCollection;
  }
}
