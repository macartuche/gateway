import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFestivo, NewFestivo } from '../festivo.model';

export type PartialUpdateFestivo = Partial<IFestivo> & Pick<IFestivo, 'id'>;

type RestOf<T extends IFestivo | NewFestivo> = Omit<T, 'fechaInicio' | 'fechaFin'> & {
  fechaInicio?: string | null;
  fechaFin?: string | null;
};

export type RestFestivo = RestOf<IFestivo>;

export type NewRestFestivo = RestOf<NewFestivo>;

export type PartialUpdateRestFestivo = RestOf<PartialUpdateFestivo>;

export type EntityResponseType = HttpResponse<IFestivo>;
export type EntityArrayResponseType = HttpResponse<IFestivo[]>;

@Injectable({ providedIn: 'root' })
export class FestivoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/festivos', 'establecimientos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(festivo: NewFestivo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(festivo);
    return this.http
      .post<RestFestivo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(festivo: IFestivo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(festivo);
    return this.http
      .put<RestFestivo>(`${this.resourceUrl}/${this.getFestivoIdentifier(festivo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(festivo: PartialUpdateFestivo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(festivo);
    return this.http
      .patch<RestFestivo>(`${this.resourceUrl}/${this.getFestivoIdentifier(festivo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFestivo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFestivo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFestivoIdentifier(festivo: Pick<IFestivo, 'id'>): number {
    return festivo.id;
  }

  compareFestivo(o1: Pick<IFestivo, 'id'> | null, o2: Pick<IFestivo, 'id'> | null): boolean {
    return o1 && o2 ? this.getFestivoIdentifier(o1) === this.getFestivoIdentifier(o2) : o1 === o2;
  }

  addFestivoToCollectionIfMissing<Type extends Pick<IFestivo, 'id'>>(
    festivoCollection: Type[],
    ...festivosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const festivos: Type[] = festivosToCheck.filter(isPresent);
    if (festivos.length > 0) {
      const festivoCollectionIdentifiers = festivoCollection.map(festivoItem => this.getFestivoIdentifier(festivoItem)!);
      const festivosToAdd = festivos.filter(festivoItem => {
        const festivoIdentifier = this.getFestivoIdentifier(festivoItem);
        if (festivoCollectionIdentifiers.includes(festivoIdentifier)) {
          return false;
        }
        festivoCollectionIdentifiers.push(festivoIdentifier);
        return true;
      });
      return [...festivosToAdd, ...festivoCollection];
    }
    return festivoCollection;
  }

  protected convertDateFromClient<T extends IFestivo | NewFestivo | PartialUpdateFestivo>(festivo: T): RestOf<T> {
    return {
      ...festivo,
      fechaInicio: festivo.fechaInicio?.format(DATE_FORMAT) ?? null,
      fechaFin: festivo.fechaFin?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restFestivo: RestFestivo): IFestivo {
    return {
      ...restFestivo,
      fechaInicio: restFestivo.fechaInicio ? dayjs(restFestivo.fechaInicio) : undefined,
      fechaFin: restFestivo.fechaFin ? dayjs(restFestivo.fechaFin) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFestivo>): HttpResponse<IFestivo> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFestivo[]>): HttpResponse<IFestivo[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
