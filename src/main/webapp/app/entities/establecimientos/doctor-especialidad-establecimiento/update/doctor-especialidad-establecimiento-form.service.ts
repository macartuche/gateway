import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDoctorEspecialidadEstablecimiento, NewDoctorEspecialidadEstablecimiento } from '../doctor-especialidad-establecimiento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDoctorEspecialidadEstablecimiento for edit and NewDoctorEspecialidadEstablecimientoFormGroupInput for create.
 */
type DoctorEspecialidadEstablecimientoFormGroupInput =
  | IDoctorEspecialidadEstablecimiento
  | PartialWithRequiredKeyOf<NewDoctorEspecialidadEstablecimiento>;

type DoctorEspecialidadEstablecimientoFormDefaults = Pick<NewDoctorEspecialidadEstablecimiento, 'id' | 'activo'>;

type DoctorEspecialidadEstablecimientoFormGroupContent = {
  id: FormControl<IDoctorEspecialidadEstablecimiento['id'] | NewDoctorEspecialidadEstablecimiento['id']>;
  activo: FormControl<IDoctorEspecialidadEstablecimiento['activo']>;
  doctorId: FormControl<IDoctorEspecialidadEstablecimiento['doctorId']>;
  especialidadId: FormControl<IDoctorEspecialidadEstablecimiento['especialidadId']>;
  establecimiento: FormControl<IDoctorEspecialidadEstablecimiento['establecimiento']>;
};

export type DoctorEspecialidadEstablecimientoFormGroup = FormGroup<DoctorEspecialidadEstablecimientoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DoctorEspecialidadEstablecimientoFormService {
  createDoctorEspecialidadEstablecimientoFormGroup(
    doctorEspecialidadEstablecimiento: DoctorEspecialidadEstablecimientoFormGroupInput = { id: null },
  ): DoctorEspecialidadEstablecimientoFormGroup {
    const doctorEspecialidadEstablecimientoRawValue = {
      ...this.getFormDefaults(),
      ...doctorEspecialidadEstablecimiento,
    };
    return new FormGroup<DoctorEspecialidadEstablecimientoFormGroupContent>({
      id: new FormControl(
        { value: doctorEspecialidadEstablecimientoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      activo: new FormControl(doctorEspecialidadEstablecimientoRawValue.activo),
      doctorId: new FormControl(doctorEspecialidadEstablecimientoRawValue.doctorId, {
        validators: [Validators.required],
      }),
      especialidadId: new FormControl(doctorEspecialidadEstablecimientoRawValue.especialidadId, {
        validators: [Validators.required],
      }),
      establecimiento: new FormControl(doctorEspecialidadEstablecimientoRawValue.establecimiento, {
        validators: [Validators.required],
      }),
    });
  }

  getDoctorEspecialidadEstablecimiento(
    form: DoctorEspecialidadEstablecimientoFormGroup,
  ): IDoctorEspecialidadEstablecimiento | NewDoctorEspecialidadEstablecimiento {
    return form.getRawValue() as IDoctorEspecialidadEstablecimiento | NewDoctorEspecialidadEstablecimiento;
  }

  resetForm(
    form: DoctorEspecialidadEstablecimientoFormGroup,
    doctorEspecialidadEstablecimiento: DoctorEspecialidadEstablecimientoFormGroupInput,
  ): void {
    const doctorEspecialidadEstablecimientoRawValue = { ...this.getFormDefaults(), ...doctorEspecialidadEstablecimiento };
    form.reset(
      {
        ...doctorEspecialidadEstablecimientoRawValue,
        id: { value: doctorEspecialidadEstablecimientoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DoctorEspecialidadEstablecimientoFormDefaults {
    return {
      id: null,
      activo: false,
    };
  }
}
