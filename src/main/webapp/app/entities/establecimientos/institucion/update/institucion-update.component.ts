import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IInstitucion } from '../institucion.model';
import { InstitucionService } from '../service/institucion.service';
import { InstitucionFormService, InstitucionFormGroup } from './institucion-form.service';

@Component({
  standalone: true,
  selector: 'jhi-institucion-update',
  templateUrl: './institucion-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class InstitucionUpdateComponent implements OnInit {
  isSaving = false;
  institucion: IInstitucion | null = null;

  editForm: InstitucionFormGroup = this.institucionFormService.createInstitucionFormGroup();

  constructor(
    protected institucionService: InstitucionService,
    protected institucionFormService: InstitucionFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ institucion }) => {
      this.institucion = institucion;
      if (institucion) {
        this.updateForm(institucion);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const institucion = this.institucionFormService.getInstitucion(this.editForm);
    if (institucion.id !== null) {
      this.subscribeToSaveResponse(this.institucionService.update(institucion));
    } else {
      this.subscribeToSaveResponse(this.institucionService.create(institucion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInstitucion>>): void {
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

  protected updateForm(institucion: IInstitucion): void {
    this.institucion = institucion;
    this.institucionFormService.resetForm(this.editForm, institucion);
  }
}
