import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITurno } from 'app/entities/citasmedicas/turno/turno.model';
import { TurnoService } from 'app/entities/citasmedicas/turno/service/turno.service';
import { IBloqueoTurno } from '../bloqueo-turno.model';
import { BloqueoTurnoService } from '../service/bloqueo-turno.service';
import { BloqueoTurnoFormService, BloqueoTurnoFormGroup } from './bloqueo-turno-form.service';

@Component({
  standalone: true,
  selector: 'jhi-bloqueo-turno-update',
  templateUrl: './bloqueo-turno-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class BloqueoTurnoUpdateComponent implements OnInit {
  isSaving = false;
  bloqueoTurno: IBloqueoTurno | null = null;

  turnosSharedCollection: ITurno[] = [];

  editForm: BloqueoTurnoFormGroup = this.bloqueoTurnoFormService.createBloqueoTurnoFormGroup();

  constructor(
    protected bloqueoTurnoService: BloqueoTurnoService,
    protected bloqueoTurnoFormService: BloqueoTurnoFormService,
    protected turnoService: TurnoService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareTurno = (o1: ITurno | null, o2: ITurno | null): boolean => this.turnoService.compareTurno(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bloqueoTurno }) => {
      this.bloqueoTurno = bloqueoTurno;
      if (bloqueoTurno) {
        this.updateForm(bloqueoTurno);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bloqueoTurno = this.bloqueoTurnoFormService.getBloqueoTurno(this.editForm);
    if (bloqueoTurno.id !== null) {
      this.subscribeToSaveResponse(this.bloqueoTurnoService.update(bloqueoTurno));
    } else {
      this.subscribeToSaveResponse(this.bloqueoTurnoService.create(bloqueoTurno));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBloqueoTurno>>): void {
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

  protected updateForm(bloqueoTurno: IBloqueoTurno): void {
    this.bloqueoTurno = bloqueoTurno;
    this.bloqueoTurnoFormService.resetForm(this.editForm, bloqueoTurno);

    this.turnosSharedCollection = this.turnoService.addTurnoToCollectionIfMissing<ITurno>(this.turnosSharedCollection, bloqueoTurno.turno);
  }

  protected loadRelationshipsOptions(): void {
    this.turnoService
      .query()
      .pipe(map((res: HttpResponse<ITurno[]>) => res.body ?? []))
      .pipe(map((turnos: ITurno[]) => this.turnoService.addTurnoToCollectionIfMissing<ITurno>(turnos, this.bloqueoTurno?.turno)))
      .subscribe((turnos: ITurno[]) => (this.turnosSharedCollection = turnos));
  }
}
