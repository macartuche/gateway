import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITramite } from 'app/entities/serviciosmedicos/tramite/tramite.model';
import { TramiteService } from 'app/entities/serviciosmedicos/tramite/service/tramite.service';
import { IProcedimiento } from '../procedimiento.model';
import { ProcedimientoService } from '../service/procedimiento.service';
import { ProcedimientoFormService, ProcedimientoFormGroup } from './procedimiento-form.service';

@Component({
  standalone: true,
  selector: 'jhi-procedimiento-update',
  templateUrl: './procedimiento-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProcedimientoUpdateComponent implements OnInit {
  isSaving = false;
  procedimiento: IProcedimiento | null = null;

  tramitesSharedCollection: ITramite[] = [];

  editForm: ProcedimientoFormGroup = this.procedimientoFormService.createProcedimientoFormGroup();

  constructor(
    protected procedimientoService: ProcedimientoService,
    protected procedimientoFormService: ProcedimientoFormService,
    protected tramiteService: TramiteService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareTramite = (o1: ITramite | null, o2: ITramite | null): boolean => this.tramiteService.compareTramite(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ procedimiento }) => {
      this.procedimiento = procedimiento;
      if (procedimiento) {
        this.updateForm(procedimiento);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const procedimiento = this.procedimientoFormService.getProcedimiento(this.editForm);
    if (procedimiento.id !== null) {
      this.subscribeToSaveResponse(this.procedimientoService.update(procedimiento));
    } else {
      this.subscribeToSaveResponse(this.procedimientoService.create(procedimiento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProcedimiento>>): void {
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

  protected updateForm(procedimiento: IProcedimiento): void {
    this.procedimiento = procedimiento;
    this.procedimientoFormService.resetForm(this.editForm, procedimiento);

    this.tramitesSharedCollection = this.tramiteService.addTramiteToCollectionIfMissing<ITramite>(
      this.tramitesSharedCollection,
      procedimiento.tramite,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tramiteService
      .query()
      .pipe(map((res: HttpResponse<ITramite[]>) => res.body ?? []))
      .pipe(
        map((tramites: ITramite[]) => this.tramiteService.addTramiteToCollectionIfMissing<ITramite>(tramites, this.procedimiento?.tramite)),
      )
      .subscribe((tramites: ITramite[]) => (this.tramitesSharedCollection = tramites));
  }
}
