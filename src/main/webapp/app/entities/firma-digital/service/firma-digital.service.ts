import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFirmaDigital, NewFirmaDigital } from '../firma-digital.model';

export type PartialUpdateFirmaDigital = Partial<IFirmaDigital> & Pick<IFirmaDigital, 'id'>;

type RestOf<T extends IFirmaDigital | NewFirmaDigital> = Omit<T, 'fechaDesde' | 'fechaHasta'> & {
  fechaDesde?: string | null;
  fechaHasta?: string | null;
};

export type RestFirmaDigital = RestOf<IFirmaDigital>;

export type NewRestFirmaDigital = RestOf<NewFirmaDigital>;

export type PartialUpdateRestFirmaDigital = RestOf<PartialUpdateFirmaDigital>;

export type EntityResponseType = HttpResponse<IFirmaDigital>;
export type EntityArrayResponseType = HttpResponse<IFirmaDigital[]>;

@Injectable({ providedIn: 'root' })
export class FirmaDigitalService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/firma-digitals');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(firmaDigital: NewFirmaDigital): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(firmaDigital);
    return this.http
      .post<RestFirmaDigital>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(firmaDigital: IFirmaDigital): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(firmaDigital);
    return this.http
      .put<RestFirmaDigital>(`${this.resourceUrl}/${this.getFirmaDigitalIdentifier(firmaDigital)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(firmaDigital: PartialUpdateFirmaDigital): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(firmaDigital);
    return this.http
      .patch<RestFirmaDigital>(`${this.resourceUrl}/${this.getFirmaDigitalIdentifier(firmaDigital)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFirmaDigital>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFirmaDigital[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFirmaDigitalIdentifier(firmaDigital: Pick<IFirmaDigital, 'id'>): number {
    return firmaDigital.id;
  }

  compareFirmaDigital(o1: Pick<IFirmaDigital, 'id'> | null, o2: Pick<IFirmaDigital, 'id'> | null): boolean {
    return o1 && o2 ? this.getFirmaDigitalIdentifier(o1) === this.getFirmaDigitalIdentifier(o2) : o1 === o2;
  }

  addFirmaDigitalToCollectionIfMissing<Type extends Pick<IFirmaDigital, 'id'>>(
    firmaDigitalCollection: Type[],
    ...firmaDigitalsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const firmaDigitals: Type[] = firmaDigitalsToCheck.filter(isPresent);
    if (firmaDigitals.length > 0) {
      const firmaDigitalCollectionIdentifiers = firmaDigitalCollection.map(
        firmaDigitalItem => this.getFirmaDigitalIdentifier(firmaDigitalItem)!,
      );
      const firmaDigitalsToAdd = firmaDigitals.filter(firmaDigitalItem => {
        const firmaDigitalIdentifier = this.getFirmaDigitalIdentifier(firmaDigitalItem);
        if (firmaDigitalCollectionIdentifiers.includes(firmaDigitalIdentifier)) {
          return false;
        }
        firmaDigitalCollectionIdentifiers.push(firmaDigitalIdentifier);
        return true;
      });
      return [...firmaDigitalsToAdd, ...firmaDigitalCollection];
    }
    return firmaDigitalCollection;
  }

  protected convertDateFromClient<T extends IFirmaDigital | NewFirmaDigital | PartialUpdateFirmaDigital>(firmaDigital: T): RestOf<T> {
    return {
      ...firmaDigital,
      fechaDesde: firmaDigital.fechaDesde?.format(DATE_FORMAT) ?? null,
      fechaHasta: firmaDigital.fechaHasta?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restFirmaDigital: RestFirmaDigital): IFirmaDigital {
    return {
      ...restFirmaDigital,
      fechaDesde: restFirmaDigital.fechaDesde ? dayjs(restFirmaDigital.fechaDesde) : undefined,
      fechaHasta: restFirmaDigital.fechaHasta ? dayjs(restFirmaDigital.fechaHasta) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFirmaDigital>): HttpResponse<IFirmaDigital> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFirmaDigital[]>): HttpResponse<IFirmaDigital[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
