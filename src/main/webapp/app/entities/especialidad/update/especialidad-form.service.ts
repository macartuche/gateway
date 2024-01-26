import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEspecialidad, NewEspecialidad } from '../especialidad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEspecialidad for edit and NewEspecialidadFormGroupInput for create.
 */
type EspecialidadFormGroupInput = IEspecialidad | PartialWithRequiredKeyOf<NewEspecialidad>;

type EspecialidadFormDefaults = Pick<NewEspecialidad, 'id' | 'activa'>;

type EspecialidadFormGroupContent = {
  id: FormControl<IEspecialidad['id'] | NewEspecialidad['id']>;
  nombre: FormControl<IEspecialidad['nombre']>;
  activa: FormControl<IEspecialidad['activa']>;
  tipo: FormControl<IEspecialidad['tipo']>;
};

export type EspecialidadFormGroup = FormGroup<EspecialidadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EspecialidadFormService {
  createEspecialidadFormGroup(especialidad: EspecialidadFormGroupInput = { id: null }): EspecialidadFormGroup {
    const especialidadRawValue = {
      ...this.getFormDefaults(),
      ...especialidad,
    };
    return new FormGroup<EspecialidadFormGroupContent>({
      id: new FormControl(
        { value: especialidadRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nombre: new FormControl(especialidadRawValue.nombre, {
        validators: [Validators.required],
      }),
      activa: new FormControl(especialidadRawValue.activa, {
        validators: [Validators.required],
      }),
      tipo: new FormControl(especialidadRawValue.tipo),
    });
  }

  getEspecialidad(form: EspecialidadFormGroup): IEspecialidad | NewEspecialidad {
    return form.getRawValue() as IEspecialidad | NewEspecialidad;
  }

  resetForm(form: EspecialidadFormGroup, especialidad: EspecialidadFormGroupInput): void {
    const especialidadRawValue = { ...this.getFormDefaults(), ...especialidad };
    form.reset(
      {
        ...especialidadRawValue,
        id: { value: especialidadRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): EspecialidadFormDefaults {
    return {
      id: null,
      activa: false,
    };
  }
}
