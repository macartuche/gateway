import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDocumentoTramite, NewDocumentoTramite } from '../documento-tramite.model';

export type PartialUpdateDocumentoTramite = Partial<IDocumentoTramite> & Pick<IDocumentoTramite, 'id'>;

type RestOf<T extends IDocumentoTramite | NewDocumentoTramite> = Omit<T, 'fecha'> & {
  fecha?: string | null;
};

export type RestDocumentoTramite = RestOf<IDocumentoTramite>;

export type NewRestDocumentoTramite = RestOf<NewDocumentoTramite>;

export type PartialUpdateRestDocumentoTramite = RestOf<PartialUpdateDocumentoTramite>;

export type EntityResponseType = HttpResponse<IDocumentoTramite>;
export type EntityArrayResponseType = HttpResponse<IDocumentoTramite[]>;

@Injectable({ providedIn: 'root' })
export class DocumentoTramiteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/documento-tramites', 'serviciosmedicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(documentoTramite: NewDocumentoTramite): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(documentoTramite);
    return this.http
      .post<RestDocumentoTramite>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(documentoTramite: IDocumentoTramite): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(documentoTramite);
    return this.http
      .put<RestDocumentoTramite>(`${this.resourceUrl}/${this.getDocumentoTramiteIdentifier(documentoTramite)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(documentoTramite: PartialUpdateDocumentoTramite): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(documentoTramite);
    return this.http
      .patch<RestDocumentoTramite>(`${this.resourceUrl}/${this.getDocumentoTramiteIdentifier(documentoTramite)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDocumentoTramite>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDocumentoTramite[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDocumentoTramiteIdentifier(documentoTramite: Pick<IDocumentoTramite, 'id'>): number {
    return documentoTramite.id;
  }

  compareDocumentoTramite(o1: Pick<IDocumentoTramite, 'id'> | null, o2: Pick<IDocumentoTramite, 'id'> | null): boolean {
    return o1 && o2 ? this.getDocumentoTramiteIdentifier(o1) === this.getDocumentoTramiteIdentifier(o2) : o1 === o2;
  }

  addDocumentoTramiteToCollectionIfMissing<Type extends Pick<IDocumentoTramite, 'id'>>(
    documentoTramiteCollection: Type[],
    ...documentoTramitesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const documentoTramites: Type[] = documentoTramitesToCheck.filter(isPresent);
    if (documentoTramites.length > 0) {
      const documentoTramiteCollectionIdentifiers = documentoTramiteCollection.map(
        documentoTramiteItem => this.getDocumentoTramiteIdentifier(documentoTramiteItem)!,
      );
      const documentoTramitesToAdd = documentoTramites.filter(documentoTramiteItem => {
        const documentoTramiteIdentifier = this.getDocumentoTramiteIdentifier(documentoTramiteItem);
        if (documentoTramiteCollectionIdentifiers.includes(documentoTramiteIdentifier)) {
          return false;
        }
        documentoTramiteCollectionIdentifiers.push(documentoTramiteIdentifier);
        return true;
      });
      return [...documentoTramitesToAdd, ...documentoTramiteCollection];
    }
    return documentoTramiteCollection;
  }

  protected convertDateFromClient<T extends IDocumentoTramite | NewDocumentoTramite | PartialUpdateDocumentoTramite>(
    documentoTramite: T,
  ): RestOf<T> {
    return {
      ...documentoTramite,
      fecha: documentoTramite.fecha?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDocumentoTramite: RestDocumentoTramite): IDocumentoTramite {
    return {
      ...restDocumentoTramite,
      fecha: restDocumentoTramite.fecha ? dayjs(restDocumentoTramite.fecha) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDocumentoTramite>): HttpResponse<IDocumentoTramite> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDocumentoTramite[]>): HttpResponse<IDocumentoTramite[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
