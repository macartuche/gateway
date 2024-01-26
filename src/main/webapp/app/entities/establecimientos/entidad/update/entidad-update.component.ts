import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IEntidad } from '../entidad.model';
import { EntidadService } from '../service/entidad.service';
import { EntidadFormService, EntidadFormGroup } from './entidad-form.service';

@Component({
  standalone: true,
  selector: 'jhi-entidad-update',
  templateUrl: './entidad-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class EntidadUpdateComponent implements OnInit {
  isSaving = false;
  entidad: IEntidad | null = null;

  editForm: EntidadFormGroup = this.entidadFormService.createEntidadFormGroup();

  constructor(
    protected entidadService: EntidadService,
    protected entidadFormService: EntidadFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entidad }) => {
      this.entidad = entidad;
      if (entidad) {
        this.updateForm(entidad);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entidad = this.entidadFormService.getEntidad(this.editForm);
    if (entidad.id !== null) {
      this.subscribeToSaveResponse(this.entidadService.update(entidad));
    } else {
      this.subscribeToSaveResponse(this.entidadService.create(entidad));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntidad>>): void {
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

  protected updateForm(entidad: IEntidad): void {
    this.entidad = entidad;
    this.entidadFormService.resetForm(this.editForm, entidad);
  }
}
