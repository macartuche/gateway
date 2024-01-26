import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBloqueoTurno, NewBloqueoTurno } from '../bloqueo-turno.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBloqueoTurno for edit and NewBloqueoTurnoFormGroupInput for create.
 */
type BloqueoTurnoFormGroupInput = IBloqueoTurno | PartialWithRequiredKeyOf<NewBloqueoTurno>;

type BloqueoTurnoFormDefaults = Pick<NewBloqueoTurno, 'id' | 'activo'>;

type BloqueoTurnoFormGroupContent = {
  id: FormControl<IBloqueoTurno['id'] | NewBloqueoTurno['id']>;
  fecha: FormControl<IBloqueoTurno['fecha']>;
  explicacion: FormControl<IBloqueoTurno['explicacion']>;
  activo: FormControl<IBloqueoTurno['activo']>;
  turno: FormControl<IBloqueoTurno['turno']>;
};

export type BloqueoTurnoFormGroup = FormGroup<BloqueoTurnoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BloqueoTurnoFormService {
  createBloqueoTurnoFormGroup(bloqueoTurno: BloqueoTurnoFormGroupInput = { id: null }): BloqueoTurnoFormGroup {
    const bloqueoTurnoRawValue = {
      ...this.getFormDefaults(),
      ...bloqueoTurno,
    };
    return new FormGroup<BloqueoTurnoFormGroupContent>({
      id: new FormControl(
        { value: bloqueoTurnoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      fecha: new FormControl(bloqueoTurnoRawValue.fecha),
      explicacion: new FormControl(bloqueoTurnoRawValue.explicacion),
      activo: new FormControl(bloqueoTurnoRawValue.activo),
      turno: new FormControl(bloqueoTurnoRawValue.turno),
    });
  }

  getBloqueoTurno(form: BloqueoTurnoFormGroup): IBloqueoTurno | NewBloqueoTurno {
    return form.getRawValue() as IBloqueoTurno | NewBloqueoTurno;
  }

  resetForm(form: BloqueoTurnoFormGroup, bloqueoTurno: BloqueoTurnoFormGroupInput): void {
    const bloqueoTurnoRawValue = { ...this.getFormDefaults(), ...bloqueoTurno };
    form.reset(
      {
        ...bloqueoTurnoRawValue,
        id: { value: bloqueoTurnoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): BloqueoTurnoFormDefaults {
    return {
      id: null,
      activo: false,
    };
  }
}
