import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITarifario, NewTarifario } from '../tarifario.model';

export type PartialUpdateTarifario = Partial<ITarifario> & Pick<ITarifario, 'id'>;

export type EntityResponseType = HttpResponse<ITarifario>;
export type EntityArrayResponseType = HttpResponse<ITarifario[]>;

@Injectable({ providedIn: 'root' })
export class TarifarioService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tarifarios', 'serviciosmedicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(tarifario: NewTarifario): Observable<EntityResponseType> {
    return this.http.post<ITarifario>(this.resourceUrl, tarifario, { observe: 'response' });
  }

  update(tarifario: ITarifario): Observable<EntityResponseType> {
    return this.http.put<ITarifario>(`${this.resourceUrl}/${this.getTarifarioIdentifier(tarifario)}`, tarifario, { observe: 'response' });
  }

  partialUpdate(tarifario: PartialUpdateTarifario): Observable<EntityResponseType> {
    return this.http.patch<ITarifario>(`${this.resourceUrl}/${this.getTarifarioIdentifier(tarifario)}`, tarifario, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITarifario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITarifario[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTarifarioIdentifier(tarifario: Pick<ITarifario, 'id'>): number {
    return tarifario.id;
  }

  compareTarifario(o1: Pick<ITarifario, 'id'> | null, o2: Pick<ITarifario, 'id'> | null): boolean {
    return o1 && o2 ? this.getTarifarioIdentifier(o1) === this.getTarifarioIdentifier(o2) : o1 === o2;
  }

  addTarifarioToCollectionIfMissing<Type extends Pick<ITarifario, 'id'>>(
    tarifarioCollection: Type[],
    ...tarifariosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tarifarios: Type[] = tarifariosToCheck.filter(isPresent);
    if (tarifarios.length > 0) {
      const tarifarioCollectionIdentifiers = tarifarioCollection.map(tarifarioItem => this.getTarifarioIdentifier(tarifarioItem)!);
      const tarifariosToAdd = tarifarios.filter(tarifarioItem => {
        const tarifarioIdentifier = this.getTarifarioIdentifier(tarifarioItem);
        if (tarifarioCollectionIdentifiers.includes(tarifarioIdentifier)) {
          return false;
        }
        tarifarioCollectionIdentifiers.push(tarifarioIdentifier);
        return true;
      });
      return [...tarifariosToAdd, ...tarifarioCollection];
    }
    return tarifarioCollection;
  }
}
