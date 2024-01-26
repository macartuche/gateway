import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICanton, NewCanton } from '../canton.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICanton for edit and NewCantonFormGroupInput for create.
 */
type CantonFormGroupInput = ICanton | PartialWithRequiredKeyOf<NewCanton>;

type CantonFormDefaults = Pick<NewCanton, 'id'>;

type CantonFormGroupContent = {
  id: FormControl<ICanton['id'] | NewCanton['id']>;
  codigo: FormControl<ICanton['codigo']>;
  nombre: FormControl<ICanton['nombre']>;
  distrito: FormControl<ICanton['distrito']>;
};

export type CantonFormGroup = FormGroup<CantonFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CantonFormService {
  createCantonFormGroup(canton: CantonFormGroupInput = { id: null }): CantonFormGroup {
    const cantonRawValue = {
      ...this.getFormDefaults(),
      ...canton,
    };
    return new FormGroup<CantonFormGroupContent>({
      id: new FormControl(
        { value: cantonRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigo: new FormControl(cantonRawValue.codigo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(cantonRawValue.nombre, {
        validators: [Validators.required],
      }),
      distrito: new FormControl(cantonRawValue.distrito),
    });
  }

  getCanton(form: CantonFormGroup): ICanton | NewCanton {
    return form.getRawValue() as ICanton | NewCanton;
  }

  resetForm(form: CantonFormGroup, canton: CantonFormGroupInput): void {
    const cantonRawValue = { ...this.getFormDefaults(), ...canton };
    form.reset(
      {
        ...cantonRawValue,
        id: { value: cantonRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CantonFormDefaults {
    return {
      id: null,
    };
  }
}
