import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoEstablecimiento, NewTipoEstablecimiento } from '../tipo-establecimiento.model';

export type PartialUpdateTipoEstablecimiento = Partial<ITipoEstablecimiento> & Pick<ITipoEstablecimiento, 'id'>;

export type EntityResponseType = HttpResponse<ITipoEstablecimiento>;
export type EntityArrayResponseType = HttpResponse<ITipoEstablecimiento[]>;

@Injectable({ providedIn: 'root' })
export class TipoEstablecimientoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-establecimientos', 'establecimientos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(tipoEstablecimiento: NewTipoEstablecimiento): Observable<EntityResponseType> {
    return this.http.post<ITipoEstablecimiento>(this.resourceUrl, tipoEstablecimiento, { observe: 'response' });
  }

  update(tipoEstablecimiento: ITipoEstablecimiento): Observable<EntityResponseType> {
    return this.http.put<ITipoEstablecimiento>(
      `${this.resourceUrl}/${this.getTipoEstablecimientoIdentifier(tipoEstablecimiento)}`,
      tipoEstablecimiento,
      { observe: 'response' },
    );
  }

  partialUpdate(tipoEstablecimiento: PartialUpdateTipoEstablecimiento): Observable<EntityResponseType> {
    return this.http.patch<ITipoEstablecimiento>(
      `${this.resourceUrl}/${this.getTipoEstablecimientoIdentifier(tipoEstablecimiento)}`,
      tipoEstablecimiento,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoEstablecimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoEstablecimiento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTipoEstablecimientoIdentifier(tipoEstablecimiento: Pick<ITipoEstablecimiento, 'id'>): number {
    return tipoEstablecimiento.id;
  }

  compareTipoEstablecimiento(o1: Pick<ITipoEstablecimiento, 'id'> | null, o2: Pick<ITipoEstablecimiento, 'id'> | null): boolean {
    return o1 && o2 ? this.getTipoEstablecimientoIdentifier(o1) === this.getTipoEstablecimientoIdentifier(o2) : o1 === o2;
  }

  addTipoEstablecimientoToCollectionIfMissing<Type extends Pick<ITipoEstablecimiento, 'id'>>(
    tipoEstablecimientoCollection: Type[],
    ...tipoEstablecimientosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tipoEstablecimientos: Type[] = tipoEstablecimientosToCheck.filter(isPresent);
    if (tipoEstablecimientos.length > 0) {
      const tipoEstablecimientoCollectionIdentifiers = tipoEstablecimientoCollection.map(
        tipoEstablecimientoItem => this.getTipoEstablecimientoIdentifier(tipoEstablecimientoItem)!,
      );
      const tipoEstablecimientosToAdd = tipoEstablecimientos.filter(tipoEstablecimientoItem => {
        const tipoEstablecimientoIdentifier = this.getTipoEstablecimientoIdentifier(tipoEstablecimientoItem);
        if (tipoEstablecimientoCollectionIdentifiers.includes(tipoEstablecimientoIdentifier)) {
          return false;
        }
        tipoEstablecimientoCollectionIdentifiers.push(tipoEstablecimientoIdentifier);
        return true;
      });
      return [...tipoEstablecimientosToAdd, ...tipoEstablecimientoCollection];
    }
    return tipoEstablecimientoCollection;
  }
}
