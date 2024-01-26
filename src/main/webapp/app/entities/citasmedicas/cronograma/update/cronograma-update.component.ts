import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICronograma } from '../cronograma.model';
import { CronogramaService } from '../service/cronograma.service';
import { CronogramaFormService, CronogramaFormGroup } from './cronograma-form.service';

@Component({
  standalone: true,
  selector: 'jhi-cronograma-update',
  templateUrl: './cronograma-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CronogramaUpdateComponent implements OnInit {
  isSaving = false;
  cronograma: ICronograma | null = null;

  editForm: CronogramaFormGroup = this.cronogramaFormService.createCronogramaFormGroup();

  constructor(
    protected cronogramaService: CronogramaService,
    protected cronogramaFormService: CronogramaFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cronograma }) => {
      this.cronograma = cronograma;
      if (cronograma) {
        this.updateForm(cronograma);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cronograma = this.cronogramaFormService.getCronograma(this.editForm);
    if (cronograma.id !== null) {
      this.subscribeToSaveResponse(this.cronogramaService.update(cronograma));
    } else {
      this.subscribeToSaveResponse(this.cronogramaService.create(cronograma));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICronograma>>): void {
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

  protected updateForm(cronograma: ICronograma): void {
    this.cronograma = cronograma;
    this.cronogramaFormService.resetForm(this.editForm, cronograma);
  }
}
