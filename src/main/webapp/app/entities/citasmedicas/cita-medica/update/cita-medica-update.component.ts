import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITurno } from 'app/entities/citasmedicas/turno/turno.model';
import { TurnoService } from 'app/entities/citasmedicas/turno/service/turno.service';
import { ICitaMedica } from '../cita-medica.model';
import { CitaMedicaService } from '../service/cita-medica.service';
import { CitaMedicaFormService, CitaMedicaFormGroup } from './cita-medica-form.service';

@Component({
  standalone: true,
  selector: 'jhi-cita-medica-update',
  templateUrl: './cita-medica-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CitaMedicaUpdateComponent implements OnInit {
  isSaving = false;
  citaMedica: ICitaMedica | null = null;

  turnosSharedCollection: ITurno[] = [];

  editForm: CitaMedicaFormGroup = this.citaMedicaFormService.createCitaMedicaFormGroup();

  constructor(
    protected citaMedicaService: CitaMedicaService,
    protected citaMedicaFormService: CitaMedicaFormService,
    protected turnoService: TurnoService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareTurno = (o1: ITurno | null, o2: ITurno | null): boolean => this.turnoService.compareTurno(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ citaMedica }) => {
      this.citaMedica = citaMedica;
      if (citaMedica) {
        this.updateForm(citaMedica);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const citaMedica = this.citaMedicaFormService.getCitaMedica(this.editForm);
    if (citaMedica.id !== null) {
      this.subscribeToSaveResponse(this.citaMedicaService.update(citaMedica));
    } else {
      this.subscribeToSaveResponse(this.citaMedicaService.create(citaMedica));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICitaMedica>>): void {
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

  protected updateForm(citaMedica: ICitaMedica): void {
    this.citaMedica = citaMedica;
    this.citaMedicaFormService.resetForm(this.editForm, citaMedica);

    this.turnosSharedCollection = this.turnoService.addTurnoToCollectionIfMissing<ITurno>(this.turnosSharedCollection, citaMedica.turno);
  }

  protected loadRelationshipsOptions(): void {
    this.turnoService
      .query()
      .pipe(map((res: HttpResponse<ITurno[]>) => res.body ?? []))
      .pipe(map((turnos: ITurno[]) => this.turnoService.addTurnoToCollectionIfMissing<ITurno>(turnos, this.citaMedica?.turno)))
      .subscribe((turnos: ITurno[]) => (this.turnosSharedCollection = turnos));
  }
}
