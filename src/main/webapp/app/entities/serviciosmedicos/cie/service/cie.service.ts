import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICie, NewCie } from '../cie.model';

export type PartialUpdateCie = Partial<ICie> & Pick<ICie, 'id'>;

export type EntityResponseType = HttpResponse<ICie>;
export type EntityArrayResponseType = HttpResponse<ICie[]>;

@Injectable({ providedIn: 'root' })
export class CieService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cies', 'serviciosmedicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(cie: NewCie): Observable<EntityResponseType> {
    return this.http.post<ICie>(this.resourceUrl, cie, { observe: 'response' });
  }

  update(cie: ICie): Observable<EntityResponseType> {
    return this.http.put<ICie>(`${this.resourceUrl}/${this.getCieIdentifier(cie)}`, cie, { observe: 'response' });
  }

  partialUpdate(cie: PartialUpdateCie): Observable<EntityResponseType> {
    return this.http.patch<ICie>(`${this.resourceUrl}/${this.getCieIdentifier(cie)}`, cie, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICie[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCieIdentifier(cie: Pick<ICie, 'id'>): number {
    return cie.id;
  }

  compareCie(o1: Pick<ICie, 'id'> | null, o2: Pick<ICie, 'id'> | null): boolean {
    return o1 && o2 ? this.getCieIdentifier(o1) === this.getCieIdentifier(o2) : o1 === o2;
  }

  addCieToCollectionIfMissing<Type extends Pick<ICie, 'id'>>(cieCollection: Type[], ...ciesToCheck: (Type | null | undefined)[]): Type[] {
    const cies: Type[] = ciesToCheck.filter(isPresent);
    if (cies.length > 0) {
      const cieCollectionIdentifiers = cieCollection.map(cieItem => this.getCieIdentifier(cieItem)!);
      const ciesToAdd = cies.filter(cieItem => {
        const cieIdentifier = this.getCieIdentifier(cieItem);
        if (cieCollectionIdentifiers.includes(cieIdentifier)) {
          return false;
        }
        cieCollectionIdentifiers.push(cieIdentifier);
        return true;
      });
      return [...ciesToAdd, ...cieCollection];
    }
    return cieCollection;
  }
}
