import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IZona, NewZona } from '../zona.model';

export type PartialUpdateZona = Partial<IZona> & Pick<IZona, 'id'>;

export type EntityResponseType = HttpResponse<IZona>;
export type EntityArrayResponseType = HttpResponse<IZona[]>;

@Injectable({ providedIn: 'root' })
export class ZonaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/zonas', 'establecimientos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(zona: NewZona): Observable<EntityResponseType> {
    return this.http.post<IZona>(this.resourceUrl, zona, { observe: 'response' });
  }

  update(zona: IZona): Observable<EntityResponseType> {
    return this.http.put<IZona>(`${this.resourceUrl}/${this.getZonaIdentifier(zona)}`, zona, { observe: 'response' });
  }

  partialUpdate(zona: PartialUpdateZona): Observable<EntityResponseType> {
    return this.http.patch<IZona>(`${this.resourceUrl}/${this.getZonaIdentifier(zona)}`, zona, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IZona>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IZona[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getZonaIdentifier(zona: Pick<IZona, 'id'>): number {
    return zona.id;
  }

  compareZona(o1: Pick<IZona, 'id'> | null, o2: Pick<IZona, 'id'> | null): boolean {
    return o1 && o2 ? this.getZonaIdentifier(o1) === this.getZonaIdentifier(o2) : o1 === o2;
  }

  addZonaToCollectionIfMissing<Type extends Pick<IZona, 'id'>>(
    zonaCollection: Type[],
    ...zonasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const zonas: Type[] = zonasToCheck.filter(isPresent);
    if (zonas.length > 0) {
      const zonaCollectionIdentifiers = zonaCollection.map(zonaItem => this.getZonaIdentifier(zonaItem)!);
      const zonasToAdd = zonas.filter(zonaItem => {
        const zonaIdentifier = this.getZonaIdentifier(zonaItem);
        if (zonaCollectionIdentifiers.includes(zonaIdentifier)) {
          return false;
        }
        zonaCollectionIdentifiers.push(zonaIdentifier);
        return true;
      });
      return [...zonasToAdd, ...zonaCollection];
    }
    return zonaCollection;
  }
}
