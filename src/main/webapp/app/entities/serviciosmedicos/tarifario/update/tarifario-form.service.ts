import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITarifario, NewTarifario } from '../tarifario.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITarifario for edit and NewTarifarioFormGroupInput for create.
 */
type TarifarioFormGroupInput = ITarifario | PartialWithRequiredKeyOf<NewTarifario>;

type TarifarioFormDefaults = Pick<NewTarifario, 'id'>;

type TarifarioFormGroupContent = {
  id: FormControl<ITarifario['id'] | NewTarifario['id']>;
  codigo: FormControl<ITarifario['codigo']>;
  descripcion: FormControl<ITarifario['descripcion']>;
  valor: FormControl<ITarifario['valor']>;
};

export type TarifarioFormGroup = FormGroup<TarifarioFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TarifarioFormService {
  createTarifarioFormGroup(tarifario: TarifarioFormGroupInput = { id: null }): TarifarioFormGroup {
    const tarifarioRawValue = {
      ...this.getFormDefaults(),
      ...tarifario,
    };
    return new FormGroup<TarifarioFormGroupContent>({
      id: new FormControl(
        { value: tarifarioRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigo: new FormControl(tarifarioRawValue.codigo, {
        validators: [Validators.required],
      }),
      descripcion: new FormControl(tarifarioRawValue.descripcion),
      valor: new FormControl(tarifarioRawValue.valor, {
        validators: [Validators.required],
      }),
    });
  }

  getTarifario(form: TarifarioFormGroup): ITarifario | NewTarifario {
    return form.getRawValue() as ITarifario | NewTarifario;
  }

  resetForm(form: TarifarioFormGroup, tarifario: TarifarioFormGroupInput): void {
    const tarifarioRawValue = { ...this.getFormDefaults(), ...tarifario };
    form.reset(
      {
        ...tarifarioRawValue,
        id: { value: tarifarioRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TarifarioFormDefaults {
    return {
      id: null,
    };
  }
}
