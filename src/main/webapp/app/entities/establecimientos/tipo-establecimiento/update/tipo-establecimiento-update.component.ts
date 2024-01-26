import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { INivelEstablecimiento } from 'app/entities/establecimientos/nivel-establecimiento/nivel-establecimiento.model';
import { NivelEstablecimientoService } from 'app/entities/establecimientos/nivel-establecimiento/service/nivel-establecimiento.service';
import { ITipoEstablecimiento } from '../tipo-establecimiento.model';
import { TipoEstablecimientoService } from '../service/tipo-establecimiento.service';
import { TipoEstablecimientoFormService, TipoEstablecimientoFormGroup } from './tipo-establecimiento-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tipo-establecimiento-update',
  templateUrl: './tipo-establecimiento-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TipoEstablecimientoUpdateComponent implements OnInit {
  isSaving = false;
  tipoEstablecimiento: ITipoEstablecimiento | null = null;

  nivelEstablecimientosSharedCollection: INivelEstablecimiento[] = [];

  editForm: TipoEstablecimientoFormGroup = this.tipoEstablecimientoFormService.createTipoEstablecimientoFormGroup();

  constructor(
    protected tipoEstablecimientoService: TipoEstablecimientoService,
    protected tipoEstablecimientoFormService: TipoEstablecimientoFormService,
    protected nivelEstablecimientoService: NivelEstablecimientoService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareNivelEstablecimiento = (o1: INivelEstablecimiento | null, o2: INivelEstablecimiento | null): boolean =>
    this.nivelEstablecimientoService.compareNivelEstablecimiento(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoEstablecimiento }) => {
      this.tipoEstablecimiento = tipoEstablecimiento;
      if (tipoEstablecimiento) {
        this.updateForm(tipoEstablecimiento);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoEstablecimiento = this.tipoEstablecimientoFormService.getTipoEstablecimiento(this.editForm);
    if (tipoEstablecimiento.id !== null) {
      this.subscribeToSaveResponse(this.tipoEstablecimientoService.update(tipoEstablecimiento));
    } else {
      this.subscribeToSaveResponse(this.tipoEstablecimientoService.create(tipoEstablecimiento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoEstablecimiento>>): void {
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

  protected updateForm(tipoEstablecimiento: ITipoEstablecimiento): void {
    this.tipoEstablecimiento = tipoEstablecimiento;
    this.tipoEstablecimientoFormService.resetForm(this.editForm, tipoEstablecimiento);

    this.nivelEstablecimientosSharedCollection =
      this.nivelEstablecimientoService.addNivelEstablecimientoToCollectionIfMissing<INivelEstablecimiento>(
        this.nivelEstablecimientosSharedCollection,
        tipoEstablecimiento.nivel,
      );
  }

  protected loadRelationshipsOptions(): void {
    this.nivelEstablecimientoService
      .query()
      .pipe(map((res: HttpResponse<INivelEstablecimiento[]>) => res.body ?? []))
      .pipe(
        map((nivelEstablecimientos: INivelEstablecimiento[]) =>
          this.nivelEstablecimientoService.addNivelEstablecimientoToCollectionIfMissing<INivelEstablecimiento>(
            nivelEstablecimientos,
            this.tipoEstablecimiento?.nivel,
          ),
        ),
      )
      .subscribe((nivelEstablecimientos: INivelEstablecimiento[]) => (this.nivelEstablecimientosSharedCollection = nivelEstablecimientos));
  }
}
