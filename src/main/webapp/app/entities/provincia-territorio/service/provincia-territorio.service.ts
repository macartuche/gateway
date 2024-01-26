import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProvinciaTerritorio, NewProvinciaTerritorio } from '../provincia-territorio.model';

export type PartialUpdateProvinciaTerritorio = Partial<IProvinciaTerritorio> & Pick<IProvinciaTerritorio, 'id'>;

export type EntityResponseType = HttpResponse<IProvinciaTerritorio>;
export type EntityArrayResponseType = HttpResponse<IProvinciaTerritorio[]>;

@Injectable({ providedIn: 'root' })
export class ProvinciaTerritorioService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/provincia-territorios');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(provinciaTerritorio: NewProvinciaTerritorio): Observable<EntityResponseType> {
    return this.http.post<IProvinciaTerritorio>(this.resourceUrl, provinciaTerritorio, { observe: 'response' });
  }

  update(provinciaTerritorio: IProvinciaTerritorio): Observable<EntityResponseType> {
    return this.http.put<IProvinciaTerritorio>(
      `${this.resourceUrl}/${this.getProvinciaTerritorioIdentifier(provinciaTerritorio)}`,
      provinciaTerritorio,
      { observe: 'response' },
    );
  }

  partialUpdate(provinciaTerritorio: PartialUpdateProvinciaTerritorio): Observable<EntityResponseType> {
    return this.http.patch<IProvinciaTerritorio>(
      `${this.resourceUrl}/${this.getProvinciaTerritorioIdentifier(provinciaTerritorio)}`,
      provinciaTerritorio,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProvinciaTerritorio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProvinciaTerritorio[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProvinciaTerritorioIdentifier(provinciaTerritorio: Pick<IProvinciaTerritorio, 'id'>): number {
    return provinciaTerritorio.id;
  }

  compareProvinciaTerritorio(o1: Pick<IProvinciaTerritorio, 'id'> | null, o2: Pick<IProvinciaTerritorio, 'id'> | null): boolean {
    return o1 && o2 ? this.getProvinciaTerritorioIdentifier(o1) === this.getProvinciaTerritorioIdentifier(o2) : o1 === o2;
  }

  addProvinciaTerritorioToCollectionIfMissing<Type extends Pick<IProvinciaTerritorio, 'id'>>(
    provinciaTerritorioCollection: Type[],
    ...provinciaTerritoriosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const provinciaTerritorios: Type[] = provinciaTerritoriosToCheck.filter(isPresent);
    if (provinciaTerritorios.length > 0) {
      const provinciaTerritorioCollectionIdentifiers = provinciaTerritorioCollection.map(
        provinciaTerritorioItem => this.getProvinciaTerritorioIdentifier(provinciaTerritorioItem)!,
      );
      const provinciaTerritoriosToAdd = provinciaTerritorios.filter(provinciaTerritorioItem => {
        const provinciaTerritorioIdentifier = this.getProvinciaTerritorioIdentifier(provinciaTerritorioItem);
        if (provinciaTerritorioCollectionIdentifiers.includes(provinciaTerritorioIdentifier)) {
          return false;
        }
        provinciaTerritorioCollectionIdentifiers.push(provinciaTerritorioIdentifier);
        return true;
      });
      return [...provinciaTerritoriosToAdd, ...provinciaTerritorioCollection];
    }
    return provinciaTerritorioCollection;
  }
}
