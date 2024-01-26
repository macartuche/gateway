import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFormulario053Contrareferencia, NewFormulario053Contrareferencia } from '../formulario-053-contrareferencia.model';

export type PartialUpdateFormulario053Contrareferencia = Partial<IFormulario053Contrareferencia> &
  Pick<IFormulario053Contrareferencia, 'id'>;

export type EntityResponseType = HttpResponse<IFormulario053Contrareferencia>;
export type EntityArrayResponseType = HttpResponse<IFormulario053Contrareferencia[]>;

@Injectable({ providedIn: 'root' })
export class Formulario053ContrareferenciaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/formulario-053-contrareferencias', 'serviciosmedicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(formulario053Contrareferencia: NewFormulario053Contrareferencia): Observable<EntityResponseType> {
    return this.http.post<IFormulario053Contrareferencia>(this.resourceUrl, formulario053Contrareferencia, { observe: 'response' });
  }

  update(formulario053Contrareferencia: IFormulario053Contrareferencia): Observable<EntityResponseType> {
    return this.http.put<IFormulario053Contrareferencia>(
      `${this.resourceUrl}/${this.getFormulario053ContrareferenciaIdentifier(formulario053Contrareferencia)}`,
      formulario053Contrareferencia,
      { observe: 'response' },
    );
  }

  partialUpdate(formulario053Contrareferencia: PartialUpdateFormulario053Contrareferencia): Observable<EntityResponseType> {
    return this.http.patch<IFormulario053Contrareferencia>(
      `${this.resourceUrl}/${this.getFormulario053ContrareferenciaIdentifier(formulario053Contrareferencia)}`,
      formulario053Contrareferencia,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFormulario053Contrareferencia>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormulario053Contrareferencia[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFormulario053ContrareferenciaIdentifier(formulario053Contrareferencia: Pick<IFormulario053Contrareferencia, 'id'>): number {
    return formulario053Contrareferencia.id;
  }

  compareFormulario053Contrareferencia(
    o1: Pick<IFormulario053Contrareferencia, 'id'> | null,
    o2: Pick<IFormulario053Contrareferencia, 'id'> | null,
  ): boolean {
    return o1 && o2
      ? this.getFormulario053ContrareferenciaIdentifier(o1) === this.getFormulario053ContrareferenciaIdentifier(o2)
      : o1 === o2;
  }

  addFormulario053ContrareferenciaToCollectionIfMissing<Type extends Pick<IFormulario053Contrareferencia, 'id'>>(
    formulario053ContrareferenciaCollection: Type[],
    ...formulario053ContrareferenciasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const formulario053Contrareferencias: Type[] = formulario053ContrareferenciasToCheck.filter(isPresent);
    if (formulario053Contrareferencias.length > 0) {
      const formulario053ContrareferenciaCollectionIdentifiers = formulario053ContrareferenciaCollection.map(
        formulario053ContrareferenciaItem => this.getFormulario053ContrareferenciaIdentifier(formulario053ContrareferenciaItem)!,
      );
      const formulario053ContrareferenciasToAdd = formulario053Contrareferencias.filter(formulario053ContrareferenciaItem => {
        const formulario053ContrareferenciaIdentifier = this.getFormulario053ContrareferenciaIdentifier(formulario053ContrareferenciaItem);
        if (formulario053ContrareferenciaCollectionIdentifiers.includes(formulario053ContrareferenciaIdentifier)) {
          return false;
        }
        formulario053ContrareferenciaCollectionIdentifiers.push(formulario053ContrareferenciaIdentifier);
        return true;
      });
      return [...formulario053ContrareferenciasToAdd, ...formulario053ContrareferenciaCollection];
    }
    return formulario053ContrareferenciaCollection;
  }
}
