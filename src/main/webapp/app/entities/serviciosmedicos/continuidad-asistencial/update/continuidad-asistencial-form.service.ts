import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IContinuidadAsistencial, NewContinuidadAsistencial } from '../continuidad-asistencial.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContinuidadAsistencial for edit and NewContinuidadAsistencialFormGroupInput for create.
 */
type ContinuidadAsistencialFormGroupInput = IContinuidadAsistencial | PartialWithRequiredKeyOf<NewContinuidadAsistencial>;

type ContinuidadAsistencialFormDefaults = Pick<NewContinuidadAsistencial, 'id'>;

type ContinuidadAsistencialFormGroupContent = {
  id: FormControl<IContinuidadAsistencial['id'] | NewContinuidadAsistencial['id']>;
  observacion: FormControl<IContinuidadAsistencial['observacion']>;
  servicioHospitalario: FormControl<IContinuidadAsistencial['servicioHospitalario']>;
  itemCie: FormControl<IContinuidadAsistencial['itemCie']>;
};

export type ContinuidadAsistencialFormGroup = FormGroup<ContinuidadAsistencialFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContinuidadAsistencialFormService {
  createContinuidadAsistencialFormGroup(
    continuidadAsistencial: ContinuidadAsistencialFormGroupInput = { id: null },
  ): ContinuidadAsistencialFormGroup {
    const continuidadAsistencialRawValue = {
      ...this.getFormDefaults(),
      ...continuidadAsistencial,
    };
    return new FormGroup<ContinuidadAsistencialFormGroupContent>({
      id: new FormControl(
        { value: continuidadAsistencialRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      observacion: new FormControl(continuidadAsistencialRawValue.observacion),
      servicioHospitalario: new FormControl(continuidadAsistencialRawValue.servicioHospitalario),
      itemCie: new FormControl(continuidadAsistencialRawValue.itemCie),
    });
  }

  getContinuidadAsistencial(form: ContinuidadAsistencialFormGroup): IContinuidadAsistencial | NewContinuidadAsistencial {
    return form.getRawValue() as IContinuidadAsistencial | NewContinuidadAsistencial;
  }

  resetForm(form: ContinuidadAsistencialFormGroup, continuidadAsistencial: ContinuidadAsistencialFormGroupInput): void {
    const continuidadAsistencialRawValue = { ...this.getFormDefaults(), ...continuidadAsistencial };
    form.reset(
      {
        ...continuidadAsistencialRawValue,
        id: { value: continuidadAsistencialRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ContinuidadAsistencialFormDefaults {
    return {
      id: null,
    };
  }
}
