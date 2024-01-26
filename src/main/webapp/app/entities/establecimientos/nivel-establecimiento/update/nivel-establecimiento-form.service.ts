import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { INivelEstablecimiento, NewNivelEstablecimiento } from '../nivel-establecimiento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INivelEstablecimiento for edit and NewNivelEstablecimientoFormGroupInput for create.
 */
type NivelEstablecimientoFormGroupInput = INivelEstablecimiento | PartialWithRequiredKeyOf<NewNivelEstablecimiento>;

type NivelEstablecimientoFormDefaults = Pick<NewNivelEstablecimiento, 'id'>;

type NivelEstablecimientoFormGroupContent = {
  id: FormControl<INivelEstablecimiento['id'] | NewNivelEstablecimiento['id']>;
  codigo: FormControl<INivelEstablecimiento['codigo']>;
  nombre: FormControl<INivelEstablecimiento['nombre']>;
  descripcion: FormControl<INivelEstablecimiento['descripcion']>;
};

export type NivelEstablecimientoFormGroup = FormGroup<NivelEstablecimientoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NivelEstablecimientoFormService {
  createNivelEstablecimientoFormGroup(
    nivelEstablecimiento: NivelEstablecimientoFormGroupInput = { id: null },
  ): NivelEstablecimientoFormGroup {
    const nivelEstablecimientoRawValue = {
      ...this.getFormDefaults(),
      ...nivelEstablecimiento,
    };
    return new FormGroup<NivelEstablecimientoFormGroupContent>({
      id: new FormControl(
        { value: nivelEstablecimientoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigo: new FormControl(nivelEstablecimientoRawValue.codigo),
      nombre: new FormControl(nivelEstablecimientoRawValue.nombre, {
        validators: [Validators.required],
      }),
      descripcion: new FormControl(nivelEstablecimientoRawValue.descripcion),
    });
  }

  getNivelEstablecimiento(form: NivelEstablecimientoFormGroup): INivelEstablecimiento | NewNivelEstablecimiento {
    return form.getRawValue() as INivelEstablecimiento | NewNivelEstablecimiento;
  }

  resetForm(form: NivelEstablecimientoFormGroup, nivelEstablecimiento: NivelEstablecimientoFormGroupInput): void {
    const nivelEstablecimientoRawValue = { ...this.getFormDefaults(), ...nivelEstablecimiento };
    form.reset(
      {
        ...nivelEstablecimientoRawValue,
        id: { value: nivelEstablecimientoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): NivelEstablecimientoFormDefaults {
    return {
      id: null,
    };
  }
}
