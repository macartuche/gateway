import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITerapia, NewTerapia } from '../terapia.model';

export type PartialUpdateTerapia = Partial<ITerapia> & Pick<ITerapia, 'id'>;

export type EntityResponseType = HttpResponse<ITerapia>;
export type EntityArrayResponseType = HttpResponse<ITerapia[]>;

@Injectable({ providedIn: 'root' })
export class TerapiaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/terapias', 'serviciosmedicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(terapia: NewTerapia): Observable<EntityResponseType> {
    return this.http.post<ITerapia>(this.resourceUrl, terapia, { observe: 'response' });
  }

  update(terapia: ITerapia): Observable<EntityResponseType> {
    return this.http.put<ITerapia>(`${this.resourceUrl}/${this.getTerapiaIdentifier(terapia)}`, terapia, { observe: 'response' });
  }

  partialUpdate(terapia: PartialUpdateTerapia): Observable<EntityResponseType> {
    return this.http.patch<ITerapia>(`${this.resourceUrl}/${this.getTerapiaIdentifier(terapia)}`, terapia, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITerapia>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITerapia[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTerapiaIdentifier(terapia: Pick<ITerapia, 'id'>): number {
    return terapia.id;
  }

  compareTerapia(o1: Pick<ITerapia, 'id'> | null, o2: Pick<ITerapia, 'id'> | null): boolean {
    return o1 && o2 ? this.getTerapiaIdentifier(o1) === this.getTerapiaIdentifier(o2) : o1 === o2;
  }

  addTerapiaToCollectionIfMissing<Type extends Pick<ITerapia, 'id'>>(
    terapiaCollection: Type[],
    ...terapiasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const terapias: Type[] = terapiasToCheck.filter(isPresent);
    if (terapias.length > 0) {
      const terapiaCollectionIdentifiers = terapiaCollection.map(terapiaItem => this.getTerapiaIdentifier(terapiaItem)!);
      const terapiasToAdd = terapias.filter(terapiaItem => {
        const terapiaIdentifier = this.getTerapiaIdentifier(terapiaItem);
        if (terapiaCollectionIdentifiers.includes(terapiaIdentifier)) {
          return false;
        }
        terapiaCollectionIdentifiers.push(terapiaIdentifier);
        return true;
      });
      return [...terapiasToAdd, ...terapiaCollection];
    }
    return terapiaCollection;
  }
}
