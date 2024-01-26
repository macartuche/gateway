import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { INivelEstablecimiento } from '../nivel-establecimiento.model';
import { NivelEstablecimientoService } from '../service/nivel-establecimiento.service';
import { NivelEstablecimientoFormService, NivelEstablecimientoFormGroup } from './nivel-establecimiento-form.service';

@Component({
  standalone: true,
  selector: 'jhi-nivel-establecimiento-update',
  templateUrl: './nivel-establecimiento-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class NivelEstablecimientoUpdateComponent implements OnInit {
  isSaving = false;
  nivelEstablecimiento: INivelEstablecimiento | null = null;

  editForm: NivelEstablecimientoFormGroup = this.nivelEstablecimientoFormService.createNivelEstablecimientoFormGroup();

  constructor(
    protected nivelEstablecimientoService: NivelEstablecimientoService,
    protected nivelEstablecimientoFormService: NivelEstablecimientoFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nivelEstablecimiento }) => {
      this.nivelEstablecimiento = nivelEstablecimiento;
      if (nivelEstablecimiento) {
        this.updateForm(nivelEstablecimiento);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nivelEstablecimiento = this.nivelEstablecimientoFormService.getNivelEstablecimiento(this.editForm);
    if (nivelEstablecimiento.id !== null) {
      this.subscribeToSaveResponse(this.nivelEstablecimientoService.update(nivelEstablecimiento));
    } else {
      this.subscribeToSaveResponse(this.nivelEstablecimientoService.create(nivelEstablecimiento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INivelEstablecimiento>>): void {
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

  protected updateForm(nivelEstablecimiento: INivelEstablecimiento): void {
    this.nivelEstablecimiento = nivelEstablecimiento;
    this.nivelEstablecimientoFormService.resetForm(this.editForm, nivelEstablecimiento);
  }
}
