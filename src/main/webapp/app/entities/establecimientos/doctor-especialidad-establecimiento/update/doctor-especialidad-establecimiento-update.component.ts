import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IEstablecimiento } from 'app/entities/establecimientos/establecimiento/establecimiento.model';
import { EstablecimientoService } from 'app/entities/establecimientos/establecimiento/service/establecimiento.service';
import { IDoctorEspecialidadEstablecimiento } from '../doctor-especialidad-establecimiento.model';
import { DoctorEspecialidadEstablecimientoService } from '../service/doctor-especialidad-establecimiento.service';
import {
  DoctorEspecialidadEstablecimientoFormService,
  DoctorEspecialidadEstablecimientoFormGroup,
} from './doctor-especialidad-establecimiento-form.service';

@Component({
  standalone: true,
  selector: 'jhi-doctor-especialidad-establecimiento-update',
  templateUrl: './doctor-especialidad-establecimiento-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DoctorEspecialidadEstablecimientoUpdateComponent implements OnInit {
  isSaving = false;
  doctorEspecialidadEstablecimiento: IDoctorEspecialidadEstablecimiento | null = null;

  establecimientosSharedCollection: IEstablecimiento[] = [];

  editForm: DoctorEspecialidadEstablecimientoFormGroup =
    this.doctorEspecialidadEstablecimientoFormService.createDoctorEspecialidadEstablecimientoFormGroup();

  constructor(
    protected doctorEspecialidadEstablecimientoService: DoctorEspecialidadEstablecimientoService,
    protected doctorEspecialidadEstablecimientoFormService: DoctorEspecialidadEstablecimientoFormService,
    protected establecimientoService: EstablecimientoService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareEstablecimiento = (o1: IEstablecimiento | null, o2: IEstablecimiento | null): boolean =>
    this.establecimientoService.compareEstablecimiento(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doctorEspecialidadEstablecimiento }) => {
      this.doctorEspecialidadEstablecimiento = doctorEspecialidadEstablecimiento;
      if (doctorEspecialidadEstablecimiento) {
        this.updateForm(doctorEspecialidadEstablecimiento);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const doctorEspecialidadEstablecimiento = this.doctorEspecialidadEstablecimientoFormService.getDoctorEspecialidadEstablecimiento(
      this.editForm,
    );
    if (doctorEspecialidadEstablecimiento.id !== null) {
      this.subscribeToSaveResponse(this.doctorEspecialidadEstablecimientoService.update(doctorEspecialidadEstablecimiento));
    } else {
      this.subscribeToSaveResponse(this.doctorEspecialidadEstablecimientoService.create(doctorEspecialidadEstablecimiento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDoctorEspecialidadEstablecimiento>>): void {
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

  protected updateForm(doctorEspecialidadEstablecimiento: IDoctorEspecialidadEstablecimiento): void {
    this.doctorEspecialidadEstablecimiento = doctorEspecialidadEstablecimiento;
    this.doctorEspecialidadEstablecimientoFormService.resetForm(this.editForm, doctorEspecialidadEstablecimiento);

    this.establecimientosSharedCollection = this.establecimientoService.addEstablecimientoToCollectionIfMissing<IEstablecimiento>(
      this.establecimientosSharedCollection,
      doctorEspecialidadEstablecimiento.establecimiento,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.establecimientoService
      .query()
      .pipe(map((res: HttpResponse<IEstablecimiento[]>) => res.body ?? []))
      .pipe(
        map((establecimientos: IEstablecimiento[]) =>
          this.establecimientoService.addEstablecimientoToCollectionIfMissing<IEstablecimiento>(
            establecimientos,
            this.doctorEspecialidadEstablecimiento?.establecimiento,
          ),
        ),
      )
      .subscribe((establecimientos: IEstablecimiento[]) => (this.establecimientosSharedCollection = establecimientos));
  }
}
