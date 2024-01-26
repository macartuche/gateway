import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDiscapacidad } from 'app/entities/discapacidad/discapacidad.model';
import { DiscapacidadService } from 'app/entities/discapacidad/service/discapacidad.service';
import { IPersona } from 'app/entities/persona/persona.model';
import { PersonaService } from 'app/entities/persona/service/persona.service';
import { IParroquiaTerritorio } from 'app/entities/parroquia-territorio/parroquia-territorio.model';
import { ParroquiaTerritorioService } from 'app/entities/parroquia-territorio/service/parroquia-territorio.service';
import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';
import { CatalogoItemService } from 'app/entities/catalogo-item/service/catalogo-item.service';
import { PacienteService } from '../service/paciente.service';
import { IPaciente } from '../paciente.model';
import { PacienteFormService, PacienteFormGroup } from './paciente-form.service';

@Component({
  standalone: true,
  selector: 'jhi-paciente-update',
  templateUrl: './paciente-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class PacienteUpdateComponent implements OnInit {
  isSaving = false;
  paciente: IPaciente | null = null;

  discapacidadsSharedCollection: IDiscapacidad[] = [];
  personasSharedCollection: IPersona[] = [];
  parroquiaTerritoriosSharedCollection: IParroquiaTerritorio[] = [];
  catalogoItemsSharedCollection: ICatalogoItem[] = [];

  editForm: PacienteFormGroup = this.pacienteFormService.createPacienteFormGroup();

  constructor(
    protected pacienteService: PacienteService,
    protected pacienteFormService: PacienteFormService,
    protected discapacidadService: DiscapacidadService,
    protected personaService: PersonaService,
    protected parroquiaTerritorioService: ParroquiaTerritorioService,
    protected catalogoItemService: CatalogoItemService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareDiscapacidad = (o1: IDiscapacidad | null, o2: IDiscapacidad | null): boolean =>
    this.discapacidadService.compareDiscapacidad(o1, o2);

  comparePersona = (o1: IPersona | null, o2: IPersona | null): boolean => this.personaService.comparePersona(o1, o2);

  compareParroquiaTerritorio = (o1: IParroquiaTerritorio | null, o2: IParroquiaTerritorio | null): boolean =>
    this.parroquiaTerritorioService.compareParroquiaTerritorio(o1, o2);

  compareCatalogoItem = (o1: ICatalogoItem | null, o2: ICatalogoItem | null): boolean =>
    this.catalogoItemService.compareCatalogoItem(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paciente }) => {
      this.paciente = paciente;
      if (paciente) {
        this.updateForm(paciente);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paciente = this.pacienteFormService.getPaciente(this.editForm);
    if (paciente.id !== null) {
      this.subscribeToSaveResponse(this.pacienteService.update(paciente));
    } else {
      this.subscribeToSaveResponse(this.pacienteService.create(paciente));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaciente>>): void {
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

  protected updateForm(paciente: IPaciente): void {
    this.paciente = paciente;
    this.pacienteFormService.resetForm(this.editForm, paciente);

    this.discapacidadsSharedCollection = this.discapacidadService.addDiscapacidadToCollectionIfMissing<IDiscapacidad>(
      this.discapacidadsSharedCollection,
      paciente.discapacidad,
    );
    this.personasSharedCollection = this.personaService.addPersonaToCollectionIfMissing<IPersona>(
      this.personasSharedCollection,
      paciente.persona,
    );
    this.parroquiaTerritoriosSharedCollection =
      this.parroquiaTerritorioService.addParroquiaTerritorioToCollectionIfMissing<IParroquiaTerritorio>(
        this.parroquiaTerritoriosSharedCollection,
        paciente.parroquiaNacimiento,
        paciente.parroquiaResidencia,
      );
    this.catalogoItemsSharedCollection = this.catalogoItemService.addCatalogoItemToCollectionIfMissing<ICatalogoItem>(
      this.catalogoItemsSharedCollection,
      paciente.autoidentificacionEtnica,
      paciente.nacionalidadEtnica,
      paciente.pueblo,
      paciente.tipoEmpresaTrabajo,
      paciente.profesionOcupacion,
      paciente.seguroSaludPrincipal,
      paciente.tipoBono,
      paciente.procedenciaRepresentante,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.discapacidadService
      .query()
      .pipe(map((res: HttpResponse<IDiscapacidad[]>) => res.body ?? []))
      .pipe(
        map((discapacidads: IDiscapacidad[]) =>
          this.discapacidadService.addDiscapacidadToCollectionIfMissing<IDiscapacidad>(discapacidads, this.paciente?.discapacidad),
        ),
      )
      .subscribe((discapacidads: IDiscapacidad[]) => (this.discapacidadsSharedCollection = discapacidads));

    this.personaService
      .query()
      .pipe(map((res: HttpResponse<IPersona[]>) => res.body ?? []))
      .pipe(map((personas: IPersona[]) => this.personaService.addPersonaToCollectionIfMissing<IPersona>(personas, this.paciente?.persona)))
      .subscribe((personas: IPersona[]) => (this.personasSharedCollection = personas));

    this.parroquiaTerritorioService
      .query()
      .pipe(map((res: HttpResponse<IParroquiaTerritorio[]>) => res.body ?? []))
      .pipe(
        map((parroquiaTerritorios: IParroquiaTerritorio[]) =>
          this.parroquiaTerritorioService.addParroquiaTerritorioToCollectionIfMissing<IParroquiaTerritorio>(
            parroquiaTerritorios,
            this.paciente?.parroquiaNacimiento,
            this.paciente?.parroquiaResidencia,
          ),
        ),
      )
      .subscribe((parroquiaTerritorios: IParroquiaTerritorio[]) => (this.parroquiaTerritoriosSharedCollection = parroquiaTerritorios));

    this.catalogoItemService
      .query()
      .pipe(map((res: HttpResponse<ICatalogoItem[]>) => res.body ?? []))
      .pipe(
        map((catalogoItems: ICatalogoItem[]) =>
          this.catalogoItemService.addCatalogoItemToCollectionIfMissing<ICatalogoItem>(
            catalogoItems,
            this.paciente?.autoidentificacionEtnica,
            this.paciente?.nacionalidadEtnica,
            this.paciente?.pueblo,
            this.paciente?.tipoEmpresaTrabajo,
            this.paciente?.profesionOcupacion,
            this.paciente?.seguroSaludPrincipal,
            this.paciente?.tipoBono,
            this.paciente?.procedenciaRepresentante,
          ),
        ),
      )
      .subscribe((catalogoItems: ICatalogoItem[]) => (this.catalogoItemsSharedCollection = catalogoItems));
  }
}
