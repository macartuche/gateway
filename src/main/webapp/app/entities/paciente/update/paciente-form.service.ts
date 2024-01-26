import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPaciente, NewPaciente } from '../paciente.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPaciente for edit and NewPacienteFormGroupInput for create.
 */
type PacienteFormGroupInput = IPaciente | PartialWithRequiredKeyOf<NewPaciente>;

type PacienteFormDefaults = Pick<NewPaciente, 'id'>;

type PacienteFormGroupContent = {
  id: FormControl<IPaciente['id'] | NewPaciente['id']>;
  lugarNacimiento: FormControl<IPaciente['lugarNacimiento']>;
  fechaNacimiento: FormControl<IPaciente['fechaNacimiento']>;
  callePrincipal: FormControl<IPaciente['callePrincipal']>;
  numeroCasa: FormControl<IPaciente['numeroCasa']>;
  calleSecundaria: FormControl<IPaciente['calleSecundaria']>;
  barrio: FormControl<IPaciente['barrio']>;
  referenciaDomicilio: FormControl<IPaciente['referenciaDomicilio']>;
  seguroSaludSecundario: FormControl<IPaciente['seguroSaludSecundario']>;
  identificacionRepresentante: FormControl<IPaciente['identificacionRepresentante']>;
  discapacidad: FormControl<IPaciente['discapacidad']>;
  persona: FormControl<IPaciente['persona']>;
  parroquiaNacimiento: FormControl<IPaciente['parroquiaNacimiento']>;
  parroquiaResidencia: FormControl<IPaciente['parroquiaResidencia']>;
  autoidentificacionEtnica: FormControl<IPaciente['autoidentificacionEtnica']>;
  nacionalidadEtnica: FormControl<IPaciente['nacionalidadEtnica']>;
  pueblo: FormControl<IPaciente['pueblo']>;
  tipoEmpresaTrabajo: FormControl<IPaciente['tipoEmpresaTrabajo']>;
  profesionOcupacion: FormControl<IPaciente['profesionOcupacion']>;
  seguroSaludPrincipal: FormControl<IPaciente['seguroSaludPrincipal']>;
  tipoBono: FormControl<IPaciente['tipoBono']>;
  procedenciaRepresentante: FormControl<IPaciente['procedenciaRepresentante']>;
};

export type PacienteFormGroup = FormGroup<PacienteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PacienteFormService {
  createPacienteFormGroup(paciente: PacienteFormGroupInput = { id: null }): PacienteFormGroup {
    const pacienteRawValue = {
      ...this.getFormDefaults(),
      ...paciente,
    };
    return new FormGroup<PacienteFormGroupContent>({
      id: new FormControl(
        { value: pacienteRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      lugarNacimiento: new FormControl(pacienteRawValue.lugarNacimiento, {
        validators: [Validators.required],
      }),
      fechaNacimiento: new FormControl(pacienteRawValue.fechaNacimiento, {
        validators: [Validators.required],
      }),
      callePrincipal: new FormControl(pacienteRawValue.callePrincipal),
      numeroCasa: new FormControl(pacienteRawValue.numeroCasa),
      calleSecundaria: new FormControl(pacienteRawValue.calleSecundaria),
      barrio: new FormControl(pacienteRawValue.barrio, {
        validators: [Validators.required],
      }),
      referenciaDomicilio: new FormControl(pacienteRawValue.referenciaDomicilio),
      seguroSaludSecundario: new FormControl(pacienteRawValue.seguroSaludSecundario),
      identificacionRepresentante: new FormControl(pacienteRawValue.identificacionRepresentante),
      discapacidad: new FormControl(pacienteRawValue.discapacidad),
      persona: new FormControl(pacienteRawValue.persona, {
        validators: [Validators.required],
      }),
      parroquiaNacimiento: new FormControl(pacienteRawValue.parroquiaNacimiento),
      parroquiaResidencia: new FormControl(pacienteRawValue.parroquiaResidencia, {
        validators: [Validators.required],
      }),
      autoidentificacionEtnica: new FormControl(pacienteRawValue.autoidentificacionEtnica, {
        validators: [Validators.required],
      }),
      nacionalidadEtnica: new FormControl(pacienteRawValue.nacionalidadEtnica),
      pueblo: new FormControl(pacienteRawValue.pueblo),
      tipoEmpresaTrabajo: new FormControl(pacienteRawValue.tipoEmpresaTrabajo, {
        validators: [Validators.required],
      }),
      profesionOcupacion: new FormControl(pacienteRawValue.profesionOcupacion, {
        validators: [Validators.required],
      }),
      seguroSaludPrincipal: new FormControl(pacienteRawValue.seguroSaludPrincipal, {
        validators: [Validators.required],
      }),
      tipoBono: new FormControl(pacienteRawValue.tipoBono, {
        validators: [Validators.required],
      }),
      procedenciaRepresentante: new FormControl(pacienteRawValue.procedenciaRepresentante, {
        validators: [Validators.required],
      }),
    });
  }

  getPaciente(form: PacienteFormGroup): IPaciente | NewPaciente {
    return form.getRawValue() as IPaciente | NewPaciente;
  }

  resetForm(form: PacienteFormGroup, paciente: PacienteFormGroupInput): void {
    const pacienteRawValue = { ...this.getFormDefaults(), ...paciente };
    form.reset(
      {
        ...pacienteRawValue,
        id: { value: pacienteRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): PacienteFormDefaults {
    return {
      id: null,
    };
  }
}
