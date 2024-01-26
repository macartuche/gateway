import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICircuito, NewCircuito } from '../circuito.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICircuito for edit and NewCircuitoFormGroupInput for create.
 */
type CircuitoFormGroupInput = ICircuito | PartialWithRequiredKeyOf<NewCircuito>;

type CircuitoFormDefaults = Pick<NewCircuito, 'id'>;

type CircuitoFormGroupContent = {
  id: FormControl<ICircuito['id'] | NewCircuito['id']>;
  codigo: FormControl<ICircuito['codigo']>;
  nombre: FormControl<ICircuito['nombre']>;
  canton: FormControl<ICircuito['canton']>;
};

export type CircuitoFormGroup = FormGroup<CircuitoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CircuitoFormService {
  createCircuitoFormGroup(circuito: CircuitoFormGroupInput = { id: null }): CircuitoFormGroup {
    const circuitoRawValue = {
      ...this.getFormDefaults(),
      ...circuito,
    };
    return new FormGroup<CircuitoFormGroupContent>({
      id: new FormControl(
        { value: circuitoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigo: new FormControl(circuitoRawValue.codigo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(circuitoRawValue.nombre, {
        validators: [Validators.required],
      }),
      canton: new FormControl(circuitoRawValue.canton),
    });
  }

  getCircuito(form: CircuitoFormGroup): ICircuito | NewCircuito {
    return form.getRawValue() as ICircuito | NewCircuito;
  }

  resetForm(form: CircuitoFormGroup, circuito: CircuitoFormGroupInput): void {
    const circuitoRawValue = { ...this.getFormDefaults(), ...circuito };
    form.reset(
      {
        ...circuitoRawValue,
        id: { value: circuitoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CircuitoFormDefaults {
    return {
      id: null,
    };
  }
}
