import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFormulario053Contrareferencia, NewFormulario053Contrareferencia } from '../formulario-053-contrareferencia.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFormulario053Contrareferencia for edit and NewFormulario053ContrareferenciaFormGroupInput for create.
 */
type Formulario053ContrareferenciaFormGroupInput =
  | IFormulario053Contrareferencia
  | PartialWithRequiredKeyOf<NewFormulario053Contrareferencia>;

type Formulario053ContrareferenciaFormDefaults = Pick<NewFormulario053Contrareferencia, 'id' | 'referenciaJustificada'>;

type Formulario053ContrareferenciaFormGroupContent = {
  id: FormControl<IFormulario053Contrareferencia['id'] | NewFormulario053Contrareferencia['id']>;
  hallazgosRelevantes: FormControl<IFormulario053Contrareferencia['hallazgosRelevantes']>;
  resumen: FormControl<IFormulario053Contrareferencia['resumen']>;
  tratamientoProcedimientosRealizados: FormControl<IFormulario053Contrareferencia['tratamientoProcedimientosRealizados']>;
  tratamientoRecomendado: FormControl<IFormulario053Contrareferencia['tratamientoRecomendado']>;
  referenciaJustificada: FormControl<IFormulario053Contrareferencia['referenciaJustificada']>;
  formulario: FormControl<IFormulario053Contrareferencia['formulario']>;
};

export type Formulario053ContrareferenciaFormGroup = FormGroup<Formulario053ContrareferenciaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class Formulario053ContrareferenciaFormService {
  createFormulario053ContrareferenciaFormGroup(
    formulario053Contrareferencia: Formulario053ContrareferenciaFormGroupInput = { id: null },
  ): Formulario053ContrareferenciaFormGroup {
    const formulario053ContrareferenciaRawValue = {
      ...this.getFormDefaults(),
      ...formulario053Contrareferencia,
    };
    return new FormGroup<Formulario053ContrareferenciaFormGroupContent>({
      id: new FormControl(
        { value: formulario053ContrareferenciaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      hallazgosRelevantes: new FormControl(formulario053ContrareferenciaRawValue.hallazgosRelevantes),
      resumen: new FormControl(formulario053ContrareferenciaRawValue.resumen),
      tratamientoProcedimientosRealizados: new FormControl(formulario053ContrareferenciaRawValue.tratamientoProcedimientosRealizados),
      tratamientoRecomendado: new FormControl(formulario053ContrareferenciaRawValue.tratamientoRecomendado),
      referenciaJustificada: new FormControl(formulario053ContrareferenciaRawValue.referenciaJustificada, {
        validators: [Validators.required],
      }),
      formulario: new FormControl(formulario053ContrareferenciaRawValue.formulario),
    });
  }

  getFormulario053Contrareferencia(
    form: Formulario053ContrareferenciaFormGroup,
  ): IFormulario053Contrareferencia | NewFormulario053Contrareferencia {
    return form.getRawValue() as IFormulario053Contrareferencia | NewFormulario053Contrareferencia;
  }

  resetForm(
    form: Formulario053ContrareferenciaFormGroup,
    formulario053Contrareferencia: Formulario053ContrareferenciaFormGroupInput,
  ): void {
    const formulario053ContrareferenciaRawValue = { ...this.getFormDefaults(), ...formulario053Contrareferencia };
    form.reset(
      {
        ...formulario053ContrareferenciaRawValue,
        id: { value: formulario053ContrareferenciaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): Formulario053ContrareferenciaFormDefaults {
    return {
      id: null,
      referenciaJustificada: false,
    };
  }
}
