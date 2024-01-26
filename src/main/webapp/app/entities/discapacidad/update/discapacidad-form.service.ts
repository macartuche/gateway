import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDiscapacidad, NewDiscapacidad } from '../discapacidad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDiscapacidad for edit and NewDiscapacidadFormGroupInput for create.
 */
type DiscapacidadFormGroupInput = IDiscapacidad | PartialWithRequiredKeyOf<NewDiscapacidad>;

type DiscapacidadFormDefaults = Pick<NewDiscapacidad, 'id'>;

type DiscapacidadFormGroupContent = {
  id: FormControl<IDiscapacidad['id'] | NewDiscapacidad['id']>;
  porcentaje: FormControl<IDiscapacidad['porcentaje']>;
  tipo: FormControl<IDiscapacidad['tipo']>;
  estado: FormControl<IDiscapacidad['estado']>;
};

export type DiscapacidadFormGroup = FormGroup<DiscapacidadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DiscapacidadFormService {
  createDiscapacidadFormGroup(discapacidad: DiscapacidadFormGroupInput = { id: null }): DiscapacidadFormGroup {
    const discapacidadRawValue = {
      ...this.getFormDefaults(),
      ...discapacidad,
    };
    return new FormGroup<DiscapacidadFormGroupContent>({
      id: new FormControl(
        { value: discapacidadRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      porcentaje: new FormControl(discapacidadRawValue.porcentaje, {
        validators: [Validators.required],
      }),
      tipo: new FormControl(discapacidadRawValue.tipo, {
        validators: [Validators.required],
      }),
      estado: new FormControl(discapacidadRawValue.estado, {
        validators: [Validators.required],
      }),
    });
  }

  getDiscapacidad(form: DiscapacidadFormGroup): IDiscapacidad | NewDiscapacidad {
    return form.getRawValue() as IDiscapacidad | NewDiscapacidad;
  }

  resetForm(form: DiscapacidadFormGroup, discapacidad: DiscapacidadFormGroupInput): void {
    const discapacidadRawValue = { ...this.getFormDefaults(), ...discapacidad };
    form.reset(
      {
        ...discapacidadRawValue,
        id: { value: discapacidadRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DiscapacidadFormDefaults {
    return {
      id: null,
    };
  }
}
