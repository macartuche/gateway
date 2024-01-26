import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IContactoEmergenciaPaciente, NewContactoEmergenciaPaciente } from '../contacto-emergencia-paciente.model';

export type PartialUpdateContactoEmergenciaPaciente = Partial<IContactoEmergenciaPaciente> & Pick<IContactoEmergenciaPaciente, 'id'>;

export type EntityResponseType = HttpResponse<IContactoEmergenciaPaciente>;
export type EntityArrayResponseType = HttpResponse<IContactoEmergenciaPaciente[]>;

@Injectable({ providedIn: 'root' })
export class ContactoEmergenciaPacienteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/contacto-emergencia-pacientes');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(contactoEmergenciaPaciente: NewContactoEmergenciaPaciente): Observable<EntityResponseType> {
    return this.http.post<IContactoEmergenciaPaciente>(this.resourceUrl, contactoEmergenciaPaciente, { observe: 'response' });
  }

  update(contactoEmergenciaPaciente: IContactoEmergenciaPaciente): Observable<EntityResponseType> {
    return this.http.put<IContactoEmergenciaPaciente>(
      `${this.resourceUrl}/${this.getContactoEmergenciaPacienteIdentifier(contactoEmergenciaPaciente)}`,
      contactoEmergenciaPaciente,
      { observe: 'response' },
    );
  }

  partialUpdate(contactoEmergenciaPaciente: PartialUpdateContactoEmergenciaPaciente): Observable<EntityResponseType> {
    return this.http.patch<IContactoEmergenciaPaciente>(
      `${this.resourceUrl}/${this.getContactoEmergenciaPacienteIdentifier(contactoEmergenciaPaciente)}`,
      contactoEmergenciaPaciente,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContactoEmergenciaPaciente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContactoEmergenciaPaciente[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getContactoEmergenciaPacienteIdentifier(contactoEmergenciaPaciente: Pick<IContactoEmergenciaPaciente, 'id'>): number {
    return contactoEmergenciaPaciente.id;
  }

  compareContactoEmergenciaPaciente(
    o1: Pick<IContactoEmergenciaPaciente, 'id'> | null,
    o2: Pick<IContactoEmergenciaPaciente, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getContactoEmergenciaPacienteIdentifier(o1) === this.getContactoEmergenciaPacienteIdentifier(o2) : o1 === o2;
  }

  addContactoEmergenciaPacienteToCollectionIfMissing<Type extends Pick<IContactoEmergenciaPaciente, 'id'>>(
    contactoEmergenciaPacienteCollection: Type[],
    ...contactoEmergenciaPacientesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const contactoEmergenciaPacientes: Type[] = contactoEmergenciaPacientesToCheck.filter(isPresent);
    if (contactoEmergenciaPacientes.length > 0) {
      const contactoEmergenciaPacienteCollectionIdentifiers = contactoEmergenciaPacienteCollection.map(
        contactoEmergenciaPacienteItem => this.getContactoEmergenciaPacienteIdentifier(contactoEmergenciaPacienteItem)!,
      );
      const contactoEmergenciaPacientesToAdd = contactoEmergenciaPacientes.filter(contactoEmergenciaPacienteItem => {
        const contactoEmergenciaPacienteIdentifier = this.getContactoEmergenciaPacienteIdentifier(contactoEmergenciaPacienteItem);
        if (contactoEmergenciaPacienteCollectionIdentifiers.includes(contactoEmergenciaPacienteIdentifier)) {
          return false;
        }
        contactoEmergenciaPacienteCollectionIdentifiers.push(contactoEmergenciaPacienteIdentifier);
        return true;
      });
      return [...contactoEmergenciaPacientesToAdd, ...contactoEmergenciaPacienteCollection];
    }
    return contactoEmergenciaPacienteCollection;
  }
}
