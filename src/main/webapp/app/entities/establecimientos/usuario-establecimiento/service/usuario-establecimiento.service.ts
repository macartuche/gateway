import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUsuarioEstablecimiento, NewUsuarioEstablecimiento } from '../usuario-establecimiento.model';

export type PartialUpdateUsuarioEstablecimiento = Partial<IUsuarioEstablecimiento> & Pick<IUsuarioEstablecimiento, 'id'>;

export type EntityResponseType = HttpResponse<IUsuarioEstablecimiento>;
export type EntityArrayResponseType = HttpResponse<IUsuarioEstablecimiento[]>;

@Injectable({ providedIn: 'root' })
export class UsuarioEstablecimientoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/usuario-establecimientos', 'establecimientos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(usuarioEstablecimiento: NewUsuarioEstablecimiento): Observable<EntityResponseType> {
    return this.http.post<IUsuarioEstablecimiento>(this.resourceUrl, usuarioEstablecimiento, { observe: 'response' });
  }

  update(usuarioEstablecimiento: IUsuarioEstablecimiento): Observable<EntityResponseType> {
    return this.http.put<IUsuarioEstablecimiento>(
      `${this.resourceUrl}/${this.getUsuarioEstablecimientoIdentifier(usuarioEstablecimiento)}`,
      usuarioEstablecimiento,
      { observe: 'response' },
    );
  }

  partialUpdate(usuarioEstablecimiento: PartialUpdateUsuarioEstablecimiento): Observable<EntityResponseType> {
    return this.http.patch<IUsuarioEstablecimiento>(
      `${this.resourceUrl}/${this.getUsuarioEstablecimientoIdentifier(usuarioEstablecimiento)}`,
      usuarioEstablecimiento,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUsuarioEstablecimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUsuarioEstablecimiento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUsuarioEstablecimientoIdentifier(usuarioEstablecimiento: Pick<IUsuarioEstablecimiento, 'id'>): number {
    return usuarioEstablecimiento.id;
  }

  compareUsuarioEstablecimiento(o1: Pick<IUsuarioEstablecimiento, 'id'> | null, o2: Pick<IUsuarioEstablecimiento, 'id'> | null): boolean {
    return o1 && o2 ? this.getUsuarioEstablecimientoIdentifier(o1) === this.getUsuarioEstablecimientoIdentifier(o2) : o1 === o2;
  }

  addUsuarioEstablecimientoToCollectionIfMissing<Type extends Pick<IUsuarioEstablecimiento, 'id'>>(
    usuarioEstablecimientoCollection: Type[],
    ...usuarioEstablecimientosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const usuarioEstablecimientos: Type[] = usuarioEstablecimientosToCheck.filter(isPresent);
    if (usuarioEstablecimientos.length > 0) {
      const usuarioEstablecimientoCollectionIdentifiers = usuarioEstablecimientoCollection.map(
        usuarioEstablecimientoItem => this.getUsuarioEstablecimientoIdentifier(usuarioEstablecimientoItem)!,
      );
      const usuarioEstablecimientosToAdd = usuarioEstablecimientos.filter(usuarioEstablecimientoItem => {
        const usuarioEstablecimientoIdentifier = this.getUsuarioEstablecimientoIdentifier(usuarioEstablecimientoItem);
        if (usuarioEstablecimientoCollectionIdentifiers.includes(usuarioEstablecimientoIdentifier)) {
          return false;
        }
        usuarioEstablecimientoCollectionIdentifiers.push(usuarioEstablecimientoIdentifier);
        return true;
      });
      return [...usuarioEstablecimientosToAdd, ...usuarioEstablecimientoCollection];
    }
    return usuarioEstablecimientoCollection;
  }
}
