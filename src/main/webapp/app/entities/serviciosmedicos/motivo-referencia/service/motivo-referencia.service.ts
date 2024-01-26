import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMotivoReferencia, NewMotivoReferencia } from '../motivo-referencia.model';

export type PartialUpdateMotivoReferencia = Partial<IMotivoReferencia> & Pick<IMotivoReferencia, 'id'>;

export type EntityResponseType = HttpResponse<IMotivoReferencia>;
export type EntityArrayResponseType = HttpResponse<IMotivoReferencia[]>;

@Injectable({ providedIn: 'root' })
export class MotivoReferenciaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/motivo-referencias', 'serviciosmedicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(motivoReferencia: NewMotivoReferencia): Observable<EntityResponseType> {
    return this.http.post<IMotivoReferencia>(this.resourceUrl, motivoReferencia, { observe: 'response' });
  }

  update(motivoReferencia: IMotivoReferencia): Observable<EntityResponseType> {
    return this.http.put<IMotivoReferencia>(
      `${this.resourceUrl}/${this.getMotivoReferenciaIdentifier(motivoReferencia)}`,
      motivoReferencia,
      { observe: 'response' },
    );
  }

  partialUpdate(motivoReferencia: PartialUpdateMotivoReferencia): Observable<EntityResponseType> {
    return this.http.patch<IMotivoReferencia>(
      `${this.resourceUrl}/${this.getMotivoReferenciaIdentifier(motivoReferencia)}`,
      motivoReferencia,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMotivoReferencia>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMotivoReferencia[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMotivoReferenciaIdentifier(motivoReferencia: Pick<IMotivoReferencia, 'id'>): number {
    return motivoReferencia.id;
  }

  compareMotivoReferencia(o1: Pick<IMotivoReferencia, 'id'> | null, o2: Pick<IMotivoReferencia, 'id'> | null): boolean {
    return o1 && o2 ? this.getMotivoReferenciaIdentifier(o1) === this.getMotivoReferenciaIdentifier(o2) : o1 === o2;
  }

  addMotivoReferenciaToCollectionIfMissing<Type extends Pick<IMotivoReferencia, 'id'>>(
    motivoReferenciaCollection: Type[],
    ...motivoReferenciasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const motivoReferencias: Type[] = motivoReferenciasToCheck.filter(isPresent);
    if (motivoReferencias.length > 0) {
      const motivoReferenciaCollectionIdentifiers = motivoReferenciaCollection.map(
        motivoReferenciaItem => this.getMotivoReferenciaIdentifier(motivoReferenciaItem)!,
      );
      const motivoReferenciasToAdd = motivoReferencias.filter(motivoReferenciaItem => {
        const motivoReferenciaIdentifier = this.getMotivoReferenciaIdentifier(motivoReferenciaItem);
        if (motivoReferenciaCollectionIdentifiers.includes(motivoReferenciaIdentifier)) {
          return false;
        }
        motivoReferenciaCollectionIdentifiers.push(motivoReferenciaIdentifier);
        return true;
      });
      return [...motivoReferenciasToAdd, ...motivoReferenciaCollection];
    }
    return motivoReferenciaCollection;
  }
}
