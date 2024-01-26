import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDetalleCronograma, NewDetalleCronograma } from '../detalle-cronograma.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDetalleCronograma for edit and NewDetalleCronogramaFormGroupInput for create.
 */
type DetalleCronogramaFormGroupInput = IDetalleCronograma | PartialWithRequiredKeyOf<NewDetalleCronograma>;

type DetalleCronogramaFormDefaults = Pick<NewDetalleCronograma, 'id' | 'activo'>;

type DetalleCronogramaFormGroupContent = {
  id: FormControl<IDetalleCronograma['id'] | NewDetalleCronograma['id']>;
  fecha: FormControl<IDetalleCronograma['fecha']>;
  cantidad: FormControl<IDetalleCronograma['cantidad']>;
  activo: FormControl<IDetalleCronograma['activo']>;
  fechaDesactivacion: FormControl<IDetalleCronograma['fechaDesactivacion']>;
  tipoId: FormControl<IDetalleCronograma['tipoId']>;
  cronograma: FormControl<IDetalleCronograma['cronograma']>;
};

export type DetalleCronogramaFormGroup = FormGroup<DetalleCronogramaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DetalleCronogramaFormService {
  createDetalleCronogramaFormGroup(detalleCronograma: DetalleCronogramaFormGroupInput = { id: null }): DetalleCronogramaFormGroup {
    const detalleCronogramaRawValue = {
      ...this.getFormDefaults(),
      ...detalleCronograma,
    };
    return new FormGroup<DetalleCronogramaFormGroupContent>({
      id: new FormControl(
        { value: detalleCronogramaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      fecha: new FormControl(detalleCronogramaRawValue.fecha, {
        validators: [Validators.required],
      }),
      cantidad: new FormControl(detalleCronogramaRawValue.cantidad),
      activo: new FormControl(detalleCronogramaRawValue.activo),
      fechaDesactivacion: new FormControl(detalleCronogramaRawValue.fechaDesactivacion),
      tipoId: new FormControl(detalleCronogramaRawValue.tipoId, {
        validators: [Validators.required],
      }),
      cronograma: new FormControl(detalleCronogramaRawValue.cronograma),
    });
  }

  getDetalleCronograma(form: DetalleCronogramaFormGroup): IDetalleCronograma | NewDetalleCronograma {
    return form.getRawValue() as IDetalleCronograma | NewDetalleCronograma;
  }

  resetForm(form: DetalleCronogramaFormGroup, detalleCronograma: DetalleCronogramaFormGroupInput): void {
    const detalleCronogramaRawValue = { ...this.getFormDefaults(), ...detalleCronograma };
    form.reset(
      {
        ...detalleCronogramaRawValue,
        id: { value: detalleCronogramaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DetalleCronogramaFormDefaults {
    return {
      id: null,
      activo: false,
    };
  }
}
