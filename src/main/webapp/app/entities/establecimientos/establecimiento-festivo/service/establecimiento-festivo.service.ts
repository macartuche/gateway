import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEstablecimientoFestivo, NewEstablecimientoFestivo } from '../establecimiento-festivo.model';

export type PartialUpdateEstablecimientoFestivo = Partial<IEstablecimientoFestivo> & Pick<IEstablecimientoFestivo, 'id'>;

export type EntityResponseType = HttpResponse<IEstablecimientoFestivo>;
export type EntityArrayResponseType = HttpResponse<IEstablecimientoFestivo[]>;

@Injectable({ providedIn: 'root' })
export class EstablecimientoFestivoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/establecimiento-festivos', 'establecimientos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(establecimientoFestivo: NewEstablecimientoFestivo): Observable<EntityResponseType> {
    return this.http.post<IEstablecimientoFestivo>(this.resourceUrl, establecimientoFestivo, { observe: 'response' });
  }

  update(establecimientoFestivo: IEstablecimientoFestivo): Observable<EntityResponseType> {
    return this.http.put<IEstablecimientoFestivo>(
      `${this.resourceUrl}/${this.getEstablecimientoFestivoIdentifier(establecimientoFestivo)}`,
      establecimientoFestivo,
      { observe: 'response' },
    );
  }

  partialUpdate(establecimientoFestivo: PartialUpdateEstablecimientoFestivo): Observable<EntityResponseType> {
    return this.http.patch<IEstablecimientoFestivo>(
      `${this.resourceUrl}/${this.getEstablecimientoFestivoIdentifier(establecimientoFestivo)}`,
      establecimientoFestivo,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstablecimientoFestivo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstablecimientoFestivo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEstablecimientoFestivoIdentifier(establecimientoFestivo: Pick<IEstablecimientoFestivo, 'id'>): number {
    return establecimientoFestivo.id;
  }

  compareEstablecimientoFestivo(o1: Pick<IEstablecimientoFestivo, 'id'> | null, o2: Pick<IEstablecimientoFestivo, 'id'> | null): boolean {
    return o1 && o2 ? this.getEstablecimientoFestivoIdentifier(o1) === this.getEstablecimientoFestivoIdentifier(o2) : o1 === o2;
  }

  addEstablecimientoFestivoToCollectionIfMissing<Type extends Pick<IEstablecimientoFestivo, 'id'>>(
    establecimientoFestivoCollection: Type[],
    ...establecimientoFestivosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const establecimientoFestivos: Type[] = establecimientoFestivosToCheck.filter(isPresent);
    if (establecimientoFestivos.length > 0) {
      const establecimientoFestivoCollectionIdentifiers = establecimientoFestivoCollection.map(
        establecimientoFestivoItem => this.getEstablecimientoFestivoIdentifier(establecimientoFestivoItem)!,
      );
      const establecimientoFestivosToAdd = establecimientoFestivos.filter(establecimientoFestivoItem => {
        const establecimientoFestivoIdentifier = this.getEstablecimientoFestivoIdentifier(establecimientoFestivoItem);
        if (establecimientoFestivoCollectionIdentifiers.includes(establecimientoFestivoIdentifier)) {
          return false;
        }
        establecimientoFestivoCollectionIdentifiers.push(establecimientoFestivoIdentifier);
        return true;
      });
      return [...establecimientoFestivosToAdd, ...establecimientoFestivoCollection];
    }
    return establecimientoFestivoCollection;
  }
}
