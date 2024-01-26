import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFormulario053Referencia } from 'app/entities/serviciosmedicos/formulario-053-referencia/formulario-053-referencia.model';
import { Formulario053ReferenciaService } from 'app/entities/serviciosmedicos/formulario-053-referencia/service/formulario-053-referencia.service';
import { IFormulario053Contrareferencia } from 'app/entities/serviciosmedicos/formulario-053-contrareferencia/formulario-053-contrareferencia.model';
import { Formulario053ContrareferenciaService } from 'app/entities/serviciosmedicos/formulario-053-contrareferencia/service/formulario-053-contrareferencia.service';
import { IItemCie } from 'app/entities/serviciosmedicos/item-cie/item-cie.model';
import { ItemCieService } from 'app/entities/serviciosmedicos/item-cie/service/item-cie.service';
import { DiagnosticoFormulario053Service } from '../service/diagnostico-formulario-053.service';
import { IDiagnosticoFormulario053 } from '../diagnostico-formulario-053.model';
import { DiagnosticoFormulario053FormService, DiagnosticoFormulario053FormGroup } from './diagnostico-formulario-053-form.service';

@Component({
  standalone: true,
  selector: 'jhi-diagnostico-formulario-053-update',
  templateUrl: './diagnostico-formulario-053-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DiagnosticoFormulario053UpdateComponent implements OnInit {
  isSaving = false;
  diagnosticoFormulario053: IDiagnosticoFormulario053 | null = null;

  formulario053ReferenciasSharedCollection: IFormulario053Referencia[] = [];
  formulario053ContrareferenciasSharedCollection: IFormulario053Contrareferencia[] = [];
  itemCiesSharedCollection: IItemCie[] = [];

  editForm: DiagnosticoFormulario053FormGroup = this.diagnosticoFormulario053FormService.createDiagnosticoFormulario053FormGroup();

  constructor(
    protected diagnosticoFormulario053Service: DiagnosticoFormulario053Service,
    protected diagnosticoFormulario053FormService: DiagnosticoFormulario053FormService,
    protected formulario053ReferenciaService: Formulario053ReferenciaService,
    protected formulario053ContrareferenciaService: Formulario053ContrareferenciaService,
    protected itemCieService: ItemCieService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareFormulario053Referencia = (o1: IFormulario053Referencia | null, o2: IFormulario053Referencia | null): boolean =>
    this.formulario053ReferenciaService.compareFormulario053Referencia(o1, o2);

  compareFormulario053Contrareferencia = (o1: IFormulario053Contrareferencia | null, o2: IFormulario053Contrareferencia | null): boolean =>
    this.formulario053ContrareferenciaService.compareFormulario053Contrareferencia(o1, o2);

  compareItemCie = (o1: IItemCie | null, o2: IItemCie | null): boolean => this.itemCieService.compareItemCie(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diagnosticoFormulario053 }) => {
      this.diagnosticoFormulario053 = diagnosticoFormulario053;
      if (diagnosticoFormulario053) {
        this.updateForm(diagnosticoFormulario053);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const diagnosticoFormulario053 = this.diagnosticoFormulario053FormService.getDiagnosticoFormulario053(this.editForm);
    if (diagnosticoFormulario053.id !== null) {
      this.subscribeToSaveResponse(this.diagnosticoFormulario053Service.update(diagnosticoFormulario053));
    } else {
      this.subscribeToSaveResponse(this.diagnosticoFormulario053Service.create(diagnosticoFormulario053));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiagnosticoFormulario053>>): void {
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

  protected updateForm(diagnosticoFormulario053: IDiagnosticoFormulario053): void {
    this.diagnosticoFormulario053 = diagnosticoFormulario053;
    this.diagnosticoFormulario053FormService.resetForm(this.editForm, diagnosticoFormulario053);

    this.formulario053ReferenciasSharedCollection =
      this.formulario053ReferenciaService.addFormulario053ReferenciaToCollectionIfMissing<IFormulario053Referencia>(
        this.formulario053ReferenciasSharedCollection,
        diagnosticoFormulario053.referencia,
      );
    this.formulario053ContrareferenciasSharedCollection =
      this.formulario053ContrareferenciaService.addFormulario053ContrareferenciaToCollectionIfMissing<IFormulario053Contrareferencia>(
        this.formulario053ContrareferenciasSharedCollection,
        diagnosticoFormulario053.contrareferencia,
      );
    this.itemCiesSharedCollection = this.itemCieService.addItemCieToCollectionIfMissing<IItemCie>(
      this.itemCiesSharedCollection,
      diagnosticoFormulario053.itemCie,
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
            this.diagnosticoFormulario053?.referencia,
          ),
        ),
      )
      .subscribe(
        (formulario053Referencias: IFormulario053Referencia[]) =>
          (this.formulario053ReferenciasSharedCollection = formulario053Referencias),
      );

    this.formulario053ContrareferenciaService
      .query()
      .pipe(map((res: HttpResponse<IFormulario053Contrareferencia[]>) => res.body ?? []))
      .pipe(
        map((formulario053Contrareferencias: IFormulario053Contrareferencia[]) =>
          this.formulario053ContrareferenciaService.addFormulario053ContrareferenciaToCollectionIfMissing<IFormulario053Contrareferencia>(
            formulario053Contrareferencias,
            this.diagnosticoFormulario053?.contrareferencia,
          ),
        ),
      )
      .subscribe(
        (formulario053Contrareferencias: IFormulario053Contrareferencia[]) =>
          (this.formulario053ContrareferenciasSharedCollection = formulario053Contrareferencias),
      );

    this.itemCieService
      .query()
      .pipe(map((res: HttpResponse<IItemCie[]>) => res.body ?? []))
      .pipe(
        map((itemCies: IItemCie[]) =>
          this.itemCieService.addItemCieToCollectionIfMissing<IItemCie>(itemCies, this.diagnosticoFormulario053?.itemCie),
        ),
      )
      .subscribe((itemCies: IItemCie[]) => (this.itemCiesSharedCollection = itemCies));
  }
}
