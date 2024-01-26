import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITerapia, NewTerapia } from '../terapia.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITerapia for edit and NewTerapiaFormGroupInput for create.
 */
type TerapiaFormGroupInput = ITerapia | PartialWithRequiredKeyOf<NewTerapia>;

type TerapiaFormDefaults = Pick<NewTerapia, 'id' | 'habilitado'>;

type TerapiaFormGroupContent = {
  id: FormControl<ITerapia['id'] | NewTerapia['id']>;
  cantidad: FormControl<ITerapia['cantidad']>;
  descripcion: FormControl<ITerapia['descripcion']>;
  habilitado: FormControl<ITerapia['habilitado']>;
  valorUnitarioEstablecimiento: FormControl<ITerapia['valorUnitarioEstablecimiento']>;
  continuidad: FormControl<ITerapia['continuidad']>;
  itemLiquidacion: FormControl<ITerapia['itemLiquidacion']>;
  tarifario: FormControl<ITerapia['tarifario']>;
};

export type TerapiaFormGroup = FormGroup<TerapiaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TerapiaFormService {
  createTerapiaFormGroup(terapia: TerapiaFormGroupInput = { id: null }): TerapiaFormGroup {
    const terapiaRawValue = {
      ...this.getFormDefaults(),
      ...terapia,
    };
    return new FormGroup<TerapiaFormGroupContent>({
      id: new FormControl(
        { value: terapiaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      cantidad: new FormControl(terapiaRawValue.cantidad, {
        validators: [Validators.required],
      }),
      descripcion: new FormControl(terapiaRawValue.descripcion, {
        validators: [Validators.required],
      }),
      habilitado: new FormControl(terapiaRawValue.habilitado, {
        validators: [Validators.required],
      }),
      valorUnitarioEstablecimiento: new FormControl(terapiaRawValue.valorUnitarioEstablecimiento, {
        validators: [Validators.required],
      }),
      continuidad: new FormControl(terapiaRawValue.continuidad, {
        validators: [Validators.required],
      }),
      itemLiquidacion: new FormControl(terapiaRawValue.itemLiquidacion, {
        validators: [Validators.required],
      }),
      tarifario: new FormControl(terapiaRawValue.tarifario, {
        validators: [Validators.required],
      }),
    });
  }

  getTerapia(form: TerapiaFormGroup): ITerapia | NewTerapia {
    return form.getRawValue() as ITerapia | NewTerapia;
  }

  resetForm(form: TerapiaFormGroup, terapia: TerapiaFormGroupInput): void {
    const terapiaRawValue = { ...this.getFormDefaults(), ...terapia };
    form.reset(
      {
        ...terapiaRawValue,
        id: { value: terapiaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TerapiaFormDefaults {
    return {
      id: null,
      habilitado: false,
    };
  }
}
