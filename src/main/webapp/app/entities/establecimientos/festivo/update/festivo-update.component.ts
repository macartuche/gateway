import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFestivo } from '../festivo.model';
import { FestivoService } from '../service/festivo.service';
import { FestivoFormService, FestivoFormGroup } from './festivo-form.service';

@Component({
  standalone: true,
  selector: 'jhi-festivo-update',
  templateUrl: './festivo-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class FestivoUpdateComponent implements OnInit {
  isSaving = false;
  festivo: IFestivo | null = null;

  editForm: FestivoFormGroup = this.festivoFormService.createFestivoFormGroup();

  constructor(
    protected festivoService: FestivoService,
    protected festivoFormService: FestivoFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ festivo }) => {
      this.festivo = festivo;
      if (festivo) {
        this.updateForm(festivo);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const festivo = this.festivoFormService.getFestivo(this.editForm);
    if (festivo.id !== null) {
      this.subscribeToSaveResponse(this.festivoService.update(festivo));
    } else {
      this.subscribeToSaveResponse(this.festivoService.create(festivo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFestivo>>): void {
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

  protected updateForm(festivo: IFestivo): void {
    this.festivo = festivo;
    this.festivoFormService.resetForm(this.editForm, festivo);
  }
}
