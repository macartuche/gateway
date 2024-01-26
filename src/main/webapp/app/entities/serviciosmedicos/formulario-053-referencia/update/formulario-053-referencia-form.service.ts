import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFormulario053Referencia, NewFormulario053Referencia } from '../formulario-053-referencia.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFormulario053Referencia for edit and NewFormulario053ReferenciaFormGroupInput for create.
 */
type Formulario053ReferenciaFormGroupInput = IFormulario053Referencia | PartialWithRequiredKeyOf<NewFormulario053Referencia>;

type Formulario053ReferenciaFormDefaults = Pick<NewFormulario053Referencia, 'id'>;

type Formulario053ReferenciaFormGroupContent = {
  id: FormControl<IFormulario053Referencia['id'] | NewFormulario053Referencia['id']>;
  cuadroClinico: FormControl<IFormulario053Referencia['cuadroClinico']>;
  hallazgosRelevantes: FormControl<IFormulario053Referencia['hallazgosRelevantes']>;
  formulario: FormControl<IFormulario053Referencia['formulario']>;
};

export type Formulario053ReferenciaFormGroup = FormGroup<Formulario053ReferenciaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class Formulario053ReferenciaFormService {
  createFormulario053ReferenciaFormGroup(
    formulario053Referencia: Formulario053ReferenciaFormGroupInput = { id: null },
  ): Formulario053ReferenciaFormGroup {
    const formulario053ReferenciaRawValue = {
      ...this.getFormDefaults(),
      ...formulario053Referencia,
    };
    return new FormGroup<Formulario053ReferenciaFormGroupContent>({
      id: new FormControl(
        { value: formulario053ReferenciaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      cuadroClinico: new FormControl(formulario053ReferenciaRawValue.cuadroClinico),
      hallazgosRelevantes: new FormControl(formulario053ReferenciaRawValue.hallazgosRelevantes),
      formulario: new FormControl(formulario053ReferenciaRawValue.formulario),
    });
  }

  getFormulario053Referencia(form: Formulario053ReferenciaFormGroup): IFormulario053Referencia | NewFormulario053Referencia {
    return form.getRawValue() as IFormulario053Referencia | NewFormulario053Referencia;
  }

  resetForm(form: Formulario053ReferenciaFormGroup, formulario053Referencia: Formulario053ReferenciaFormGroupInput): void {
    const formulario053ReferenciaRawValue = { ...this.getFormDefaults(), ...formulario053Referencia };
    form.reset(
      {
        ...formulario053ReferenciaRawValue,
        id: { value: formulario053ReferenciaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): Formulario053ReferenciaFormDefaults {
    return {
      id: null,
    };
  }
}
