import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITurno, NewTurno } from '../turno.model';

export type PartialUpdateTurno = Partial<ITurno> & Pick<ITurno, 'id'>;

type RestOf<T extends ITurno | NewTurno> = Omit<T, 'horaInicio' | 'horaFin'> & {
  horaInicio?: string | null;
  horaFin?: string | null;
};

export type RestTurno = RestOf<ITurno>;

export type NewRestTurno = RestOf<NewTurno>;

export type PartialUpdateRestTurno = RestOf<PartialUpdateTurno>;

export type EntityResponseType = HttpResponse<ITurno>;
export type EntityArrayResponseType = HttpResponse<ITurno[]>;

@Injectable({ providedIn: 'root' })
export class TurnoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/turnos', 'citasmedicas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(turno: NewTurno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turno);
    return this.http.post<RestTurno>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(turno: ITurno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turno);
    return this.http
      .put<RestTurno>(`${this.resourceUrl}/${this.getTurnoIdentifier(turno)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(turno: PartialUpdateTurno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turno);
    return this.http
      .patch<RestTurno>(`${this.resourceUrl}/${this.getTurnoIdentifier(turno)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTurno>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTurno[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTurnoIdentifier(turno: Pick<ITurno, 'id'>): number {
    return turno.id;
  }

  compareTurno(o1: Pick<ITurno, 'id'> | null, o2: Pick<ITurno, 'id'> | null): boolean {
    return o1 && o2 ? this.getTurnoIdentifier(o1) === this.getTurnoIdentifier(o2) : o1 === o2;
  }

  addTurnoToCollectionIfMissing<Type extends Pick<ITurno, 'id'>>(
    turnoCollection: Type[],
    ...turnosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const turnos: Type[] = turnosToCheck.filter(isPresent);
    if (turnos.length > 0) {
      const turnoCollectionIdentifiers = turnoCollection.map(turnoItem => this.getTurnoIdentifier(turnoItem)!);
      const turnosToAdd = turnos.filter(turnoItem => {
        const turnoIdentifier = this.getTurnoIdentifier(turnoItem);
        if (turnoCollectionIdentifiers.includes(turnoIdentifier)) {
          return false;
        }
        turnoCollectionIdentifiers.push(turnoIdentifier);
        return true;
      });
      return [...turnosToAdd, ...turnoCollection];
    }
    return turnoCollection;
  }

  protected convertDateFromClient<T extends ITurno | NewTurno | PartialUpdateTurno>(turno: T): RestOf<T> {
    return {
      ...turno,
      horaInicio: turno.horaInicio?.toJSON() ?? null,
      horaFin: turno.horaFin?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restTurno: RestTurno): ITurno {
    return {
      ...restTurno,
      horaInicio: restTurno.horaInicio ? dayjs(restTurno.horaInicio) : undefined,
      horaFin: restTurno.horaFin ? dayjs(restTurno.horaFin) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTurno>): HttpResponse<ITurno> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTurno[]>): HttpResponse<ITurno[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
