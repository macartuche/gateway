import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IParroquiaTerritorio, NewParroquiaTerritorio } from '../parroquia-territorio.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IParroquiaTerritorio for edit and NewParroquiaTerritorioFormGroupInput for create.
 */
type ParroquiaTerritorioFormGroupInput = IParroquiaTerritorio | PartialWithRequiredKeyOf<NewParroquiaTerritorio>;

type ParroquiaTerritorioFormDefaults = Pick<NewParroquiaTerritorio, 'id'>;

type ParroquiaTerritorioFormGroupContent = {
  id: FormControl<IParroquiaTerritorio['id'] | NewParroquiaTerritorio['id']>;
  codigo: FormControl<IParroquiaTerritorio['codigo']>;
  nombre: FormControl<IParroquiaTerritorio['nombre']>;
  canton: FormControl<IParroquiaTerritorio['canton']>;
};

export type ParroquiaTerritorioFormGroup = FormGroup<ParroquiaTerritorioFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ParroquiaTerritorioFormService {
  createParroquiaTerritorioFormGroup(parroquiaTerritorio: ParroquiaTerritorioFormGroupInput = { id: null }): ParroquiaTerritorioFormGroup {
    const parroquiaTerritorioRawValue = {
      ...this.getFormDefaults(),
      ...parroquiaTerritorio,
    };
    return new FormGroup<ParroquiaTerritorioFormGroupContent>({
      id: new FormControl(
        { value: parroquiaTerritorioRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigo: new FormControl(parroquiaTerritorioRawValue.codigo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(parroquiaTerritorioRawValue.nombre, {
        validators: [Validators.required],
      }),
      canton: new FormControl(parroquiaTerritorioRawValue.canton),
    });
  }

  getParroquiaTerritorio(form: ParroquiaTerritorioFormGroup): IParroquiaTerritorio | NewParroquiaTerritorio {
    return form.getRawValue() as IParroquiaTerritorio | NewParroquiaTerritorio;
  }

  resetForm(form: ParroquiaTerritorioFormGroup, parroquiaTerritorio: ParroquiaTerritorioFormGroupInput): void {
    const parroquiaTerritorioRawValue = { ...this.getFormDefaults(), ...parroquiaTerritorio };
    form.reset(
      {
        ...parroquiaTerritorioRawValue,
        id: { value: parroquiaTerritorioRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ParroquiaTerritorioFormDefaults {
    return {
      id: null,
    };
  }
}
