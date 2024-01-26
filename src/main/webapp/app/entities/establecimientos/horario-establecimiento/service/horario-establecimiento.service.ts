import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHorarioEstablecimiento, NewHorarioEstablecimiento } from '../horario-establecimiento.model';

export type PartialUpdateHorarioEstablecimiento = Partial<IHorarioEstablecimiento> & Pick<IHorarioEstablecimiento, 'id'>;

type RestOf<T extends IHorarioEstablecimiento | NewHorarioEstablecimiento> = Omit<T, 'horaInicio' | 'horaFin'> & {
  horaInicio?: string | null;
  horaFin?: string | null;
};

export type RestHorarioEstablecimiento = RestOf<IHorarioEstablecimiento>;

export type NewRestHorarioEstablecimiento = RestOf<NewHorarioEstablecimiento>;

export type PartialUpdateRestHorarioEstablecimiento = RestOf<PartialUpdateHorarioEstablecimiento>;

export type EntityResponseType = HttpResponse<IHorarioEstablecimiento>;
export type EntityArrayResponseType = HttpResponse<IHorarioEstablecimiento[]>;

@Injectable({ providedIn: 'root' })
export class HorarioEstablecimientoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/horario-establecimientos', 'establecimientos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(horarioEstablecimiento: NewHorarioEstablecimiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(horarioEstablecimiento);
    return this.http
      .post<RestHorarioEstablecimiento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(horarioEstablecimiento: IHorarioEstablecimiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(horarioEstablecimiento);
    return this.http
      .put<RestHorarioEstablecimiento>(`${this.resourceUrl}/${this.getHorarioEstablecimientoIdentifier(horarioEstablecimiento)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(horarioEstablecimiento: PartialUpdateHorarioEstablecimiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(horarioEstablecimiento);
    return this.http
      .patch<RestHorarioEstablecimiento>(`${this.resourceUrl}/${this.getHorarioEstablecimientoIdentifier(horarioEstablecimiento)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestHorarioEstablecimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestHorarioEstablecimiento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getHorarioEstablecimientoIdentifier(horarioEstablecimiento: Pick<IHorarioEstablecimiento, 'id'>): number {
    return horarioEstablecimiento.id;
  }

  compareHorarioEstablecimiento(o1: Pick<IHorarioEstablecimiento, 'id'> | null, o2: Pick<IHorarioEstablecimiento, 'id'> | null): boolean {
    return o1 && o2 ? this.getHorarioEstablecimientoIdentifier(o1) === this.getHorarioEstablecimientoIdentifier(o2) : o1 === o2;
  }

  addHorarioEstablecimientoToCollectionIfMissing<Type extends Pick<IHorarioEstablecimiento, 'id'>>(
    horarioEstablecimientoCollection: Type[],
    ...horarioEstablecimientosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const horarioEstablecimientos: Type[] = horarioEstablecimientosToCheck.filter(isPresent);
    if (horarioEstablecimientos.length > 0) {
      const horarioEstablecimientoCollectionIdentifiers = horarioEstablecimientoCollection.map(
        horarioEstablecimientoItem => this.getHorarioEstablecimientoIdentifier(horarioEstablecimientoItem)!,
      );
      const horarioEstablecimientosToAdd = horarioEstablecimientos.filter(horarioEstablecimientoItem => {
        const horarioEstablecimientoIdentifier = this.getHorarioEstablecimientoIdentifier(horarioEstablecimientoItem);
        if (horarioEstablecimientoCollectionIdentifiers.includes(horarioEstablecimientoIdentifier)) {
          return false;
        }
        horarioEstablecimientoCollectionIdentifiers.push(horarioEstablecimientoIdentifier);
        return true;
      });
      return [...horarioEstablecimientosToAdd, ...horarioEstablecimientoCollection];
    }
    return horarioEstablecimientoCollection;
  }

  protected convertDateFromClient<T extends IHorarioEstablecimiento | NewHorarioEstablecimiento | PartialUpdateHorarioEstablecimiento>(
    horarioEstablecimiento: T,
  ): RestOf<T> {
    return {
      ...horarioEstablecimiento,
      horaInicio: horarioEstablecimiento.horaInicio?.toJSON() ?? null,
      horaFin: horarioEstablecimiento.horaFin?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restHorarioEstablecimiento: RestHorarioEstablecimiento): IHorarioEstablecimiento {
    return {
      ...restHorarioEstablecimiento,
      horaInicio: restHorarioEstablecimiento.horaInicio ? dayjs(restHorarioEstablecimiento.horaInicio) : undefined,
      horaFin: restHorarioEstablecimiento.horaFin ? dayjs(restHorarioEstablecimiento.horaFin) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestHorarioEstablecimiento>): HttpResponse<IHorarioEstablecimiento> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestHorarioEstablecimiento[]>): HttpResponse<IHorarioEstablecimiento[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
