import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICronograma, NewCronograma } from '../cronograma.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICronograma for edit and NewCronogramaFormGroupInput for create.
 */
type CronogramaFormGroupInput = ICronograma | PartialWithRequiredKeyOf<NewCronograma>;

type CronogramaFormDefaults = Pick<NewCronograma, 'id' | 'activo'>;

type CronogramaFormGroupContent = {
  id: FormControl<ICronograma['id'] | NewCronograma['id']>;
  fechaInicio: FormControl<ICronograma['fechaInicio']>;
  fechaFin: FormControl<ICronograma['fechaFin']>;
  activo: FormControl<ICronograma['activo']>;
  especialidadId: FormControl<ICronograma['especialidadId']>;
  doctorId: FormControl<ICronograma['doctorId']>;
  establecimientoId: FormControl<ICronograma['establecimientoId']>;
};

export type CronogramaFormGroup = FormGroup<CronogramaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CronogramaFormService {
  createCronogramaFormGroup(cronograma: CronogramaFormGroupInput = { id: null }): CronogramaFormGroup {
    const cronogramaRawValue = {
      ...this.getFormDefaults(),
      ...cronograma,
    };
    return new FormGroup<CronogramaFormGroupContent>({
      id: new FormControl(
        { value: cronogramaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      fechaInicio: new FormControl(cronogramaRawValue.fechaInicio, {
        validators: [Validators.required],
      }),
      fechaFin: new FormControl(cronogramaRawValue.fechaFin, {
        validators: [Validators.required],
      }),
      activo: new FormControl(cronogramaRawValue.activo, {
        validators: [Validators.required],
      }),
      especialidadId: new FormControl(cronogramaRawValue.especialidadId, {
        validators: [Validators.required],
      }),
      doctorId: new FormControl(cronogramaRawValue.doctorId, {
        validators: [Validators.required],
      }),
      establecimientoId: new FormControl(cronogramaRawValue.establecimientoId, {
        validators: [Validators.required],
      }),
    });
  }

  getCronograma(form: CronogramaFormGroup): ICronograma | NewCronograma {
    return form.getRawValue() as ICronograma | NewCronograma;
  }

  resetForm(form: CronogramaFormGroup, cronograma: CronogramaFormGroupInput): void {
    const cronogramaRawValue = { ...this.getFormDefaults(), ...cronograma };
    form.reset(
      {
        ...cronogramaRawValue,
        id: { value: cronogramaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CronogramaFormDefaults {
    return {
      id: null,
      activo: false,
    };
  }
}
