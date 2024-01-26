import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFormulario053 } from 'app/entities/serviciosmedicos/formulario-053/formulario-053.model';
import { Formulario053Service } from 'app/entities/serviciosmedicos/formulario-053/service/formulario-053.service';
import { IFormulario053Contrareferencia } from '../formulario-053-contrareferencia.model';
import { Formulario053ContrareferenciaService } from '../service/formulario-053-contrareferencia.service';
import {
  Formulario053ContrareferenciaFormService,
  Formulario053ContrareferenciaFormGroup,
} from './formulario-053-contrareferencia-form.service';

@Component({
  standalone: true,
  selector: 'jhi-formulario-053-contrareferencia-update',
  templateUrl: './formulario-053-contrareferencia-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class Formulario053ContrareferenciaUpdateComponent implements OnInit {
  isSaving = false;
  formulario053Contrareferencia: IFormulario053Contrareferencia | null = null;

  formulario053sSharedCollection: IFormulario053[] = [];

  editForm: Formulario053ContrareferenciaFormGroup =
    this.formulario053ContrareferenciaFormService.createFormulario053ContrareferenciaFormGroup();

  constructor(
    protected formulario053ContrareferenciaService: Formulario053ContrareferenciaService,
    protected formulario053ContrareferenciaFormService: Formulario053ContrareferenciaFormService,
    protected formulario053Service: Formulario053Service,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareFormulario053 = (o1: IFormulario053 | null, o2: IFormulario053 | null): boolean =>
    this.formulario053Service.compareFormulario053(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formulario053Contrareferencia }) => {
      this.formulario053Contrareferencia = formulario053Contrareferencia;
      if (formulario053Contrareferencia) {
        this.updateForm(formulario053Contrareferencia);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const formulario053Contrareferencia = this.formulario053ContrareferenciaFormService.getFormulario053Contrareferencia(this.editForm);
    if (formulario053Contrareferencia.id !== null) {
      this.subscribeToSaveResponse(this.formulario053ContrareferenciaService.update(formulario053Contrareferencia));
    } else {
      this.subscribeToSaveResponse(this.formulario053ContrareferenciaService.create(formulario053Contrareferencia));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormulario053Contrareferencia>>): void {
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

  protected updateForm(formulario053Contrareferencia: IFormulario053Contrareferencia): void {
    this.formulario053Contrareferencia = formulario053Contrareferencia;
    this.formulario053ContrareferenciaFormService.resetForm(this.editForm, formulario053Contrareferencia);

    this.formulario053sSharedCollection = this.formulario053Service.addFormulario053ToCollectionIfMissing<IFormulario053>(
      this.formulario053sSharedCollection,
      formulario053Contrareferencia.formulario,
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
            this.formulario053Contrareferencia?.formulario,
          ),
        ),
      )
      .subscribe((formulario053s: IFormulario053[]) => (this.formulario053sSharedCollection = formulario053s));
  }
}
