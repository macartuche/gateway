import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFestivo, NewFestivo } from '../festivo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFestivo for edit and NewFestivoFormGroupInput for create.
 */
type FestivoFormGroupInput = IFestivo | PartialWithRequiredKeyOf<NewFestivo>;

type FestivoFormDefaults = Pick<NewFestivo, 'id' | 'activo'>;

type FestivoFormGroupContent = {
  id: FormControl<IFestivo['id'] | NewFestivo['id']>;
  nombre: FormControl<IFestivo['nombre']>;
  fechaInicio: FormControl<IFestivo['fechaInicio']>;
  fechaFin: FormControl<IFestivo['fechaFin']>;
  activo: FormControl<IFestivo['activo']>;
};

export type FestivoFormGroup = FormGroup<FestivoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FestivoFormService {
  createFestivoFormGroup(festivo: FestivoFormGroupInput = { id: null }): FestivoFormGroup {
    const festivoRawValue = {
      ...this.getFormDefaults(),
      ...festivo,
    };
    return new FormGroup<FestivoFormGroupContent>({
      id: new FormControl(
        { value: festivoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nombre: new FormControl(festivoRawValue.nombre, {
        validators: [Validators.required],
      }),
      fechaInicio: new FormControl(festivoRawValue.fechaInicio, {
        validators: [Validators.required],
      }),
      fechaFin: new FormControl(festivoRawValue.fechaFin, {
        validators: [Validators.required],
      }),
      activo: new FormControl(festivoRawValue.activo, {
        validators: [Validators.required],
      }),
    });
  }

  getFestivo(form: FestivoFormGroup): IFestivo | NewFestivo {
    return form.getRawValue() as IFestivo | NewFestivo;
  }

  resetForm(form: FestivoFormGroup, festivo: FestivoFormGroupInput): void {
    const festivoRawValue = { ...this.getFormDefaults(), ...festivo };
    form.reset(
      {
        ...festivoRawValue,
        id: { value: festivoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): FestivoFormDefaults {
    return {
      id: null,
      activo: false,
    };
  }
}
