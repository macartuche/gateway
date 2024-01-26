import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INivelEstablecimiento, NewNivelEstablecimiento } from '../nivel-establecimiento.model';

export type PartialUpdateNivelEstablecimiento = Partial<INivelEstablecimiento> & Pick<INivelEstablecimiento, 'id'>;

export type EntityResponseType = HttpResponse<INivelEstablecimiento>;
export type EntityArrayResponseType = HttpResponse<INivelEstablecimiento[]>;

@Injectable({ providedIn: 'root' })
export class NivelEstablecimientoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/nivel-establecimientos', 'establecimientos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(nivelEstablecimiento: NewNivelEstablecimiento): Observable<EntityResponseType> {
    return this.http.post<INivelEstablecimiento>(this.resourceUrl, nivelEstablecimiento, { observe: 'response' });
  }

  update(nivelEstablecimiento: INivelEstablecimiento): Observable<EntityResponseType> {
    return this.http.put<INivelEstablecimiento>(
      `${this.resourceUrl}/${this.getNivelEstablecimientoIdentifier(nivelEstablecimiento)}`,
      nivelEstablecimiento,
      { observe: 'response' },
    );
  }

  partialUpdate(nivelEstablecimiento: PartialUpdateNivelEstablecimiento): Observable<EntityResponseType> {
    return this.http.patch<INivelEstablecimiento>(
      `${this.resourceUrl}/${this.getNivelEstablecimientoIdentifier(nivelEstablecimiento)}`,
      nivelEstablecimiento,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INivelEstablecimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INivelEstablecimiento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getNivelEstablecimientoIdentifier(nivelEstablecimiento: Pick<INivelEstablecimiento, 'id'>): number {
    return nivelEstablecimiento.id;
  }

  compareNivelEstablecimiento(o1: Pick<INivelEstablecimiento, 'id'> | null, o2: Pick<INivelEstablecimiento, 'id'> | null): boolean {
    return o1 && o2 ? this.getNivelEstablecimientoIdentifier(o1) === this.getNivelEstablecimientoIdentifier(o2) : o1 === o2;
  }

  addNivelEstablecimientoToCollectionIfMissing<Type extends Pick<INivelEstablecimiento, 'id'>>(
    nivelEstablecimientoCollection: Type[],
    ...nivelEstablecimientosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const nivelEstablecimientos: Type[] = nivelEstablecimientosToCheck.filter(isPresent);
    if (nivelEstablecimientos.length > 0) {
      const nivelEstablecimientoCollectionIdentifiers = nivelEstablecimientoCollection.map(
        nivelEstablecimientoItem => this.getNivelEstablecimientoIdentifier(nivelEstablecimientoItem)!,
      );
      const nivelEstablecimientosToAdd = nivelEstablecimientos.filter(nivelEstablecimientoItem => {
        const nivelEstablecimientoIdentifier = this.getNivelEstablecimientoIdentifier(nivelEstablecimientoItem);
        if (nivelEstablecimientoCollectionIdentifiers.includes(nivelEstablecimientoIdentifier)) {
          return false;
        }
        nivelEstablecimientoCollectionIdentifiers.push(nivelEstablecimientoIdentifier);
        return true;
      });
      return [...nivelEstablecimientosToAdd, ...nivelEstablecimientoCollection];
    }
    return nivelEstablecimientoCollection;
  }
}
