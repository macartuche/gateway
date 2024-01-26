import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICie, NewCie } from '../cie.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICie for edit and NewCieFormGroupInput for create.
 */
type CieFormGroupInput = ICie | PartialWithRequiredKeyOf<NewCie>;

type CieFormDefaults = Pick<NewCie, 'id' | 'activo'>;

type CieFormGroupContent = {
  id: FormControl<ICie['id'] | NewCie['id']>;
  nombre: FormControl<ICie['nombre']>;
  activo: FormControl<ICie['activo']>;
};

export type CieFormGroup = FormGroup<CieFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CieFormService {
  createCieFormGroup(cie: CieFormGroupInput = { id: null }): CieFormGroup {
    const cieRawValue = {
      ...this.getFormDefaults(),
      ...cie,
    };
    return new FormGroup<CieFormGroupContent>({
      id: new FormControl(
        { value: cieRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nombre: new FormControl(cieRawValue.nombre, {
        validators: [Validators.required],
      }),
      activo: new FormControl(cieRawValue.activo, {
        validators: [Validators.required],
      }),
    });
  }

  getCie(form: CieFormGroup): ICie | NewCie {
    return form.getRawValue() as ICie | NewCie;
  }

  resetForm(form: CieFormGroup, cie: CieFormGroupInput): void {
    const cieRawValue = { ...this.getFormDefaults(), ...cie };
    form.reset(
      {
        ...cieRawValue,
        id: { value: cieRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CieFormDefaults {
    return {
      id: null,
      activo: false,
    };
  }
}
