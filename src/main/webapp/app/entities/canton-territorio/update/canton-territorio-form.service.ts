import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICantonTerritorio, NewCantonTerritorio } from '../canton-territorio.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICantonTerritorio for edit and NewCantonTerritorioFormGroupInput for create.
 */
type CantonTerritorioFormGroupInput = ICantonTerritorio | PartialWithRequiredKeyOf<NewCantonTerritorio>;

type CantonTerritorioFormDefaults = Pick<NewCantonTerritorio, 'id'>;

type CantonTerritorioFormGroupContent = {
  id: FormControl<ICantonTerritorio['id'] | NewCantonTerritorio['id']>;
  codigo: FormControl<ICantonTerritorio['codigo']>;
  nombre: FormControl<ICantonTerritorio['nombre']>;
  provincia: FormControl<ICantonTerritorio['provincia']>;
};

export type CantonTerritorioFormGroup = FormGroup<CantonTerritorioFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CantonTerritorioFormService {
  createCantonTerritorioFormGroup(cantonTerritorio: CantonTerritorioFormGroupInput = { id: null }): CantonTerritorioFormGroup {
    const cantonTerritorioRawValue = {
      ...this.getFormDefaults(),
      ...cantonTerritorio,
    };
    return new FormGroup<CantonTerritorioFormGroupContent>({
      id: new FormControl(
        { value: cantonTerritorioRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigo: new FormControl(cantonTerritorioRawValue.codigo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(cantonTerritorioRawValue.nombre, {
        validators: [Validators.required],
      }),
      provincia: new FormControl(cantonTerritorioRawValue.provincia),
    });
  }

  getCantonTerritorio(form: CantonTerritorioFormGroup): ICantonTerritorio | NewCantonTerritorio {
    return form.getRawValue() as ICantonTerritorio | NewCantonTerritorio;
  }

  resetForm(form: CantonTerritorioFormGroup, cantonTerritorio: CantonTerritorioFormGroupInput): void {
    const cantonTerritorioRawValue = { ...this.getFormDefaults(), ...cantonTerritorio };
    form.reset(
      {
        ...cantonTerritorioRawValue,
        id: { value: cantonTerritorioRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CantonTerritorioFormDefaults {
    return {
      id: null,
    };
  }
}
