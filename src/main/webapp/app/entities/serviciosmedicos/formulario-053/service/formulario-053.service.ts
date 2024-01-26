import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFormulario053, NewFormulario053 } from '../formulario-053.model';

export type PartialUpdateFormulario053 = Partial<IFormulario053> & Pick<IFormulario053, 'id'>;

type RestOf<T extends IFormulario053 | NewFormulario053> = Omit<T, 'fecha'> & {
  fecha?: string | null;
};

export type RestFormulario053 = RestOf<IFormulario053>;

export type NewRestFormulario053 = RestOf<NewFormulario053>;

export type PartialUpdateRestFormulario053 = RestOf<PartialUpdateFormulario053>;

export type EntityResponseType = HttpResponse<IFormulario053>;
export type EntityArrayResponseType = HttpResponse<IFormulario053[]>;

@Injectable({ providedIn: 'root' })
export class Formulario053Service {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/formulario-053-s', 'serviciosmedicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(formulario053: NewFormulario053): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(formulario053);
    return this.http
      .post<RestFormulario053>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(formulario053: IFormulario053): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(formulario053);
    return this.http
      .put<RestFormulario053>(`${this.resourceUrl}/${this.getFormulario053Identifier(formulario053)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(formulario053: PartialUpdateFormulario053): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(formulario053);
    return this.http
      .patch<RestFormulario053>(`${this.resourceUrl}/${this.getFormulario053Identifier(formulario053)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFormulario053>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFormulario053[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFormulario053Identifier(formulario053: Pick<IFormulario053, 'id'>): number {
    return formulario053.id;
  }

  compareFormulario053(o1: Pick<IFormulario053, 'id'> | null, o2: Pick<IFormulario053, 'id'> | null): boolean {
    return o1 && o2 ? this.getFormulario053Identifier(o1) === this.getFormulario053Identifier(o2) : o1 === o2;
  }

  addFormulario053ToCollectionIfMissing<Type extends Pick<IFormulario053, 'id'>>(
    formulario053Collection: Type[],
    ...formulario053sToCheck: (Type | null | undefined)[]
  ): Type[] {
    const formulario053s: Type[] = formulario053sToCheck.filter(isPresent);
    if (formulario053s.length > 0) {
      const formulario053CollectionIdentifiers = formulario053Collection.map(
        formulario053Item => this.getFormulario053Identifier(formulario053Item)!,
      );
      const formulario053sToAdd = formulario053s.filter(formulario053Item => {
        const formulario053Identifier = this.getFormulario053Identifier(formulario053Item);
        if (formulario053CollectionIdentifiers.includes(formulario053Identifier)) {
          return false;
        }
        formulario053CollectionIdentifiers.push(formulario053Identifier);
        return true;
      });
      return [...formulario053sToAdd, ...formulario053Collection];
    }
    return formulario053Collection;
  }

  protected convertDateFromClient<T extends IFormulario053 | NewFormulario053 | PartialUpdateFormulario053>(formulario053: T): RestOf<T> {
    return {
      ...formulario053,
      fecha: formulario053.fecha?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restFormulario053: RestFormulario053): IFormulario053 {
    return {
      ...restFormulario053,
      fecha: restFormulario053.fecha ? dayjs(restFormulario053.fecha) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFormulario053>): HttpResponse<IFormulario053> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFormulario053[]>): HttpResponse<IFormulario053[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
