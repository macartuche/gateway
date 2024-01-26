import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITipoTramite, NewTipoTramite } from '../tipo-tramite.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoTramite for edit and NewTipoTramiteFormGroupInput for create.
 */
type TipoTramiteFormGroupInput = ITipoTramite | PartialWithRequiredKeyOf<NewTipoTramite>;

type TipoTramiteFormDefaults = Pick<NewTipoTramite, 'id'>;

type TipoTramiteFormGroupContent = {
  id: FormControl<ITipoTramite['id'] | NewTipoTramite['id']>;
  nombre: FormControl<ITipoTramite['nombre']>;
  codigo: FormControl<ITipoTramite['codigo']>;
  estadosId: FormControl<ITipoTramite['estadosId']>;
};

export type TipoTramiteFormGroup = FormGroup<TipoTramiteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TipoTramiteFormService {
  createTipoTramiteFormGroup(tipoTramite: TipoTramiteFormGroupInput = { id: null }): TipoTramiteFormGroup {
    const tipoTramiteRawValue = {
      ...this.getFormDefaults(),
      ...tipoTramite,
    };
    return new FormGroup<TipoTramiteFormGroupContent>({
      id: new FormControl(
        { value: tipoTramiteRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nombre: new FormControl(tipoTramiteRawValue.nombre, {
        validators: [Validators.required],
      }),
      codigo: new FormControl(tipoTramiteRawValue.codigo),
      estadosId: new FormControl(tipoTramiteRawValue.estadosId, {
        validators: [Validators.required],
      }),
    });
  }

  getTipoTramite(form: TipoTramiteFormGroup): ITipoTramite | NewTipoTramite {
    return form.getRawValue() as ITipoTramite | NewTipoTramite;
  }

  resetForm(form: TipoTramiteFormGroup, tipoTramite: TipoTramiteFormGroupInput): void {
    const tipoTramiteRawValue = { ...this.getFormDefaults(), ...tipoTramite };
    form.reset(
      {
        ...tipoTramiteRawValue,
        id: { value: tipoTramiteRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TipoTramiteFormDefaults {
    return {
      id: null,
    };
  }
}
