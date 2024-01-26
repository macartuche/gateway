import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDistrito, NewDistrito } from '../distrito.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDistrito for edit and NewDistritoFormGroupInput for create.
 */
type DistritoFormGroupInput = IDistrito | PartialWithRequiredKeyOf<NewDistrito>;

type DistritoFormDefaults = Pick<NewDistrito, 'id'>;

type DistritoFormGroupContent = {
  id: FormControl<IDistrito['id'] | NewDistrito['id']>;
  codigo: FormControl<IDistrito['codigo']>;
  nombre: FormControl<IDistrito['nombre']>;
  provincia: FormControl<IDistrito['provincia']>;
};

export type DistritoFormGroup = FormGroup<DistritoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DistritoFormService {
  createDistritoFormGroup(distrito: DistritoFormGroupInput = { id: null }): DistritoFormGroup {
    const distritoRawValue = {
      ...this.getFormDefaults(),
      ...distrito,
    };
    return new FormGroup<DistritoFormGroupContent>({
      id: new FormControl(
        { value: distritoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigo: new FormControl(distritoRawValue.codigo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(distritoRawValue.nombre, {
        validators: [Validators.required],
      }),
      provincia: new FormControl(distritoRawValue.provincia),
    });
  }

  getDistrito(form: DistritoFormGroup): IDistrito | NewDistrito {
    return form.getRawValue() as IDistrito | NewDistrito;
  }

  resetForm(form: DistritoFormGroup, distrito: DistritoFormGroupInput): void {
    const distritoRawValue = { ...this.getFormDefaults(), ...distrito };
    form.reset(
      {
        ...distritoRawValue,
        id: { value: distritoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DistritoFormDefaults {
    return {
      id: null,
    };
  }
}
