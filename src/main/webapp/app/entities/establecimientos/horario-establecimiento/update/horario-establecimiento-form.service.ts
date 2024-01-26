import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IHorarioEstablecimiento, NewHorarioEstablecimiento } from '../horario-establecimiento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHorarioEstablecimiento for edit and NewHorarioEstablecimientoFormGroupInput for create.
 */
type HorarioEstablecimientoFormGroupInput = IHorarioEstablecimiento | PartialWithRequiredKeyOf<NewHorarioEstablecimiento>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IHorarioEstablecimiento | NewHorarioEstablecimiento> = Omit<T, 'horaInicio' | 'horaFin'> & {
  horaInicio?: string | null;
  horaFin?: string | null;
};

type HorarioEstablecimientoFormRawValue = FormValueOf<IHorarioEstablecimiento>;

type NewHorarioEstablecimientoFormRawValue = FormValueOf<NewHorarioEstablecimiento>;

type HorarioEstablecimientoFormDefaults = Pick<NewHorarioEstablecimiento, 'id' | 'horaInicio' | 'horaFin'>;

type HorarioEstablecimientoFormGroupContent = {
  id: FormControl<HorarioEstablecimientoFormRawValue['id'] | NewHorarioEstablecimiento['id']>;
  nombre: FormControl<HorarioEstablecimientoFormRawValue['nombre']>;
  numeroHoras: FormControl<HorarioEstablecimientoFormRawValue['numeroHoras']>;
  descripcion: FormControl<HorarioEstablecimientoFormRawValue['descripcion']>;
  horaInicio: FormControl<HorarioEstablecimientoFormRawValue['horaInicio']>;
  horaFin: FormControl<HorarioEstablecimientoFormRawValue['horaFin']>;
};

export type HorarioEstablecimientoFormGroup = FormGroup<HorarioEstablecimientoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HorarioEstablecimientoFormService {
  createHorarioEstablecimientoFormGroup(
    horarioEstablecimiento: HorarioEstablecimientoFormGroupInput = { id: null },
  ): HorarioEstablecimientoFormGroup {
    const horarioEstablecimientoRawValue = this.convertHorarioEstablecimientoToHorarioEstablecimientoRawValue({
      ...this.getFormDefaults(),
      ...horarioEstablecimiento,
    });
    return new FormGroup<HorarioEstablecimientoFormGroupContent>({
      id: new FormControl(
        { value: horarioEstablecimientoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nombre: new FormControl(horarioEstablecimientoRawValue.nombre, {
        validators: [Validators.required],
      }),
      numeroHoras: new FormControl(horarioEstablecimientoRawValue.numeroHoras, {
        validators: [Validators.required],
      }),
      descripcion: new FormControl(horarioEstablecimientoRawValue.descripcion),
      horaInicio: new FormControl(horarioEstablecimientoRawValue.horaInicio),
      horaFin: new FormControl(horarioEstablecimientoRawValue.horaFin),
    });
  }

  getHorarioEstablecimiento(form: HorarioEstablecimientoFormGroup): IHorarioEstablecimiento | NewHorarioEstablecimiento {
    return this.convertHorarioEstablecimientoRawValueToHorarioEstablecimiento(
      form.getRawValue() as HorarioEstablecimientoFormRawValue | NewHorarioEstablecimientoFormRawValue,
    );
  }

  resetForm(form: HorarioEstablecimientoFormGroup, horarioEstablecimiento: HorarioEstablecimientoFormGroupInput): void {
    const horarioEstablecimientoRawValue = this.convertHorarioEstablecimientoToHorarioEstablecimientoRawValue({
      ...this.getFormDefaults(),
      ...horarioEstablecimiento,
    });
    form.reset(
      {
        ...horarioEstablecimientoRawValue,
        id: { value: horarioEstablecimientoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): HorarioEstablecimientoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      horaInicio: currentTime,
      horaFin: currentTime,
    };
  }

  private convertHorarioEstablecimientoRawValueToHorarioEstablecimiento(
    rawHorarioEstablecimiento: HorarioEstablecimientoFormRawValue | NewHorarioEstablecimientoFormRawValue,
  ): IHorarioEstablecimiento | NewHorarioEstablecimiento {
    return {
      ...rawHorarioEstablecimiento,
      horaInicio: dayjs(rawHorarioEstablecimiento.horaInicio, DATE_TIME_FORMAT),
      horaFin: dayjs(rawHorarioEstablecimiento.horaFin, DATE_TIME_FORMAT),
    };
  }

  private convertHorarioEstablecimientoToHorarioEstablecimientoRawValue(
    horarioEstablecimiento: IHorarioEstablecimiento | (Partial<NewHorarioEstablecimiento> & HorarioEstablecimientoFormDefaults),
  ): HorarioEstablecimientoFormRawValue | PartialWithRequiredKeyOf<NewHorarioEstablecimientoFormRawValue> {
    return {
      ...horarioEstablecimiento,
      horaInicio: horarioEstablecimiento.horaInicio ? horarioEstablecimiento.horaInicio.format(DATE_TIME_FORMAT) : undefined,
      horaFin: horarioEstablecimiento.horaFin ? horarioEstablecimiento.horaFin.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
