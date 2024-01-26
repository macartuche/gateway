import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProcedimiento, NewProcedimiento } from '../procedimiento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProcedimiento for edit and NewProcedimientoFormGroupInput for create.
 */
type ProcedimientoFormGroupInput = IProcedimiento | PartialWithRequiredKeyOf<NewProcedimiento>;

type ProcedimientoFormDefaults = Pick<NewProcedimiento, 'id'>;

type ProcedimientoFormGroupContent = {
  id: FormControl<IProcedimiento['id'] | NewProcedimiento['id']>;
  fecha: FormControl<IProcedimiento['fecha']>;
  observacion: FormControl<IProcedimiento['observacion']>;
  estadoId: FormControl<IProcedimiento['estadoId']>;
  usuarioId: FormControl<IProcedimiento['usuarioId']>;
  tramite: FormControl<IProcedimiento['tramite']>;
};

export type ProcedimientoFormGroup = FormGroup<ProcedimientoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProcedimientoFormService {
  createProcedimientoFormGroup(procedimiento: ProcedimientoFormGroupInput = { id: null }): ProcedimientoFormGroup {
    const procedimientoRawValue = {
      ...this.getFormDefaults(),
      ...procedimiento,
    };
    return new FormGroup<ProcedimientoFormGroupContent>({
      id: new FormControl(
        { value: procedimientoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      fecha: new FormControl(procedimientoRawValue.fecha, {
        validators: [Validators.required],
      }),
      observacion: new FormControl(procedimientoRawValue.observacion),
      estadoId: new FormControl(procedimientoRawValue.estadoId, {
        validators: [Validators.required],
      }),
      usuarioId: new FormControl(procedimientoRawValue.usuarioId, {
        validators: [Validators.required],
      }),
      tramite: new FormControl(procedimientoRawValue.tramite, {
        validators: [Validators.required],
      }),
    });
  }

  getProcedimiento(form: ProcedimientoFormGroup): IProcedimiento | NewProcedimiento {
    return form.getRawValue() as IProcedimiento | NewProcedimiento;
  }

  resetForm(form: ProcedimientoFormGroup, procedimiento: ProcedimientoFormGroupInput): void {
    const procedimientoRawValue = { ...this.getFormDefaults(), ...procedimiento };
    form.reset(
      {
        ...procedimientoRawValue,
        id: { value: procedimientoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProcedimientoFormDefaults {
    return {
      id: null,
    };
  }
}
