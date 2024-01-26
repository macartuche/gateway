import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMotivoReferencia, NewMotivoReferencia } from '../motivo-referencia.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMotivoReferencia for edit and NewMotivoReferenciaFormGroupInput for create.
 */
type MotivoReferenciaFormGroupInput = IMotivoReferencia | PartialWithRequiredKeyOf<NewMotivoReferencia>;

type MotivoReferenciaFormDefaults = Pick<NewMotivoReferencia, 'id'>;

type MotivoReferenciaFormGroupContent = {
  id: FormControl<IMotivoReferencia['id'] | NewMotivoReferencia['id']>;
  detalle: FormControl<IMotivoReferencia['detalle']>;
  tipoId: FormControl<IMotivoReferencia['tipoId']>;
  referencia: FormControl<IMotivoReferencia['referencia']>;
};

export type MotivoReferenciaFormGroup = FormGroup<MotivoReferenciaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MotivoReferenciaFormService {
  createMotivoReferenciaFormGroup(motivoReferencia: MotivoReferenciaFormGroupInput = { id: null }): MotivoReferenciaFormGroup {
    const motivoReferenciaRawValue = {
      ...this.getFormDefaults(),
      ...motivoReferencia,
    };
    return new FormGroup<MotivoReferenciaFormGroupContent>({
      id: new FormControl(
        { value: motivoReferenciaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      detalle: new FormControl(motivoReferenciaRawValue.detalle),
      tipoId: new FormControl(motivoReferenciaRawValue.tipoId, {
        validators: [Validators.required],
      }),
      referencia: new FormControl(motivoReferenciaRawValue.referencia, {
        validators: [Validators.required],
      }),
    });
  }

  getMotivoReferencia(form: MotivoReferenciaFormGroup): IMotivoReferencia | NewMotivoReferencia {
    return form.getRawValue() as IMotivoReferencia | NewMotivoReferencia;
  }

  resetForm(form: MotivoReferenciaFormGroup, motivoReferencia: MotivoReferenciaFormGroupInput): void {
    const motivoReferenciaRawValue = { ...this.getFormDefaults(), ...motivoReferencia };
    form.reset(
      {
        ...motivoReferenciaRawValue,
        id: { value: motivoReferenciaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): MotivoReferenciaFormDefaults {
    return {
      id: null,
    };
  }
}
