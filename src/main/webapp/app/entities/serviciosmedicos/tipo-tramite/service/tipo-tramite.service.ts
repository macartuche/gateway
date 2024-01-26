import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoTramite, NewTipoTramite } from '../tipo-tramite.model';

export type PartialUpdateTipoTramite = Partial<ITipoTramite> & Pick<ITipoTramite, 'id'>;

export type EntityResponseType = HttpResponse<ITipoTramite>;
export type EntityArrayResponseType = HttpResponse<ITipoTramite[]>;

@Injectable({ providedIn: 'root' })
export class TipoTramiteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-tramites', 'serviciosmedicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(tipoTramite: NewTipoTramite): Observable<EntityResponseType> {
    return this.http.post<ITipoTramite>(this.resourceUrl, tipoTramite, { observe: 'response' });
  }

  update(tipoTramite: ITipoTramite): Observable<EntityResponseType> {
    return this.http.put<ITipoTramite>(`${this.resourceUrl}/${this.getTipoTramiteIdentifier(tipoTramite)}`, tipoTramite, {
      observe: 'response',
    });
  }

  partialUpdate(tipoTramite: PartialUpdateTipoTramite): Observable<EntityResponseType> {
    return this.http.patch<ITipoTramite>(`${this.resourceUrl}/${this.getTipoTramiteIdentifier(tipoTramite)}`, tipoTramite, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoTramite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoTramite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTipoTramiteIdentifier(tipoTramite: Pick<ITipoTramite, 'id'>): number {
    return tipoTramite.id;
  }

  compareTipoTramite(o1: Pick<ITipoTramite, 'id'> | null, o2: Pick<ITipoTramite, 'id'> | null): boolean {
    return o1 && o2 ? this.getTipoTramiteIdentifier(o1) === this.getTipoTramiteIdentifier(o2) : o1 === o2;
  }

  addTipoTramiteToCollectionIfMissing<Type extends Pick<ITipoTramite, 'id'>>(
    tipoTramiteCollection: Type[],
    ...tipoTramitesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tipoTramites: Type[] = tipoTramitesToCheck.filter(isPresent);
    if (tipoTramites.length > 0) {
      const tipoTramiteCollectionIdentifiers = tipoTramiteCollection.map(
        tipoTramiteItem => this.getTipoTramiteIdentifier(tipoTramiteItem)!,
      );
      const tipoTramitesToAdd = tipoTramites.filter(tipoTramiteItem => {
        const tipoTramiteIdentifier = this.getTipoTramiteIdentifier(tipoTramiteItem);
        if (tipoTramiteCollectionIdentifiers.includes(tipoTramiteIdentifier)) {
          return false;
        }
        tipoTramiteCollectionIdentifiers.push(tipoTramiteIdentifier);
        return true;
      });
      return [...tipoTramitesToAdd, ...tipoTramiteCollection];
    }
    return tipoTramiteCollection;
  }
}
