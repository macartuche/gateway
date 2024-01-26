import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITramite, NewTramite } from '../tramite.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITramite for edit and NewTramiteFormGroupInput for create.
 */
type TramiteFormGroupInput = ITramite | PartialWithRequiredKeyOf<NewTramite>;

type TramiteFormDefaults = Pick<NewTramite, 'id'>;

type TramiteFormGroupContent = {
  id: FormControl<ITramite['id'] | NewTramite['id']>;
  codigoValidacion: FormControl<ITramite['codigoValidacion']>;
  numero: FormControl<ITramite['numero']>;
  estadoId: FormControl<ITramite['estadoId']>;
  pacienteId: FormControl<ITramite['pacienteId']>;
  establecimientoOrigenId: FormControl<ITramite['establecimientoOrigenId']>;
  establecimientoDestinoId: FormControl<ITramite['establecimientoDestinoId']>;
  formulario: FormControl<ITramite['formulario']>;
  tipoTramite: FormControl<ITramite['tipoTramite']>;
};

export type TramiteFormGroup = FormGroup<TramiteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TramiteFormService {
  createTramiteFormGroup(tramite: TramiteFormGroupInput = { id: null }): TramiteFormGroup {
    const tramiteRawValue = {
      ...this.getFormDefaults(),
      ...tramite,
    };
    return new FormGroup<TramiteFormGroupContent>({
      id: new FormControl(
        { value: tramiteRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigoValidacion: new FormControl(tramiteRawValue.codigoValidacion, {
        validators: [Validators.required],
      }),
      numero: new FormControl(tramiteRawValue.numero),
      estadoId: new FormControl(tramiteRawValue.estadoId, {
        validators: [Validators.required],
      }),
      pacienteId: new FormControl(tramiteRawValue.pacienteId, {
        validators: [Validators.required],
      }),
      establecimientoOrigenId: new FormControl(tramiteRawValue.establecimientoOrigenId, {
        validators: [Validators.required],
      }),
      establecimientoDestinoId: new FormControl(tramiteRawValue.establecimientoDestinoId, {
        validators: [Validators.required],
      }),
      formulario: new FormControl(tramiteRawValue.formulario, {
        validators: [Validators.required],
      }),
      tipoTramite: new FormControl(tramiteRawValue.tipoTramite, {
        validators: [Validators.required],
      }),
    });
  }

  getTramite(form: TramiteFormGroup): ITramite | NewTramite {
    return form.getRawValue() as ITramite | NewTramite;
  }

  resetForm(form: TramiteFormGroup, tramite: TramiteFormGroupInput): void {
    const tramiteRawValue = { ...this.getFormDefaults(), ...tramite };
    form.reset(
      {
        ...tramiteRawValue,
        id: { value: tramiteRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TramiteFormDefaults {
    return {
      id: null,
    };
  }
}
