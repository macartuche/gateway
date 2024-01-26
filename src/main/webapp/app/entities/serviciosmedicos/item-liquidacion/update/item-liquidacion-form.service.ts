import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IItemLiquidacion, NewItemLiquidacion } from '../item-liquidacion.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IItemLiquidacion for edit and NewItemLiquidacionFormGroupInput for create.
 */
type ItemLiquidacionFormGroupInput = IItemLiquidacion | PartialWithRequiredKeyOf<NewItemLiquidacion>;

type ItemLiquidacionFormDefaults = Pick<NewItemLiquidacion, 'id' | 'habilitado'>;

type ItemLiquidacionFormGroupContent = {
  id: FormControl<IItemLiquidacion['id'] | NewItemLiquidacion['id']>;
  fecha: FormControl<IItemLiquidacion['fecha']>;
  habilitado: FormControl<IItemLiquidacion['habilitado']>;
  continuidad: FormControl<IItemLiquidacion['continuidad']>;
};

export type ItemLiquidacionFormGroup = FormGroup<ItemLiquidacionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ItemLiquidacionFormService {
  createItemLiquidacionFormGroup(itemLiquidacion: ItemLiquidacionFormGroupInput = { id: null }): ItemLiquidacionFormGroup {
    const itemLiquidacionRawValue = {
      ...this.getFormDefaults(),
      ...itemLiquidacion,
    };
    return new FormGroup<ItemLiquidacionFormGroupContent>({
      id: new FormControl(
        { value: itemLiquidacionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      fecha: new FormControl(itemLiquidacionRawValue.fecha, {
        validators: [Validators.required],
      }),
      habilitado: new FormControl(itemLiquidacionRawValue.habilitado, {
        validators: [Validators.required],
      }),
      continuidad: new FormControl(itemLiquidacionRawValue.continuidad, {
        validators: [Validators.required],
      }),
    });
  }

  getItemLiquidacion(form: ItemLiquidacionFormGroup): IItemLiquidacion | NewItemLiquidacion {
    return form.getRawValue() as IItemLiquidacion | NewItemLiquidacion;
  }

  resetForm(form: ItemLiquidacionFormGroup, itemLiquidacion: ItemLiquidacionFormGroupInput): void {
    const itemLiquidacionRawValue = { ...this.getFormDefaults(), ...itemLiquidacion };
    form.reset(
      {
        ...itemLiquidacionRawValue,
        id: { value: itemLiquidacionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ItemLiquidacionFormDefaults {
    return {
      id: null,
      habilitado: false,
    };
  }
}
