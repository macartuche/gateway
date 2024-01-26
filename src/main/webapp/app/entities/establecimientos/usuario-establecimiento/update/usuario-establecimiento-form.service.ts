import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUsuarioEstablecimiento, NewUsuarioEstablecimiento } from '../usuario-establecimiento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUsuarioEstablecimiento for edit and NewUsuarioEstablecimientoFormGroupInput for create.
 */
type UsuarioEstablecimientoFormGroupInput = IUsuarioEstablecimiento | PartialWithRequiredKeyOf<NewUsuarioEstablecimiento>;

type UsuarioEstablecimientoFormDefaults = Pick<NewUsuarioEstablecimiento, 'id' | 'activo'>;

type UsuarioEstablecimientoFormGroupContent = {
  id: FormControl<IUsuarioEstablecimiento['id'] | NewUsuarioEstablecimiento['id']>;
  activo: FormControl<IUsuarioEstablecimiento['activo']>;
  usuarioId: FormControl<IUsuarioEstablecimiento['usuarioId']>;
  tipoId: FormControl<IUsuarioEstablecimiento['tipoId']>;
  establecimiento: FormControl<IUsuarioEstablecimiento['establecimiento']>;
};

export type UsuarioEstablecimientoFormGroup = FormGroup<UsuarioEstablecimientoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UsuarioEstablecimientoFormService {
  createUsuarioEstablecimientoFormGroup(
    usuarioEstablecimiento: UsuarioEstablecimientoFormGroupInput = { id: null },
  ): UsuarioEstablecimientoFormGroup {
    const usuarioEstablecimientoRawValue = {
      ...this.getFormDefaults(),
      ...usuarioEstablecimiento,
    };
    return new FormGroup<UsuarioEstablecimientoFormGroupContent>({
      id: new FormControl(
        { value: usuarioEstablecimientoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      activo: new FormControl(usuarioEstablecimientoRawValue.activo, {
        validators: [Validators.required],
      }),
      usuarioId: new FormControl(usuarioEstablecimientoRawValue.usuarioId, {
        validators: [Validators.required],
      }),
      tipoId: new FormControl(usuarioEstablecimientoRawValue.tipoId, {
        validators: [Validators.required],
      }),
      establecimiento: new FormControl(usuarioEstablecimientoRawValue.establecimiento, {
        validators: [Validators.required],
      }),
    });
  }

  getUsuarioEstablecimiento(form: UsuarioEstablecimientoFormGroup): IUsuarioEstablecimiento | NewUsuarioEstablecimiento {
    return form.getRawValue() as IUsuarioEstablecimiento | NewUsuarioEstablecimiento;
  }

  resetForm(form: UsuarioEstablecimientoFormGroup, usuarioEstablecimiento: UsuarioEstablecimientoFormGroupInput): void {
    const usuarioEstablecimientoRawValue = { ...this.getFormDefaults(), ...usuarioEstablecimiento };
    form.reset(
      {
        ...usuarioEstablecimientoRawValue,
        id: { value: usuarioEstablecimientoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): UsuarioEstablecimientoFormDefaults {
    return {
      id: null,
      activo: false,
    };
  }
}
