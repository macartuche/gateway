import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFirmaDigital, NewFirmaDigital } from '../firma-digital.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFirmaDigital for edit and NewFirmaDigitalFormGroupInput for create.
 */
type FirmaDigitalFormGroupInput = IFirmaDigital | PartialWithRequiredKeyOf<NewFirmaDigital>;

type FirmaDigitalFormDefaults = Pick<NewFirmaDigital, 'id'>;

type FirmaDigitalFormGroupContent = {
  id: FormControl<IFirmaDigital['id'] | NewFirmaDigital['id']>;
  fechaDesde: FormControl<IFirmaDigital['fechaDesde']>;
  fechaHasta: FormControl<IFirmaDigital['fechaHasta']>;
  path: FormControl<IFirmaDigital['path']>;
  tipo: FormControl<IFirmaDigital['tipo']>;
  persona: FormControl<IFirmaDigital['persona']>;
};

export type FirmaDigitalFormGroup = FormGroup<FirmaDigitalFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FirmaDigitalFormService {
  createFirmaDigitalFormGroup(firmaDigital: FirmaDigitalFormGroupInput = { id: null }): FirmaDigitalFormGroup {
    const firmaDigitalRawValue = {
      ...this.getFormDefaults(),
      ...firmaDigital,
    };
    return new FormGroup<FirmaDigitalFormGroupContent>({
      id: new FormControl(
        { value: firmaDigitalRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      fechaDesde: new FormControl(firmaDigitalRawValue.fechaDesde, {
        validators: [Validators.required],
      }),
      fechaHasta: new FormControl(firmaDigitalRawValue.fechaHasta, {
        validators: [Validators.required],
      }),
      path: new FormControl(firmaDigitalRawValue.path),
      tipo: new FormControl(firmaDigitalRawValue.tipo),
      persona: new FormControl(firmaDigitalRawValue.persona),
    });
  }

  getFirmaDigital(form: FirmaDigitalFormGroup): IFirmaDigital | NewFirmaDigital {
    return form.getRawValue() as IFirmaDigital | NewFirmaDigital;
  }

  resetForm(form: FirmaDigitalFormGroup, firmaDigital: FirmaDigitalFormGroupInput): void {
    const firmaDigitalRawValue = { ...this.getFormDefaults(), ...firmaDigital };
    form.reset(
      {
        ...firmaDigitalRawValue,
        id: { value: firmaDigitalRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): FirmaDigitalFormDefaults {
    return {
      id: null,
    };
  }
}
