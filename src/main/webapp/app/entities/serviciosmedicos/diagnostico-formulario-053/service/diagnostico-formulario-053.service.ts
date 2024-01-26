import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDiagnosticoFormulario053, NewDiagnosticoFormulario053 } from '../diagnostico-formulario-053.model';

export type PartialUpdateDiagnosticoFormulario053 = Partial<IDiagnosticoFormulario053> & Pick<IDiagnosticoFormulario053, 'id'>;

export type EntityResponseType = HttpResponse<IDiagnosticoFormulario053>;
export type EntityArrayResponseType = HttpResponse<IDiagnosticoFormulario053[]>;

@Injectable({ providedIn: 'root' })
export class DiagnosticoFormulario053Service {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/diagnostico-formulario-053-s', 'serviciosmedicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(diagnosticoFormulario053: NewDiagnosticoFormulario053): Observable<EntityResponseType> {
    return this.http.post<IDiagnosticoFormulario053>(this.resourceUrl, diagnosticoFormulario053, { observe: 'response' });
  }

  update(diagnosticoFormulario053: IDiagnosticoFormulario053): Observable<EntityResponseType> {
    return this.http.put<IDiagnosticoFormulario053>(
      `${this.resourceUrl}/${this.getDiagnosticoFormulario053Identifier(diagnosticoFormulario053)}`,
      diagnosticoFormulario053,
      { observe: 'response' },
    );
  }

  partialUpdate(diagnosticoFormulario053: PartialUpdateDiagnosticoFormulario053): Observable<EntityResponseType> {
    return this.http.patch<IDiagnosticoFormulario053>(
      `${this.resourceUrl}/${this.getDiagnosticoFormulario053Identifier(diagnosticoFormulario053)}`,
      diagnosticoFormulario053,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDiagnosticoFormulario053>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDiagnosticoFormulario053[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDiagnosticoFormulario053Identifier(diagnosticoFormulario053: Pick<IDiagnosticoFormulario053, 'id'>): number {
    return diagnosticoFormulario053.id;
  }

  compareDiagnosticoFormulario053(
    o1: Pick<IDiagnosticoFormulario053, 'id'> | null,
    o2: Pick<IDiagnosticoFormulario053, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getDiagnosticoFormulario053Identifier(o1) === this.getDiagnosticoFormulario053Identifier(o2) : o1 === o2;
  }

  addDiagnosticoFormulario053ToCollectionIfMissing<Type extends Pick<IDiagnosticoFormulario053, 'id'>>(
    diagnosticoFormulario053Collection: Type[],
    ...diagnosticoFormulario053sToCheck: (Type | null | undefined)[]
  ): Type[] {
    const diagnosticoFormulario053s: Type[] = diagnosticoFormulario053sToCheck.filter(isPresent);
    if (diagnosticoFormulario053s.length > 0) {
      const diagnosticoFormulario053CollectionIdentifiers = diagnosticoFormulario053Collection.map(
        diagnosticoFormulario053Item => this.getDiagnosticoFormulario053Identifier(diagnosticoFormulario053Item)!,
      );
      const diagnosticoFormulario053sToAdd = diagnosticoFormulario053s.filter(diagnosticoFormulario053Item => {
        const diagnosticoFormulario053Identifier = this.getDiagnosticoFormulario053Identifier(diagnosticoFormulario053Item);
        if (diagnosticoFormulario053CollectionIdentifiers.includes(diagnosticoFormulario053Identifier)) {
          return false;
        }
        diagnosticoFormulario053CollectionIdentifiers.push(diagnosticoFormulario053Identifier);
        return true;
      });
      return [...diagnosticoFormulario053sToAdd, ...diagnosticoFormulario053Collection];
    }
    return diagnosticoFormulario053Collection;
  }
}
