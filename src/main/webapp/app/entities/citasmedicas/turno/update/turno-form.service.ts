import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITurno, NewTurno } from '../turno.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITurno for edit and NewTurnoFormGroupInput for create.
 */
type TurnoFormGroupInput = ITurno | PartialWithRequiredKeyOf<NewTurno>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITurno | NewTurno> = Omit<T, 'horaInicio' | 'horaFin'> & {
  horaInicio?: string | null;
  horaFin?: string | null;
};

type TurnoFormRawValue = FormValueOf<ITurno>;

type NewTurnoFormRawValue = FormValueOf<NewTurno>;

type TurnoFormDefaults = Pick<NewTurno, 'id' | 'horaInicio' | 'horaFin' | 'activo' | 'extra'>;

type TurnoFormGroupContent = {
  id: FormControl<TurnoFormRawValue['id'] | NewTurno['id']>;
  orden: FormControl<TurnoFormRawValue['orden']>;
  horaInicio: FormControl<TurnoFormRawValue['horaInicio']>;
  horaFin: FormControl<TurnoFormRawValue['horaFin']>;
  activo: FormControl<TurnoFormRawValue['activo']>;
  extra: FormControl<TurnoFormRawValue['extra']>;
  detalleCronograma: FormControl<TurnoFormRawValue['detalleCronograma']>;
};

export type TurnoFormGroup = FormGroup<TurnoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TurnoFormService {
  createTurnoFormGroup(turno: TurnoFormGroupInput = { id: null }): TurnoFormGroup {
    const turnoRawValue = this.convertTurnoToTurnoRawValue({
      ...this.getFormDefaults(),
      ...turno,
    });
    return new FormGroup<TurnoFormGroupContent>({
      id: new FormControl(
        { value: turnoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      orden: new FormControl(turnoRawValue.orden, {
        validators: [Validators.required],
      }),
      horaInicio: new FormControl(turnoRawValue.horaInicio, {
        validators: [Validators.required],
      }),
      horaFin: new FormControl(turnoRawValue.horaFin, {
        validators: [Validators.required],
      }),
      activo: new FormControl(turnoRawValue.activo),
      extra: new FormControl(turnoRawValue.extra, {
        validators: [Validators.required],
      }),
      detalleCronograma: new FormControl(turnoRawValue.detalleCronograma, {
        validators: [Validators.required],
      }),
    });
  }

  getTurno(form: TurnoFormGroup): ITurno | NewTurno {
    return this.convertTurnoRawValueToTurno(form.getRawValue() as TurnoFormRawValue | NewTurnoFormRawValue);
  }

  resetForm(form: TurnoFormGroup, turno: TurnoFormGroupInput): void {
    const turnoRawValue = this.convertTurnoToTurnoRawValue({ ...this.getFormDefaults(), ...turno });
    form.reset(
      {
        ...turnoRawValue,
        id: { value: turnoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TurnoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      horaInicio: currentTime,
      horaFin: currentTime,
      activo: false,
      extra: false,
    };
  }

  private convertTurnoRawValueToTurno(rawTurno: TurnoFormRawValue | NewTurnoFormRawValue): ITurno | NewTurno {
    return {
      ...rawTurno,
      horaInicio: dayjs(rawTurno.horaInicio, DATE_TIME_FORMAT),
      horaFin: dayjs(rawTurno.horaFin, DATE_TIME_FORMAT),
    };
  }

  private convertTurnoToTurnoRawValue(
    turno: ITurno | (Partial<NewTurno> & TurnoFormDefaults),
  ): TurnoFormRawValue | PartialWithRequiredKeyOf<NewTurnoFormRawValue> {
    return {
      ...turno,
      horaInicio: turno.horaInicio ? turno.horaInicio.format(DATE_TIME_FORMAT) : undefined,
      horaFin: turno.horaFin ? turno.horaFin.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
