import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProvinciaTerritorio, NewProvinciaTerritorio } from '../provincia-territorio.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProvinciaTerritorio for edit and NewProvinciaTerritorioFormGroupInput for create.
 */
type ProvinciaTerritorioFormGroupInput = IProvinciaTerritorio | PartialWithRequiredKeyOf<NewProvinciaTerritorio>;

type ProvinciaTerritorioFormDefaults = Pick<NewProvinciaTerritorio, 'id'>;

type ProvinciaTerritorioFormGroupContent = {
  id: FormControl<IProvinciaTerritorio['id'] | NewProvinciaTerritorio['id']>;
  codigo: FormControl<IProvinciaTerritorio['codigo']>;
  nombre: FormControl<IProvinciaTerritorio['nombre']>;
  pais: FormControl<IProvinciaTerritorio['pais']>;
};

export type ProvinciaTerritorioFormGroup = FormGroup<ProvinciaTerritorioFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProvinciaTerritorioFormService {
  createProvinciaTerritorioFormGroup(provinciaTerritorio: ProvinciaTerritorioFormGroupInput = { id: null }): ProvinciaTerritorioFormGroup {
    const provinciaTerritorioRawValue = {
      ...this.getFormDefaults(),
      ...provinciaTerritorio,
    };
    return new FormGroup<ProvinciaTerritorioFormGroupContent>({
      id: new FormControl(
        { value: provinciaTerritorioRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigo: new FormControl(provinciaTerritorioRawValue.codigo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(provinciaTerritorioRawValue.nombre, {
        validators: [Validators.required],
      }),
      pais: new FormControl(provinciaTerritorioRawValue.pais, {
        validators: [Validators.required],
      }),
    });
  }

  getProvinciaTerritorio(form: ProvinciaTerritorioFormGroup): IProvinciaTerritorio | NewProvinciaTerritorio {
    return form.getRawValue() as IProvinciaTerritorio | NewProvinciaTerritorio;
  }

  resetForm(form: ProvinciaTerritorioFormGroup, provinciaTerritorio: ProvinciaTerritorioFormGroupInput): void {
    const provinciaTerritorioRawValue = { ...this.getFormDefaults(), ...provinciaTerritorio };
    form.reset(
      {
        ...provinciaTerritorioRawValue,
        id: { value: provinciaTerritorioRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProvinciaTerritorioFormDefaults {
    return {
      id: null,
    };
  }
}
