import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFormulario053, NewFormulario053 } from '../formulario-053.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFormulario053 for edit and NewFormulario053FormGroupInput for create.
 */
type Formulario053FormGroupInput = IFormulario053 | PartialWithRequiredKeyOf<NewFormulario053>;

type Formulario053FormDefaults = Pick<NewFormulario053, 'id'>;

type Formulario053FormGroupContent = {
  id: FormControl<IFormulario053['id'] | NewFormulario053['id']>;
  fecha: FormControl<IFormulario053['fecha']>;
  numeroHistoriaClinica: FormControl<IFormulario053['numeroHistoriaClinica']>;
  servicioEspecialidad: FormControl<IFormulario053['servicioEspecialidad']>;
  tipoId: FormControl<IFormulario053['tipoId']>;
  pacienteId: FormControl<IFormulario053['pacienteId']>;
  doctorId: FormControl<IFormulario053['doctorId']>;
  establecimientoOrigenId: FormControl<IFormulario053['establecimientoOrigenId']>;
  establecimientoDestinoId: FormControl<IFormulario053['establecimientoDestinoId']>;
  especialidadId: FormControl<IFormulario053['especialidadId']>;
};

export type Formulario053FormGroup = FormGroup<Formulario053FormGroupContent>;

@Injectable({ providedIn: 'root' })
export class Formulario053FormService {
  createFormulario053FormGroup(formulario053: Formulario053FormGroupInput = { id: null }): Formulario053FormGroup {
    const formulario053RawValue = {
      ...this.getFormDefaults(),
      ...formulario053,
    };
    return new FormGroup<Formulario053FormGroupContent>({
      id: new FormControl(
        { value: formulario053RawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      fecha: new FormControl(formulario053RawValue.fecha, {
        validators: [Validators.required],
      }),
      numeroHistoriaClinica: new FormControl(formulario053RawValue.numeroHistoriaClinica, {
        validators: [Validators.required],
      }),
      servicioEspecialidad: new FormControl(formulario053RawValue.servicioEspecialidad, {
        validators: [Validators.required],
      }),
      tipoId: new FormControl(formulario053RawValue.tipoId, {
        validators: [Validators.required],
      }),
      pacienteId: new FormControl(formulario053RawValue.pacienteId, {
        validators: [Validators.required],
      }),
      doctorId: new FormControl(formulario053RawValue.doctorId, {
        validators: [Validators.required],
      }),
      establecimientoOrigenId: new FormControl(formulario053RawValue.establecimientoOrigenId, {
        validators: [Validators.required],
      }),
      establecimientoDestinoId: new FormControl(formulario053RawValue.establecimientoDestinoId, {
        validators: [Validators.required],
      }),
      especialidadId: new FormControl(formulario053RawValue.especialidadId, {
        validators: [Validators.required],
      }),
    });
  }

  getFormulario053(form: Formulario053FormGroup): IFormulario053 | NewFormulario053 {
    return form.getRawValue() as IFormulario053 | NewFormulario053;
  }

  resetForm(form: Formulario053FormGroup, formulario053: Formulario053FormGroupInput): void {
    const formulario053RawValue = { ...this.getFormDefaults(), ...formulario053 };
    form.reset(
      {
        ...formulario053RawValue,
        id: { value: formulario053RawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): Formulario053FormDefaults {
    return {
      id: null,
    };
  }
}
