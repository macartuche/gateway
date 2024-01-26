import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDetalleCronograma } from 'app/entities/citasmedicas/detalle-cronograma/detalle-cronograma.model';
import { DetalleCronogramaService } from 'app/entities/citasmedicas/detalle-cronograma/service/detalle-cronograma.service';
import { ITurno } from '../turno.model';
import { TurnoService } from '../service/turno.service';
import { TurnoFormService, TurnoFormGroup } from './turno-form.service';

@Component({
  standalone: true,
  selector: 'jhi-turno-update',
  templateUrl: './turno-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TurnoUpdateComponent implements OnInit {
  isSaving = false;
  turno: ITurno | null = null;

  detalleCronogramasSharedCollection: IDetalleCronograma[] = [];

  editForm: TurnoFormGroup = this.turnoFormService.createTurnoFormGroup();

  constructor(
    protected turnoService: TurnoService,
    protected turnoFormService: TurnoFormService,
    protected detalleCronogramaService: DetalleCronogramaService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareDetalleCronograma = (o1: IDetalleCronograma | null, o2: IDetalleCronograma | null): boolean =>
    this.detalleCronogramaService.compareDetalleCronograma(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ turno }) => {
      this.turno = turno;
      if (turno) {
        this.updateForm(turno);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const turno = this.turnoFormService.getTurno(this.editForm);
    if (turno.id !== null) {
      this.subscribeToSaveResponse(this.turnoService.update(turno));
    } else {
      this.subscribeToSaveResponse(this.turnoService.create(turno));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITurno>>): void {
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

  protected updateForm(turno: ITurno): void {
    this.turno = turno;
    this.turnoFormService.resetForm(this.editForm, turno);

    this.detalleCronogramasSharedCollection = this.detalleCronogramaService.addDetalleCronogramaToCollectionIfMissing<IDetalleCronograma>(
      this.detalleCronogramasSharedCollection,
      turno.detalleCronograma,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.detalleCronogramaService
      .query()
      .pipe(map((res: HttpResponse<IDetalleCronograma[]>) => res.body ?? []))
      .pipe(
        map((detalleCronogramas: IDetalleCronograma[]) =>
          this.detalleCronogramaService.addDetalleCronogramaToCollectionIfMissing<IDetalleCronograma>(
            detalleCronogramas,
            this.turno?.detalleCronograma,
          ),
        ),
      )
      .subscribe((detalleCronogramas: IDetalleCronograma[]) => (this.detalleCronogramasSharedCollection = detalleCronogramas));
  }
}
