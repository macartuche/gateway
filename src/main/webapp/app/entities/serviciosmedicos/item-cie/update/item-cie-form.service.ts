import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IItemCie, NewItemCie } from '../item-cie.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IItemCie for edit and NewItemCieFormGroupInput for create.
 */
type ItemCieFormGroupInput = IItemCie | PartialWithRequiredKeyOf<NewItemCie>;

type ItemCieFormDefaults = Pick<NewItemCie, 'id' | 'activo'>;

type ItemCieFormGroupContent = {
  id: FormControl<IItemCie['id'] | NewItemCie['id']>;
  nombre: FormControl<IItemCie['nombre']>;
  codigo: FormControl<IItemCie['codigo']>;
  activo: FormControl<IItemCie['activo']>;
  padre: FormControl<IItemCie['padre']>;
  cie: FormControl<IItemCie['cie']>;
};

export type ItemCieFormGroup = FormGroup<ItemCieFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ItemCieFormService {
  createItemCieFormGroup(itemCie: ItemCieFormGroupInput = { id: null }): ItemCieFormGroup {
    const itemCieRawValue = {
      ...this.getFormDefaults(),
      ...itemCie,
    };
    return new FormGroup<ItemCieFormGroupContent>({
      id: new FormControl(
        { value: itemCieRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nombre: new FormControl(itemCieRawValue.nombre, {
        validators: [Validators.required],
      }),
      codigo: new FormControl(itemCieRawValue.codigo, {
        validators: [Validators.required],
      }),
      activo: new FormControl(itemCieRawValue.activo, {
        validators: [Validators.required],
      }),
      padre: new FormControl(itemCieRawValue.padre),
      cie: new FormControl(itemCieRawValue.cie),
    });
  }

  getItemCie(form: ItemCieFormGroup): IItemCie | NewItemCie {
    return form.getRawValue() as IItemCie | NewItemCie;
  }

  resetForm(form: ItemCieFormGroup, itemCie: ItemCieFormGroupInput): void {
    const itemCieRawValue = { ...this.getFormDefaults(), ...itemCie };
    form.reset(
      {
        ...itemCieRawValue,
        id: { value: itemCieRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ItemCieFormDefaults {
    return {
      id: null,
      activo: false,
    };
  }
}
