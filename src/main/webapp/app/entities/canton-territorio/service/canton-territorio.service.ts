import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICantonTerritorio, NewCantonTerritorio } from '../canton-territorio.model';

export type PartialUpdateCantonTerritorio = Partial<ICantonTerritorio> & Pick<ICantonTerritorio, 'id'>;

export type EntityResponseType = HttpResponse<ICantonTerritorio>;
export type EntityArrayResponseType = HttpResponse<ICantonTerritorio[]>;

@Injectable({ providedIn: 'root' })
export class CantonTerritorioService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/canton-territorios');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(cantonTerritorio: NewCantonTerritorio): Observable<EntityResponseType> {
    return this.http.post<ICantonTerritorio>(this.resourceUrl, cantonTerritorio, { observe: 'response' });
  }

  update(cantonTerritorio: ICantonTerritorio): Observable<EntityResponseType> {
    return this.http.put<ICantonTerritorio>(
      `${this.resourceUrl}/${this.getCantonTerritorioIdentifier(cantonTerritorio)}`,
      cantonTerritorio,
      { observe: 'response' },
    );
  }

  partialUpdate(cantonTerritorio: PartialUpdateCantonTerritorio): Observable<EntityResponseType> {
    return this.http.patch<ICantonTerritorio>(
      `${this.resourceUrl}/${this.getCantonTerritorioIdentifier(cantonTerritorio)}`,
      cantonTerritorio,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICantonTerritorio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICantonTerritorio[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCantonTerritorioIdentifier(cantonTerritorio: Pick<ICantonTerritorio, 'id'>): number {
    return cantonTerritorio.id;
  }

  compareCantonTerritorio(o1: Pick<ICantonTerritorio, 'id'> | null, o2: Pick<ICantonTerritorio, 'id'> | null): boolean {
    return o1 && o2 ? this.getCantonTerritorioIdentifier(o1) === this.getCantonTerritorioIdentifier(o2) : o1 === o2;
  }

  addCantonTerritorioToCollectionIfMissing<Type extends Pick<ICantonTerritorio, 'id'>>(
    cantonTerritorioCollection: Type[],
    ...cantonTerritoriosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cantonTerritorios: Type[] = cantonTerritoriosToCheck.filter(isPresent);
    if (cantonTerritorios.length > 0) {
      const cantonTerritorioCollectionIdentifiers = cantonTerritorioCollection.map(
        cantonTerritorioItem => this.getCantonTerritorioIdentifier(cantonTerritorioItem)!,
      );
      const cantonTerritoriosToAdd = cantonTerritorios.filter(cantonTerritorioItem => {
        const cantonTerritorioIdentifier = this.getCantonTerritorioIdentifier(cantonTerritorioItem);
        if (cantonTerritorioCollectionIdentifiers.includes(cantonTerritorioIdentifier)) {
          return false;
        }
        cantonTerritorioCollectionIdentifiers.push(cantonTerritorioIdentifier);
        return true;
      });
      return [...cantonTerritoriosToAdd, ...cantonTerritorioCollection];
    }
    return cantonTerritorioCollection;
  }
}
