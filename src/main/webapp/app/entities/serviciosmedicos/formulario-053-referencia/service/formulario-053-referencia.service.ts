import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFormulario053Referencia, NewFormulario053Referencia } from '../formulario-053-referencia.model';

export type PartialUpdateFormulario053Referencia = Partial<IFormulario053Referencia> & Pick<IFormulario053Referencia, 'id'>;

export type EntityResponseType = HttpResponse<IFormulario053Referencia>;
export type EntityArrayResponseType = HttpResponse<IFormulario053Referencia[]>;

@Injectable({ providedIn: 'root' })
export class Formulario053ReferenciaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/formulario-053-referencias', 'serviciosmedicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(formulario053Referencia: NewFormulario053Referencia): Observable<EntityResponseType> {
    return this.http.post<IFormulario053Referencia>(this.resourceUrl, formulario053Referencia, { observe: 'response' });
  }

  update(formulario053Referencia: IFormulario053Referencia): Observable<EntityResponseType> {
    return this.http.put<IFormulario053Referencia>(
      `${this.resourceUrl}/${this.getFormulario053ReferenciaIdentifier(formulario053Referencia)}`,
      formulario053Referencia,
      { observe: 'response' },
    );
  }

  partialUpdate(formulario053Referencia: PartialUpdateFormulario053Referencia): Observable<EntityResponseType> {
    return this.http.patch<IFormulario053Referencia>(
      `${this.resourceUrl}/${this.getFormulario053ReferenciaIdentifier(formulario053Referencia)}`,
      formulario053Referencia,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFormulario053Referencia>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormulario053Referencia[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFormulario053ReferenciaIdentifier(formulario053Referencia: Pick<IFormulario053Referencia, 'id'>): number {
    return formulario053Referencia.id;
  }

  compareFormulario053Referencia(
    o1: Pick<IFormulario053Referencia, 'id'> | null,
    o2: Pick<IFormulario053Referencia, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getFormulario053ReferenciaIdentifier(o1) === this.getFormulario053ReferenciaIdentifier(o2) : o1 === o2;
  }

  addFormulario053ReferenciaToCollectionIfMissing<Type extends Pick<IFormulario053Referencia, 'id'>>(
    formulario053ReferenciaCollection: Type[],
    ...formulario053ReferenciasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const formulario053Referencias: Type[] = formulario053ReferenciasToCheck.filter(isPresent);
    if (formulario053Referencias.length > 0) {
      const formulario053ReferenciaCollectionIdentifiers = formulario053ReferenciaCollection.map(
        formulario053ReferenciaItem => this.getFormulario053ReferenciaIdentifier(formulario053ReferenciaItem)!,
      );
      const formulario053ReferenciasToAdd = formulario053Referencias.filter(formulario053ReferenciaItem => {
        const formulario053ReferenciaIdentifier = this.getFormulario053ReferenciaIdentifier(formulario053ReferenciaItem);
        if (formulario053ReferenciaCollectionIdentifiers.includes(formulario053ReferenciaIdentifier)) {
          return false;
        }
        formulario053ReferenciaCollectionIdentifiers.push(formulario053ReferenciaIdentifier);
        return true;
      });
      return [...formulario053ReferenciasToAdd, ...formulario053ReferenciaCollection];
    }
    return formulario053ReferenciaCollection;
  }
}
