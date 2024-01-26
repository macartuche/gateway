import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFormulario053 } from '../formulario-053.model';
import { Formulario053Service } from '../service/formulario-053.service';
import { Formulario053FormService, Formulario053FormGroup } from './formulario-053-form.service';

@Component({
  standalone: true,
  selector: 'jhi-formulario-053-update',
  templateUrl: './formulario-053-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class Formulario053UpdateComponent implements OnInit {
  isSaving = false;
  formulario053: IFormulario053 | null = null;

  editForm: Formulario053FormGroup = this.formulario053FormService.createFormulario053FormGroup();

  constructor(
    protected formulario053Service: Formulario053Service,
    protected formulario053FormService: Formulario053FormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formulario053 }) => {
      this.formulario053 = formulario053;
      if (formulario053) {
        this.updateForm(formulario053);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const formulario053 = this.formulario053FormService.getFormulario053(this.editForm);
    if (formulario053.id !== null) {
      this.subscribeToSaveResponse(this.formulario053Service.update(formulario053));
    } else {
      this.subscribeToSaveResponse(this.formulario053Service.create(formulario053));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormulario053>>): void {
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

  protected updateForm(formulario053: IFormulario053): void {
    this.formulario053 = formulario053;
    this.formulario053FormService.resetForm(this.editForm, formulario053);
  }
}
