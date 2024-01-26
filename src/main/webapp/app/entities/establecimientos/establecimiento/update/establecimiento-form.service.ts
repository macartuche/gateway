import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEstablecimiento, NewEstablecimiento } from '../establecimiento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEstablecimiento for edit and NewEstablecimientoFormGroupInput for create.
 */
type EstablecimientoFormGroupInput = IEstablecimiento | PartialWithRequiredKeyOf<NewEstablecimiento>;

type EstablecimientoFormDefaults = Pick<NewEstablecimiento, 'id'>;

type EstablecimientoFormGroupContent = {
  id: FormControl<IEstablecimiento['id'] | NewEstablecimiento['id']>;
  unicodigo: FormControl<IEstablecimiento['unicodigo']>;
  nombre: FormControl<IEstablecimiento['nombre']>;
  barrio: FormControl<IEstablecimiento['barrio']>;
  direccion: FormControl<IEstablecimiento['direccion']>;
  referencia: FormControl<IEstablecimiento['referencia']>;
  telefono: FormControl<IEstablecimiento['telefono']>;
  ambitoId: FormControl<IEstablecimiento['ambitoId']>;
  estadoId: FormControl<IEstablecimiento['estadoId']>;
  parroquia: FormControl<IEstablecimiento['parroquia']>;
  entidad: FormControl<IEstablecimiento['entidad']>;
  institucion: FormControl<IEstablecimiento['institucion']>;
  tipo: FormControl<IEstablecimiento['tipo']>;
  horario: FormControl<IEstablecimiento['horario']>;
};

export type EstablecimientoFormGroup = FormGroup<EstablecimientoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EstablecimientoFormService {
  createEstablecimientoFormGroup(establecimiento: EstablecimientoFormGroupInput = { id: null }): EstablecimientoFormGroup {
    const establecimientoRawValue = {
      ...this.getFormDefaults(),
      ...establecimiento,
    };
    return new FormGroup<EstablecimientoFormGroupContent>({
      id: new FormControl(
        { value: establecimientoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      unicodigo: new FormControl(establecimientoRawValue.unicodigo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(establecimientoRawValue.nombre, {
        validators: [Validators.required],
      }),
      barrio: new FormControl(establecimientoRawValue.barrio),
      direccion: new FormControl(establecimientoRawValue.direccion),
      referencia: new FormControl(establecimientoRawValue.referencia),
      telefono: new FormControl(establecimientoRawValue.telefono),
      ambitoId: new FormControl(establecimientoRawValue.ambitoId, {
        validators: [Validators.required],
      }),
      estadoId: new FormControl(establecimientoRawValue.estadoId, {
        validators: [Validators.required],
      }),
      parroquia: new FormControl(establecimientoRawValue.parroquia, {
        validators: [Validators.required],
      }),
      entidad: new FormControl(establecimientoRawValue.entidad, {
        validators: [Validators.required],
      }),
      institucion: new FormControl(establecimientoRawValue.institucion, {
        validators: [Validators.required],
      }),
      tipo: new FormControl(establecimientoRawValue.tipo, {
        validators: [Validators.required],
      }),
      horario: new FormControl(establecimientoRawValue.horario, {
        validators: [Validators.required],
      }),
    });
  }

  getEstablecimiento(form: EstablecimientoFormGroup): IEstablecimiento | NewEstablecimiento {
    return form.getRawValue() as IEstablecimiento | NewEstablecimiento;
  }

  resetForm(form: EstablecimientoFormGroup, establecimiento: EstablecimientoFormGroupInput): void {
    const establecimientoRawValue = { ...this.getFormDefaults(), ...establecimiento };
    form.reset(
      {
        ...establecimientoRawValue,
        id: { value: establecimientoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): EstablecimientoFormDefaults {
    return {
      id: null,
    };
  }
}
