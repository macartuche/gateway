import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IHorarioEstablecimiento } from '../horario-establecimiento.model';
import { HorarioEstablecimientoService } from '../service/horario-establecimiento.service';
import { HorarioEstablecimientoFormService, HorarioEstablecimientoFormGroup } from './horario-establecimiento-form.service';

@Component({
  standalone: true,
  selector: 'jhi-horario-establecimiento-update',
  templateUrl: './horario-establecimiento-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class HorarioEstablecimientoUpdateComponent implements OnInit {
  isSaving = false;
  horarioEstablecimiento: IHorarioEstablecimiento | null = null;

  editForm: HorarioEstablecimientoFormGroup = this.horarioEstablecimientoFormService.createHorarioEstablecimientoFormGroup();

  constructor(
    protected horarioEstablecimientoService: HorarioEstablecimientoService,
    protected horarioEstablecimientoFormService: HorarioEstablecimientoFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horarioEstablecimiento }) => {
      this.horarioEstablecimiento = horarioEstablecimiento;
      if (horarioEstablecimiento) {
        this.updateForm(horarioEstablecimiento);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const horarioEstablecimiento = this.horarioEstablecimientoFormService.getHorarioEstablecimiento(this.editForm);
    if (horarioEstablecimiento.id !== null) {
      this.subscribeToSaveResponse(this.horarioEstablecimientoService.update(horarioEstablecimiento));
    } else {
      this.subscribeToSaveResponse(this.horarioEstablecimientoService.create(horarioEstablecimiento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHorarioEstablecimiento>>): void {
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

  protected updateForm(horarioEstablecimiento: IHorarioEstablecimiento): void {
    this.horarioEstablecimiento = horarioEstablecimiento;
    this.horarioEstablecimientoFormService.resetForm(this.editForm, horarioEstablecimiento);
  }
}
