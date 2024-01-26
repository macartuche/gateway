import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IZona, NewZona } from '../zona.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IZona for edit and NewZonaFormGroupInput for create.
 */
type ZonaFormGroupInput = IZona | PartialWithRequiredKeyOf<NewZona>;

type ZonaFormDefaults = Pick<NewZona, 'id'>;

type ZonaFormGroupContent = {
  id: FormControl<IZona['id'] | NewZona['id']>;
  codigo: FormControl<IZona['codigo']>;
  nombre: FormControl<IZona['nombre']>;
  estadoId: FormControl<IZona['estadoId']>;
};

export type ZonaFormGroup = FormGroup<ZonaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ZonaFormService {
  createZonaFormGroup(zona: ZonaFormGroupInput = { id: null }): ZonaFormGroup {
    const zonaRawValue = {
      ...this.getFormDefaults(),
      ...zona,
    };
    return new FormGroup<ZonaFormGroupContent>({
      id: new FormControl(
        { value: zonaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigo: new FormControl(zonaRawValue.codigo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(zonaRawValue.nombre, {
        validators: [Validators.required],
      }),
      estadoId: new FormControl(zonaRawValue.estadoId, {
        validators: [Validators.required],
      }),
    });
  }

  getZona(form: ZonaFormGroup): IZona | NewZona {
    return form.getRawValue() as IZona | NewZona;
  }

  resetForm(form: ZonaFormGroup, zona: ZonaFormGroupInput): void {
    const zonaRawValue = { ...this.getFormDefaults(), ...zona };
    form.reset(
      {
        ...zonaRawValue,
        id: { value: zonaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ZonaFormDefaults {
    return {
      id: null,
    };
  }
}
