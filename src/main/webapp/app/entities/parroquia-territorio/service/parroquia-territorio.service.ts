import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IParroquiaTerritorio, NewParroquiaTerritorio } from '../parroquia-territorio.model';

export type PartialUpdateParroquiaTerritorio = Partial<IParroquiaTerritorio> & Pick<IParroquiaTerritorio, 'id'>;

export type EntityResponseType = HttpResponse<IParroquiaTerritorio>;
export type EntityArrayResponseType = HttpResponse<IParroquiaTerritorio[]>;

@Injectable({ providedIn: 'root' })
export class ParroquiaTerritorioService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/parroquia-territorios');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(parroquiaTerritorio: NewParroquiaTerritorio): Observable<EntityResponseType> {
    return this.http.post<IParroquiaTerritorio>(this.resourceUrl, parroquiaTerritorio, { observe: 'response' });
  }

  update(parroquiaTerritorio: IParroquiaTerritorio): Observable<EntityResponseType> {
    return this.http.put<IParroquiaTerritorio>(
      `${this.resourceUrl}/${this.getParroquiaTerritorioIdentifier(parroquiaTerritorio)}`,
      parroquiaTerritorio,
      { observe: 'response' },
    );
  }

  partialUpdate(parroquiaTerritorio: PartialUpdateParroquiaTerritorio): Observable<EntityResponseType> {
    return this.http.patch<IParroquiaTerritorio>(
      `${this.resourceUrl}/${this.getParroquiaTerritorioIdentifier(parroquiaTerritorio)}`,
      parroquiaTerritorio,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParroquiaTerritorio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParroquiaTerritorio[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getParroquiaTerritorioIdentifier(parroquiaTerritorio: Pick<IParroquiaTerritorio, 'id'>): number {
    return parroquiaTerritorio.id;
  }

  compareParroquiaTerritorio(o1: Pick<IParroquiaTerritorio, 'id'> | null, o2: Pick<IParroquiaTerritorio, 'id'> | null): boolean {
    return o1 && o2 ? this.getParroquiaTerritorioIdentifier(o1) === this.getParroquiaTerritorioIdentifier(o2) : o1 === o2;
  }

  addParroquiaTerritorioToCollectionIfMissing<Type extends Pick<IParroquiaTerritorio, 'id'>>(
    parroquiaTerritorioCollection: Type[],
    ...parroquiaTerritoriosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const parroquiaTerritorios: Type[] = parroquiaTerritoriosToCheck.filter(isPresent);
    if (parroquiaTerritorios.length > 0) {
      const parroquiaTerritorioCollectionIdentifiers = parroquiaTerritorioCollection.map(
        parroquiaTerritorioItem => this.getParroquiaTerritorioIdentifier(parroquiaTerritorioItem)!,
      );
      const parroquiaTerritoriosToAdd = parroquiaTerritorios.filter(parroquiaTerritorioItem => {
        const parroquiaTerritorioIdentifier = this.getParroquiaTerritorioIdentifier(parroquiaTerritorioItem);
        if (parroquiaTerritorioCollectionIdentifiers.includes(parroquiaTerritorioIdentifier)) {
          return false;
        }
        parroquiaTerritorioCollectionIdentifiers.push(parroquiaTerritorioIdentifier);
        return true;
      });
      return [...parroquiaTerritoriosToAdd, ...parroquiaTerritorioCollection];
    }
    return parroquiaTerritorioCollection;
  }
}
