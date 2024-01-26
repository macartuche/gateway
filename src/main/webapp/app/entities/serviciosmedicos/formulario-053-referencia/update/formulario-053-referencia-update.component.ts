import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFormulario053 } from 'app/entities/serviciosmedicos/formulario-053/formulario-053.model';
import { Formulario053Service } from 'app/entities/serviciosmedicos/formulario-053/service/formulario-053.service';
import { IFormulario053Referencia } from '../formulario-053-referencia.model';
import { Formulario053ReferenciaService } from '../service/formulario-053-referencia.service';
import { Formulario053ReferenciaFormService, Formulario053ReferenciaFormGroup } from './formulario-053-referencia-form.service';

@Component({
  standalone: true,
  selector: 'jhi-formulario-053-referencia-update',
  templateUrl: './formulario-053-referencia-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class Formulario053ReferenciaUpdateComponent implements OnInit {
  isSaving = false;
  formulario053Referencia: IFormulario053Referencia | null = null;

  formulario053sSharedCollection: IFormulario053[] = [];

  editForm: Formulario053ReferenciaFormGroup = this.formulario053ReferenciaFormService.createFormulario053ReferenciaFormGroup();

  constructor(
    protected formulario053ReferenciaService: Formulario053ReferenciaService,
    protected formulario053ReferenciaFormService: Formulario053ReferenciaFormService,
    protected formulario053Service: Formulario053Service,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareFormulario053 = (o1: IFormulario053 | null, o2: IFormulario053 | null): boolean =>
    this.formulario053Service.compareFormulario053(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formulario053Referencia }) => {
      this.formulario053Referencia = formulario053Referencia;
      if (formulario053Referencia) {
        this.updateForm(formulario053Referencia);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const formulario053Referencia = this.formulario053ReferenciaFormService.getFormulario053Referencia(this.editForm);
    if (formulario053Referencia.id !== null) {
      this.subscribeToSaveResponse(this.formulario053ReferenciaService.update(formulario053Referencia));
    } else {
      this.subscribeToSaveResponse(this.formulario053ReferenciaService.create(formulario053Referencia));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormulario053Referencia>>): void {
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

  protected updateForm(formulario053Referencia: IFormulario053Referencia): void {
    this.formulario053Referencia = formulario053Referencia;
    this.formulario053ReferenciaFormService.resetForm(this.editForm, formulario053Referencia);

    this.formulario053sSharedCollection = this.formulario053Service.addFormulario053ToCollectionIfMissing<IFormulario053>(
      this.formulario053sSharedCollection,
      formulario053Referencia.formulario,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.formulario053Service
      .query()
      .pipe(map((res: HttpResponse<IFormulario053[]>) => res.body ?? []))
      .pipe(
        map((formulario053s: IFormulario053[]) =>
          this.formulario053Service.addFormulario053ToCollectionIfMissing<IFormulario053>(
            formulario053s,
            this.formulario053Referencia?.formulario,
          ),
        ),
      )
      .subscribe((formulario053s: IFormulario053[]) => (this.formulario053sSharedCollection = formulario053s));
  }
}
