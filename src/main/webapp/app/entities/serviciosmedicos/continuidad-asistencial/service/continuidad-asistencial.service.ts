import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IContinuidadAsistencial, NewContinuidadAsistencial } from '../continuidad-asistencial.model';

export type PartialUpdateContinuidadAsistencial = Partial<IContinuidadAsistencial> & Pick<IContinuidadAsistencial, 'id'>;

export type EntityResponseType = HttpResponse<IContinuidadAsistencial>;
export type EntityArrayResponseType = HttpResponse<IContinuidadAsistencial[]>;

@Injectable({ providedIn: 'root' })
export class ContinuidadAsistencialService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/continuidad-asistencials', 'serviciosmedicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(continuidadAsistencial: NewContinuidadAsistencial): Observable<EntityResponseType> {
    return this.http.post<IContinuidadAsistencial>(this.resourceUrl, continuidadAsistencial, { observe: 'response' });
  }

  update(continuidadAsistencial: IContinuidadAsistencial): Observable<EntityResponseType> {
    return this.http.put<IContinuidadAsistencial>(
      `${this.resourceUrl}/${this.getContinuidadAsistencialIdentifier(continuidadAsistencial)}`,
      continuidadAsistencial,
      { observe: 'response' },
    );
  }

  partialUpdate(continuidadAsistencial: PartialUpdateContinuidadAsistencial): Observable<EntityResponseType> {
    return this.http.patch<IContinuidadAsistencial>(
      `${this.resourceUrl}/${this.getContinuidadAsistencialIdentifier(continuidadAsistencial)}`,
      continuidadAsistencial,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContinuidadAsistencial>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContinuidadAsistencial[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getContinuidadAsistencialIdentifier(continuidadAsistencial: Pick<IContinuidadAsistencial, 'id'>): number {
    return continuidadAsistencial.id;
  }

  compareContinuidadAsistencial(o1: Pick<IContinuidadAsistencial, 'id'> | null, o2: Pick<IContinuidadAsistencial, 'id'> | null): boolean {
    return o1 && o2 ? this.getContinuidadAsistencialIdentifier(o1) === this.getContinuidadAsistencialIdentifier(o2) : o1 === o2;
  }

  addContinuidadAsistencialToCollectionIfMissing<Type extends Pick<IContinuidadAsistencial, 'id'>>(
    continuidadAsistencialCollection: Type[],
    ...continuidadAsistencialsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const continuidadAsistencials: Type[] = continuidadAsistencialsToCheck.filter(isPresent);
    if (continuidadAsistencials.length > 0) {
      const continuidadAsistencialCollectionIdentifiers = continuidadAsistencialCollection.map(
        continuidadAsistencialItem => this.getContinuidadAsistencialIdentifier(continuidadAsistencialItem)!,
      );
      const continuidadAsistencialsToAdd = continuidadAsistencials.filter(continuidadAsistencialItem => {
        const continuidadAsistencialIdentifier = this.getContinuidadAsistencialIdentifier(continuidadAsistencialItem);
        if (continuidadAsistencialCollectionIdentifiers.includes(continuidadAsistencialIdentifier)) {
          return false;
        }
        continuidadAsistencialCollectionIdentifiers.push(continuidadAsistencialIdentifier);
        return true;
      });
      return [...continuidadAsistencialsToAdd, ...continuidadAsistencialCollection];
    }
    return continuidadAsistencialCollection;
  }
}
