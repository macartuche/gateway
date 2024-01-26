import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICitaMedica, NewCitaMedica } from '../cita-medica.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICitaMedica for edit and NewCitaMedicaFormGroupInput for create.
 */
type CitaMedicaFormGroupInput = ICitaMedica | PartialWithRequiredKeyOf<NewCitaMedica>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICitaMedica | NewCitaMedica> = Omit<T, 'horaInicioAtencion' | 'horaFinAtencion'> & {
  horaInicioAtencion?: string | null;
  horaFinAtencion?: string | null;
};

type CitaMedicaFormRawValue = FormValueOf<ICitaMedica>;

type NewCitaMedicaFormRawValue = FormValueOf<NewCitaMedica>;

type CitaMedicaFormDefaults = Pick<NewCitaMedica, 'id' | 'horaInicioAtencion' | 'horaFinAtencion' | 'activa'>;

type CitaMedicaFormGroupContent = {
  id: FormControl<CitaMedicaFormRawValue['id'] | NewCitaMedica['id']>;
  fechaInicioAtencion: FormControl<CitaMedicaFormRawValue['fechaInicioAtencion']>;
  fechaFinAtencion: FormControl<CitaMedicaFormRawValue['fechaFinAtencion']>;
  horaInicioAtencion: FormControl<CitaMedicaFormRawValue['horaInicioAtencion']>;
  horaFinAtencion: FormControl<CitaMedicaFormRawValue['horaFinAtencion']>;
  activa: FormControl<CitaMedicaFormRawValue['activa']>;
  observacion: FormControl<CitaMedicaFormRawValue['observacion']>;
  estadoId: FormControl<CitaMedicaFormRawValue['estadoId']>;
  pacienteId: FormControl<CitaMedicaFormRawValue['pacienteId']>;
  tramiteId: FormControl<CitaMedicaFormRawValue['tramiteId']>;
  turno: FormControl<CitaMedicaFormRawValue['turno']>;
};

export type CitaMedicaFormGroup = FormGroup<CitaMedicaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CitaMedicaFormService {
  createCitaMedicaFormGroup(citaMedica: CitaMedicaFormGroupInput = { id: null }): CitaMedicaFormGroup {
    const citaMedicaRawValue = this.convertCitaMedicaToCitaMedicaRawValue({
      ...this.getFormDefaults(),
      ...citaMedica,
    });
    return new FormGroup<CitaMedicaFormGroupContent>({
      id: new FormControl(
        { value: citaMedicaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      fechaInicioAtencion: new FormControl(citaMedicaRawValue.fechaInicioAtencion),
      fechaFinAtencion: new FormControl(citaMedicaRawValue.fechaFinAtencion),
      horaInicioAtencion: new FormControl(citaMedicaRawValue.horaInicioAtencion),
      horaFinAtencion: new FormControl(citaMedicaRawValue.horaFinAtencion),
      activa: new FormControl(citaMedicaRawValue.activa, {
        validators: [Validators.required],
      }),
      observacion: new FormControl(citaMedicaRawValue.observacion),
      estadoId: new FormControl(citaMedicaRawValue.estadoId, {
        validators: [Validators.required],
      }),
      pacienteId: new FormControl(citaMedicaRawValue.pacienteId, {
        validators: [Validators.required],
      }),
      tramiteId: new FormControl(citaMedicaRawValue.tramiteId),
      turno: new FormControl(citaMedicaRawValue.turno, {
        validators: [Validators.required],
      }),
    });
  }

  getCitaMedica(form: CitaMedicaFormGroup): ICitaMedica | NewCitaMedica {
    return this.convertCitaMedicaRawValueToCitaMedica(form.getRawValue() as CitaMedicaFormRawValue | NewCitaMedicaFormRawValue);
  }

  resetForm(form: CitaMedicaFormGroup, citaMedica: CitaMedicaFormGroupInput): void {
    const citaMedicaRawValue = this.convertCitaMedicaToCitaMedicaRawValue({ ...this.getFormDefaults(), ...citaMedica });
    form.reset(
      {
        ...citaMedicaRawValue,
        id: { value: citaMedicaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CitaMedicaFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      horaInicioAtencion: currentTime,
      horaFinAtencion: currentTime,
      activa: false,
    };
  }

  private convertCitaMedicaRawValueToCitaMedica(
    rawCitaMedica: CitaMedicaFormRawValue | NewCitaMedicaFormRawValue,
  ): ICitaMedica | NewCitaMedica {
    return {
      ...rawCitaMedica,
      horaInicioAtencion: dayjs(rawCitaMedica.horaInicioAtencion, DATE_TIME_FORMAT),
      horaFinAtencion: dayjs(rawCitaMedica.horaFinAtencion, DATE_TIME_FORMAT),
    };
  }

  private convertCitaMedicaToCitaMedicaRawValue(
    citaMedica: ICitaMedica | (Partial<NewCitaMedica> & CitaMedicaFormDefaults),
  ): CitaMedicaFormRawValue | PartialWithRequiredKeyOf<NewCitaMedicaFormRawValue> {
    return {
      ...citaMedica,
      horaInicioAtencion: citaMedica.horaInicioAtencion ? citaMedica.horaInicioAtencion.format(DATE_TIME_FORMAT) : undefined,
      horaFinAtencion: citaMedica.horaFinAtencion ? citaMedica.horaFinAtencion.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
