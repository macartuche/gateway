import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITramite, NewTramite } from '../tramite.model';

export type PartialUpdateTramite = Partial<ITramite> & Pick<ITramite, 'id'>;

export type EntityResponseType = HttpResponse<ITramite>;
export type EntityArrayResponseType = HttpResponse<ITramite[]>;

@Injectable({ providedIn: 'root' })
export class TramiteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tramites', 'serviciosmedicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(tramite: NewTramite): Observable<EntityResponseType> {
    return this.http.post<ITramite>(this.resourceUrl, tramite, { observe: 'response' });
  }

  update(tramite: ITramite): Observable<EntityResponseType> {
    return this.http.put<ITramite>(`${this.resourceUrl}/${this.getTramiteIdentifier(tramite)}`, tramite, { observe: 'response' });
  }

  partialUpdate(tramite: PartialUpdateTramite): Observable<EntityResponseType> {
    return this.http.patch<ITramite>(`${this.resourceUrl}/${this.getTramiteIdentifier(tramite)}`, tramite, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITramite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITramite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTramiteIdentifier(tramite: Pick<ITramite, 'id'>): number {
    return tramite.id;
  }

  compareTramite(o1: Pick<ITramite, 'id'> | null, o2: Pick<ITramite, 'id'> | null): boolean {
    return o1 && o2 ? this.getTramiteIdentifier(o1) === this.getTramiteIdentifier(o2) : o1 === o2;
  }

  addTramiteToCollectionIfMissing<Type extends Pick<ITramite, 'id'>>(
    tramiteCollection: Type[],
    ...tramitesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tramites: Type[] = tramitesToCheck.filter(isPresent);
    if (tramites.length > 0) {
      const tramiteCollectionIdentifiers = tramiteCollection.map(tramiteItem => this.getTramiteIdentifier(tramiteItem)!);
      const tramitesToAdd = tramites.filter(tramiteItem => {
        const tramiteIdentifier = this.getTramiteIdentifier(tramiteItem);
        if (tramiteCollectionIdentifiers.includes(tramiteIdentifier)) {
          return false;
        }
        tramiteCollectionIdentifiers.push(tramiteIdentifier);
        return true;
      });
      return [...tramitesToAdd, ...tramiteCollection];
    }
    return tramiteCollection;
  }
}
