import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IPersona } from 'app/entities/persona/persona.model';
import { PersonaService } from 'app/entities/persona/service/persona.service';
import { IDoctor } from '../doctor.model';
import { DoctorService } from '../service/doctor.service';
import { DoctorFormService, DoctorFormGroup } from './doctor-form.service';

@Component({
  standalone: true,
  selector: 'jhi-doctor-update',
  templateUrl: './doctor-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DoctorUpdateComponent implements OnInit {
  isSaving = false;
  doctor: IDoctor | null = null;

  personasSharedCollection: IPersona[] = [];

  editForm: DoctorFormGroup = this.doctorFormService.createDoctorFormGroup();

  constructor(
    protected doctorService: DoctorService,
    protected doctorFormService: DoctorFormService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  comparePersona = (o1: IPersona | null, o2: IPersona | null): boolean => this.personaService.comparePersona(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doctor }) => {
      this.doctor = doctor;
      if (doctor) {
        this.updateForm(doctor);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const doctor = this.doctorFormService.getDoctor(this.editForm);
    if (doctor.id !== null) {
      this.subscribeToSaveResponse(this.doctorService.update(doctor));
    } else {
      this.subscribeToSaveResponse(this.doctorService.create(doctor));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDoctor>>): void {
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

  protected updateForm(doctor: IDoctor): void {
    this.doctor = doctor;
    this.doctorFormService.resetForm(this.editForm, doctor);

    this.personasSharedCollection = this.personaService.addPersonaToCollectionIfMissing<IPersona>(
      this.personasSharedCollection,
      doctor.persona,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.personaService
      .query()
      .pipe(map((res: HttpResponse<IPersona[]>) => res.body ?? []))
      .pipe(map((personas: IPersona[]) => this.personaService.addPersonaToCollectionIfMissing<IPersona>(personas, this.doctor?.persona)))
      .subscribe((personas: IPersona[]) => (this.personasSharedCollection = personas));
  }
}
