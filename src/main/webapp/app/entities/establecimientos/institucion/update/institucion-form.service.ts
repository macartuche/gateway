import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInstitucion, NewInstitucion } from '../institucion.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInstitucion for edit and NewInstitucionFormGroupInput for create.
 */
type InstitucionFormGroupInput = IInstitucion | PartialWithRequiredKeyOf<NewInstitucion>;

type InstitucionFormDefaults = Pick<NewInstitucion, 'id' | 'permiteDerivacion' | 'permiteReferencia' | 'permiteContrareferencia'>;

type InstitucionFormGroupContent = {
  id: FormControl<IInstitucion['id'] | NewInstitucion['id']>;
  codigo: FormControl<IInstitucion['codigo']>;
  nombre: FormControl<IInstitucion['nombre']>;
  permiteDerivacion: FormControl<IInstitucion['permiteDerivacion']>;
  permiteReferencia: FormControl<IInstitucion['permiteReferencia']>;
  permiteContrareferencia: FormControl<IInstitucion['permiteContrareferencia']>;
  estadoId: FormControl<IInstitucion['estadoId']>;
};

export type InstitucionFormGroup = FormGroup<InstitucionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InstitucionFormService {
  createInstitucionFormGroup(institucion: InstitucionFormGroupInput = { id: null }): InstitucionFormGroup {
    const institucionRawValue = {
      ...this.getFormDefaults(),
      ...institucion,
    };
    return new FormGroup<InstitucionFormGroupContent>({
      id: new FormControl(
        { value: institucionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigo: new FormControl(institucionRawValue.codigo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(institucionRawValue.nombre, {
        validators: [Validators.required],
      }),
      permiteDerivacion: new FormControl(institucionRawValue.permiteDerivacion, {
        validators: [Validators.required],
      }),
      permiteReferencia: new FormControl(institucionRawValue.permiteReferencia, {
        validators: [Validators.required],
      }),
      permiteContrareferencia: new FormControl(institucionRawValue.permiteContrareferencia, {
        validators: [Validators.required],
      }),
      estadoId: new FormControl(institucionRawValue.estadoId, {
        validators: [Validators.required],
      }),
    });
  }

  getInstitucion(form: InstitucionFormGroup): IInstitucion | NewInstitucion {
    return form.getRawValue() as IInstitucion | NewInstitucion;
  }

  resetForm(form: InstitucionFormGroup, institucion: InstitucionFormGroupInput): void {
    const institucionRawValue = { ...this.getFormDefaults(), ...institucion };
    form.reset(
      {
        ...institucionRawValue,
        id: { value: institucionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): InstitucionFormDefaults {
    return {
      id: null,
      permiteDerivacion: false,
      permiteReferencia: false,
      permiteContrareferencia: false,
    };
  }
}
