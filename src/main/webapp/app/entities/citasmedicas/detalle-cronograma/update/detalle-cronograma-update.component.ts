import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICronograma } from 'app/entities/citasmedicas/cronograma/cronograma.model';
import { CronogramaService } from 'app/entities/citasmedicas/cronograma/service/cronograma.service';
import { IDetalleCronograma } from '../detalle-cronograma.model';
import { DetalleCronogramaService } from '../service/detalle-cronograma.service';
import { DetalleCronogramaFormService, DetalleCronogramaFormGroup } from './detalle-cronograma-form.service';

@Component({
  standalone: true,
  selector: 'jhi-detalle-cronograma-update',
  templateUrl: './detalle-cronograma-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DetalleCronogramaUpdateComponent implements OnInit {
  isSaving = false;
  detalleCronograma: IDetalleCronograma | null = null;

  cronogramasSharedCollection: ICronograma[] = [];

  editForm: DetalleCronogramaFormGroup = this.detalleCronogramaFormService.createDetalleCronogramaFormGroup();

  constructor(
    protected detalleCronogramaService: DetalleCronogramaService,
    protected detalleCronogramaFormService: DetalleCronogramaFormService,
    protected cronogramaService: CronogramaService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareCronograma = (o1: ICronograma | null, o2: ICronograma | null): boolean => this.cronogramaService.compareCronograma(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detalleCronograma }) => {
      this.detalleCronograma = detalleCronograma;
      if (detalleCronograma) {
        this.updateForm(detalleCronograma);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const detalleCronograma = this.detalleCronogramaFormService.getDetalleCronograma(this.editForm);
    if (detalleCronograma.id !== null) {
      this.subscribeToSaveResponse(this.detalleCronogramaService.update(detalleCronograma));
    } else {
      this.subscribeToSaveResponse(this.detalleCronogramaService.create(detalleCronograma));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetalleCronograma>>): void {
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

  protected updateForm(detalleCronograma: IDetalleCronograma): void {
    this.detalleCronograma = detalleCronograma;
    this.detalleCronogramaFormService.resetForm(this.editForm, detalleCronograma);

    this.cronogramasSharedCollection = this.cronogramaService.addCronogramaToCollectionIfMissing<ICronograma>(
      this.cronogramasSharedCollection,
      detalleCronograma.cronograma,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cronogramaService
      .query()
      .pipe(map((res: HttpResponse<ICronograma[]>) => res.body ?? []))
      .pipe(
        map((cronogramas: ICronograma[]) =>
          this.cronogramaService.addCronogramaToCollectionIfMissing<ICronograma>(cronogramas, this.detalleCronograma?.cronograma),
        ),
      )
      .subscribe((cronogramas: ICronograma[]) => (this.cronogramasSharedCollection = cronogramas));
  }
}
