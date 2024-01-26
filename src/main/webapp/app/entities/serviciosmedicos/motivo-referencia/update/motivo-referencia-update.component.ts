import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFormulario053Referencia } from 'app/entities/serviciosmedicos/formulario-053-referencia/formulario-053-referencia.model';
import { Formulario053ReferenciaService } from 'app/entities/serviciosmedicos/formulario-053-referencia/service/formulario-053-referencia.service';
import { IMotivoReferencia } from '../motivo-referencia.model';
import { MotivoReferenciaService } from '../service/motivo-referencia.service';
import { MotivoReferenciaFormService, MotivoReferenciaFormGroup } from './motivo-referencia-form.service';

@Component({
  standalone: true,
  selector: 'jhi-motivo-referencia-update',
  templateUrl: './motivo-referencia-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class MotivoReferenciaUpdateComponent implements OnInit {
  isSaving = false;
  motivoReferencia: IMotivoReferencia | null = null;

  formulario053ReferenciasSharedCollection: IFormulario053Referencia[] = [];

  editForm: MotivoReferenciaFormGroup = this.motivoReferenciaFormService.createMotivoReferenciaFormGroup();

  constructor(
    protected motivoReferenciaService: MotivoReferenciaService,
    protected motivoReferenciaFormService: MotivoReferenciaFormService,
    protected formulario053ReferenciaService: Formulario053ReferenciaService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareFormulario053Referencia = (o1: IFormulario053Referencia | null, o2: IFormulario053Referencia | null): boolean =>
    this.formulario053ReferenciaService.compareFormulario053Referencia(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ motivoReferencia }) => {
      this.motivoReferencia = motivoReferencia;
      if (motivoReferencia) {
        this.updateForm(motivoReferencia);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const motivoReferencia = this.motivoReferenciaFormService.getMotivoReferencia(this.editForm);
    if (motivoReferencia.id !== null) {
      this.subscribeToSaveResponse(this.motivoReferenciaService.update(motivoReferencia));
    } else {
      this.subscribeToSaveResponse(this.motivoReferenciaService.create(motivoReferencia));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMotivoReferencia>>): void {
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

  protected updateForm(motivoReferencia: IMotivoReferencia): void {
    this.motivoReferencia = motivoReferencia;
    this.motivoReferenciaFormService.resetForm(this.editForm, motivoReferencia);

    this.formulario053ReferenciasSharedCollection =
      this.formulario053ReferenciaService.addFormulario053ReferenciaToCollectionIfMissing<IFormulario053Referencia>(
        this.formulario053ReferenciasSharedCollection,
        motivoReferencia.referencia,
      );
  }

  protected loadRelationshipsOptions(): void {
    this.formulario053ReferenciaService
      .query()
      .pipe(map((res: HttpResponse<IFormulario053Referencia[]>) => res.body ?? []))
      .pipe(
        map((formulario053Referencias: IFormulario053Referencia[]) =>
          this.formulario053ReferenciaService.addFormulario053ReferenciaToCollectionIfMissing<IFormulario053Referencia>(
            formulario053Referencias,
            this.motivoReferencia?.referencia,
          ),
        ),
      )
      .subscribe(
        (formulario053Referencias: IFormulario053Referencia[]) =>
          (this.formulario053ReferenciasSharedCollection = formulario053Referencias),
      );
  }
}
