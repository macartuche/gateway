import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDiagnosticoFormulario053, NewDiagnosticoFormulario053 } from '../diagnostico-formulario-053.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDiagnosticoFormulario053 for edit and NewDiagnosticoFormulario053FormGroupInput for create.
 */
type DiagnosticoFormulario053FormGroupInput = IDiagnosticoFormulario053 | PartialWithRequiredKeyOf<NewDiagnosticoFormulario053>;

type DiagnosticoFormulario053FormDefaults = Pick<NewDiagnosticoFormulario053, 'id' | 'dep' | 'pre'>;

type DiagnosticoFormulario053FormGroupContent = {
  id: FormControl<IDiagnosticoFormulario053['id'] | NewDiagnosticoFormulario053['id']>;
  dep: FormControl<IDiagnosticoFormulario053['dep']>;
  pre: FormControl<IDiagnosticoFormulario053['pre']>;
  referencia: FormControl<IDiagnosticoFormulario053['referencia']>;
  contrareferencia: FormControl<IDiagnosticoFormulario053['contrareferencia']>;
  itemCie: FormControl<IDiagnosticoFormulario053['itemCie']>;
};

export type DiagnosticoFormulario053FormGroup = FormGroup<DiagnosticoFormulario053FormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DiagnosticoFormulario053FormService {
  createDiagnosticoFormulario053FormGroup(
    diagnosticoFormulario053: DiagnosticoFormulario053FormGroupInput = { id: null },
  ): DiagnosticoFormulario053FormGroup {
    const diagnosticoFormulario053RawValue = {
      ...this.getFormDefaults(),
      ...diagnosticoFormulario053,
    };
    return new FormGroup<DiagnosticoFormulario053FormGroupContent>({
      id: new FormControl(
        { value: diagnosticoFormulario053RawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dep: new FormControl(diagnosticoFormulario053RawValue.dep, {
        validators: [Validators.required],
      }),
      pre: new FormControl(diagnosticoFormulario053RawValue.pre, {
        validators: [Validators.required],
      }),
      referencia: new FormControl(diagnosticoFormulario053RawValue.referencia),
      contrareferencia: new FormControl(diagnosticoFormulario053RawValue.contrareferencia),
      itemCie: new FormControl(diagnosticoFormulario053RawValue.itemCie, {
        validators: [Validators.required],
      }),
    });
  }

  getDiagnosticoFormulario053(form: DiagnosticoFormulario053FormGroup): IDiagnosticoFormulario053 | NewDiagnosticoFormulario053 {
    return form.getRawValue() as IDiagnosticoFormulario053 | NewDiagnosticoFormulario053;
  }

  resetForm(form: DiagnosticoFormulario053FormGroup, diagnosticoFormulario053: DiagnosticoFormulario053FormGroupInput): void {
    const diagnosticoFormulario053RawValue = { ...this.getFormDefaults(), ...diagnosticoFormulario053 };
    form.reset(
      {
        ...diagnosticoFormulario053RawValue,
        id: { value: diagnosticoFormulario053RawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DiagnosticoFormulario053FormDefaults {
    return {
      id: null,
      dep: false,
      pre: false,
    };
  }
}
