import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEstablecimientoFestivo, NewEstablecimientoFestivo } from '../establecimiento-festivo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEstablecimientoFestivo for edit and NewEstablecimientoFestivoFormGroupInput for create.
 */
type EstablecimientoFestivoFormGroupInput = IEstablecimientoFestivo | PartialWithRequiredKeyOf<NewEstablecimientoFestivo>;

type EstablecimientoFestivoFormDefaults = Pick<NewEstablecimientoFestivo, 'id' | 'activo'>;

type EstablecimientoFestivoFormGroupContent = {
  id: FormControl<IEstablecimientoFestivo['id'] | NewEstablecimientoFestivo['id']>;
  activo: FormControl<IEstablecimientoFestivo['activo']>;
  establecimiento: FormControl<IEstablecimientoFestivo['establecimiento']>;
  festivo: FormControl<IEstablecimientoFestivo['festivo']>;
};

export type EstablecimientoFestivoFormGroup = FormGroup<EstablecimientoFestivoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EstablecimientoFestivoFormService {
  createEstablecimientoFestivoFormGroup(
    establecimientoFestivo: EstablecimientoFestivoFormGroupInput = { id: null },
  ): EstablecimientoFestivoFormGroup {
    const establecimientoFestivoRawValue = {
      ...this.getFormDefaults(),
      ...establecimientoFestivo,
    };
    return new FormGroup<EstablecimientoFestivoFormGroupContent>({
      id: new FormControl(
        { value: establecimientoFestivoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      activo: new FormControl(establecimientoFestivoRawValue.activo, {
        validators: [Validators.required],
      }),
      establecimiento: new FormControl(establecimientoFestivoRawValue.establecimiento, {
        validators: [Validators.required],
      }),
      festivo: new FormControl(establecimientoFestivoRawValue.festivo, {
        validators: [Validators.required],
      }),
    });
  }

  getEstablecimientoFestivo(form: EstablecimientoFestivoFormGroup): IEstablecimientoFestivo | NewEstablecimientoFestivo {
    return form.getRawValue() as IEstablecimientoFestivo | NewEstablecimientoFestivo;
  }

  resetForm(form: EstablecimientoFestivoFormGroup, establecimientoFestivo: EstablecimientoFestivoFormGroupInput): void {
    const establecimientoFestivoRawValue = { ...this.getFormDefaults(), ...establecimientoFestivo };
    form.reset(
      {
        ...establecimientoFestivoRawValue,
        id: { value: establecimientoFestivoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): EstablecimientoFestivoFormDefaults {
    return {
      id: null,
      activo: false,
    };
  }
}
