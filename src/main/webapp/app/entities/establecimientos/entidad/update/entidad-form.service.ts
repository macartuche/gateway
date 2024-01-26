import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEntidad, NewEntidad } from '../entidad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEntidad for edit and NewEntidadFormGroupInput for create.
 */
type EntidadFormGroupInput = IEntidad | PartialWithRequiredKeyOf<NewEntidad>;

type EntidadFormDefaults = Pick<NewEntidad, 'id'>;

type EntidadFormGroupContent = {
  id: FormControl<IEntidad['id'] | NewEntidad['id']>;
  codigo: FormControl<IEntidad['codigo']>;
  nombre: FormControl<IEntidad['nombre']>;
  ruc: FormControl<IEntidad['ruc']>;
};

export type EntidadFormGroup = FormGroup<EntidadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EntidadFormService {
  createEntidadFormGroup(entidad: EntidadFormGroupInput = { id: null }): EntidadFormGroup {
    const entidadRawValue = {
      ...this.getFormDefaults(),
      ...entidad,
    };
    return new FormGroup<EntidadFormGroupContent>({
      id: new FormControl(
        { value: entidadRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigo: new FormControl(entidadRawValue.codigo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(entidadRawValue.nombre, {
        validators: [Validators.required],
      }),
      ruc: new FormControl(entidadRawValue.ruc, {
        validators: [Validators.required],
      }),
    });
  }

  getEntidad(form: EntidadFormGroup): IEntidad | NewEntidad {
    return form.getRawValue() as IEntidad | NewEntidad;
  }

  resetForm(form: EntidadFormGroup, entidad: EntidadFormGroupInput): void {
    const entidadRawValue = { ...this.getFormDefaults(), ...entidad };
    form.reset(
      {
        ...entidadRawValue,
        id: { value: entidadRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): EntidadFormDefaults {
    return {
      id: null,
    };
  }
}
