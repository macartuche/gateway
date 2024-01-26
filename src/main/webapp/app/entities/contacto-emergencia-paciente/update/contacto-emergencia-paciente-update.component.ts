import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IPaciente } from 'app/entities/paciente/paciente.model';
import { PacienteService } from 'app/entities/paciente/service/paciente.service';
import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';
import { CatalogoItemService } from 'app/entities/catalogo-item/service/catalogo-item.service';
import { ContactoEmergenciaPacienteService } from '../service/contacto-emergencia-paciente.service';
import { IContactoEmergenciaPaciente } from '../contacto-emergencia-paciente.model';
import { ContactoEmergenciaPacienteFormService, ContactoEmergenciaPacienteFormGroup } from './contacto-emergencia-paciente-form.service';

@Component({
  standalone: true,
  selector: 'jhi-contacto-emergencia-paciente-update',
  templateUrl: './contacto-emergencia-paciente-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ContactoEmergenciaPacienteUpdateComponent implements OnInit {
  isSaving = false;
  contactoEmergenciaPaciente: IContactoEmergenciaPaciente | null = null;

  pacientesSharedCollection: IPaciente[] = [];
  catalogoItemsSharedCollection: ICatalogoItem[] = [];

  editForm: ContactoEmergenciaPacienteFormGroup = this.contactoEmergenciaPacienteFormService.createContactoEmergenciaPacienteFormGroup();

  constructor(
    protected contactoEmergenciaPacienteService: ContactoEmergenciaPacienteService,
    protected contactoEmergenciaPacienteFormService: ContactoEmergenciaPacienteFormService,
    protected pacienteService: PacienteService,
    protected catalogoItemService: CatalogoItemService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  comparePaciente = (o1: IPaciente | null, o2: IPaciente | null): boolean => this.pacienteService.comparePaciente(o1, o2);

  compareCatalogoItem = (o1: ICatalogoItem | null, o2: ICatalogoItem | null): boolean =>
    this.catalogoItemService.compareCatalogoItem(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contactoEmergenciaPaciente }) => {
      this.contactoEmergenciaPaciente = contactoEmergenciaPaciente;
      if (contactoEmergenciaPaciente) {
        this.updateForm(contactoEmergenciaPaciente);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contactoEmergenciaPaciente = this.contactoEmergenciaPacienteFormService.getContactoEmergenciaPaciente(this.editForm);
    if (contactoEmergenciaPaciente.id !== null) {
      this.subscribeToSaveResponse(this.contactoEmergenciaPacienteService.update(contactoEmergenciaPaciente));
    } else {
      this.subscribeToSaveResponse(this.contactoEmergenciaPacienteService.create(contactoEmergenciaPaciente));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactoEmergenciaPaciente>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(contactoEmergenciaPaciente: IContactoEmergenciaPaciente): void {
    this.contactoEmergenciaPaciente = contactoEmergenciaPaciente;
    this.contactoEmergenciaPacienteFormService.resetForm(this.editForm, contactoEmergenciaPaciente);

    this.pacientesSharedCollection = this.pacienteService.addPacienteToCollectionIfMissing<IPaciente>(
      this.pacientesSharedCollection,
      contactoEmergenciaPaciente.paciente,
    );
    this.catalogoItemsSharedCollection = this.catalogoItemService.addCatalogoItemToCollectionIfMissing<ICatalogoItem>(
      this.catalogoItemsSharedCollection,
      contactoEmergenciaPaciente.parentezco,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.pacienteService
      .query()
      .pipe(map((res: HttpResponse<IPaciente[]>) => res.body ?? []))
      .pipe(
        map((pacientes: IPaciente[]) =>
          this.pacienteService.addPacienteToCollectionIfMissing<IPaciente>(pacientes, this.contactoEmergenciaPaciente?.paciente),
        ),
      )
      .subscribe((pacientes: IPaciente[]) => (this.pacientesSharedCollection = pacientes));

    this.catalogoItemService
      .query()
      .pipe(map((res: HttpResponse<ICatalogoItem[]>) => res.body ?? []))
      .pipe(
        map((catalogoItems: ICatalogoItem[]) =>
          this.catalogoItemService.addCatalogoItemToCollectionIfMissing<ICatalogoItem>(
            catalogoItems,
            this.contactoEmergenciaPaciente?.parentezco,
          ),
        ),
      )
      .subscribe((catalogoItems: ICatalogoItem[]) => (this.catalogoItemsSharedCollection = catalogoItems));
  }
}
