import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITipoEstablecimiento, NewTipoEstablecimiento } from '../tipo-establecimiento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoEstablecimiento for edit and NewTipoEstablecimientoFormGroupInput for create.
 */
type TipoEstablecimientoFormGroupInput = ITipoEstablecimiento | PartialWithRequiredKeyOf<NewTipoEstablecimiento>;

type TipoEstablecimientoFormDefaults = Pick<NewTipoEstablecimiento, 'id'>;

type TipoEstablecimientoFormGroupContent = {
  id: FormControl<ITipoEstablecimiento['id'] | NewTipoEstablecimiento['id']>;
  codigo: FormControl<ITipoEstablecimiento['codigo']>;
  nombre: FormControl<ITipoEstablecimiento['nombre']>;
  descripcion: FormControl<ITipoEstablecimiento['descripcion']>;
  nivel: FormControl<ITipoEstablecimiento['nivel']>;
};

export type TipoEstablecimientoFormGroup = FormGroup<TipoEstablecimientoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TipoEstablecimientoFormService {
  createTipoEstablecimientoFormGroup(tipoEstablecimiento: TipoEstablecimientoFormGroupInput = { id: null }): TipoEstablecimientoFormGroup {
    const tipoEstablecimientoRawValue = {
      ...this.getFormDefaults(),
      ...tipoEstablecimiento,
    };
    return new FormGroup<TipoEstablecimientoFormGroupContent>({
      id: new FormControl(
        { value: tipoEstablecimientoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigo: new FormControl(tipoEstablecimientoRawValue.codigo),
      nombre: new FormControl(tipoEstablecimientoRawValue.nombre, {
        validators: [Validators.required],
      }),
      descripcion: new FormControl(tipoEstablecimientoRawValue.descripcion),
      nivel: new FormControl(tipoEstablecimientoRawValue.nivel),
    });
  }

  getTipoEstablecimiento(form: TipoEstablecimientoFormGroup): ITipoEstablecimiento | NewTipoEstablecimiento {
    return form.getRawValue() as ITipoEstablecimiento | NewTipoEstablecimiento;
  }

  resetForm(form: TipoEstablecimientoFormGroup, tipoEstablecimiento: TipoEstablecimientoFormGroupInput): void {
    const tipoEstablecimientoRawValue = { ...this.getFormDefaults(), ...tipoEstablecimiento };
    form.reset(
      {
        ...tipoEstablecimientoRawValue,
        id: { value: tipoEstablecimientoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TipoEstablecimientoFormDefaults {
    return {
      id: null,
    };
  }
}
