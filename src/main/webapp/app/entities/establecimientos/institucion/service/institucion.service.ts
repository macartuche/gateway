import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInstitucion, NewInstitucion } from '../institucion.model';

export type PartialUpdateInstitucion = Partial<IInstitucion> & Pick<IInstitucion, 'id'>;

export type EntityResponseType = HttpResponse<IInstitucion>;
export type EntityArrayResponseType = HttpResponse<IInstitucion[]>;

@Injectable({ providedIn: 'root' })
export class InstitucionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/institucions', 'establecimientos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(institucion: NewInstitucion): Observable<EntityResponseType> {
    return this.http.post<IInstitucion>(this.resourceUrl, institucion, { observe: 'response' });
  }

  update(institucion: IInstitucion): Observable<EntityResponseType> {
    return this.http.put<IInstitucion>(`${this.resourceUrl}/${this.getInstitucionIdentifier(institucion)}`, institucion, {
      observe: 'response',
    });
  }

  partialUpdate(institucion: PartialUpdateInstitucion): Observable<EntityResponseType> {
    return this.http.patch<IInstitucion>(`${this.resourceUrl}/${this.getInstitucionIdentifier(institucion)}`, institucion, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInstitucion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstitucion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getInstitucionIdentifier(institucion: Pick<IInstitucion, 'id'>): number {
    return institucion.id;
  }

  compareInstitucion(o1: Pick<IInstitucion, 'id'> | null, o2: Pick<IInstitucion, 'id'> | null): boolean {
    return o1 && o2 ? this.getInstitucionIdentifier(o1) === this.getInstitucionIdentifier(o2) : o1 === o2;
  }

  addInstitucionToCollectionIfMissing<Type extends Pick<IInstitucion, 'id'>>(
    institucionCollection: Type[],
    ...institucionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const institucions: Type[] = institucionsToCheck.filter(isPresent);
    if (institucions.length > 0) {
      const institucionCollectionIdentifiers = institucionCollection.map(
        institucionItem => this.getInstitucionIdentifier(institucionItem)!,
      );
      const institucionsToAdd = institucions.filter(institucionItem => {
        const institucionIdentifier = this.getInstitucionIdentifier(institucionItem);
        if (institucionCollectionIdentifiers.includes(institucionIdentifier)) {
          return false;
        }
        institucionCollectionIdentifiers.push(institucionIdentifier);
        return true;
      });
      return [...institucionsToAdd, ...institucionCollection];
    }
    return institucionCollection;
  }
}
