import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IContactoEmergenciaPaciente, NewContactoEmergenciaPaciente } from '../contacto-emergencia-paciente.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContactoEmergenciaPaciente for edit and NewContactoEmergenciaPacienteFormGroupInput for create.
 */
type ContactoEmergenciaPacienteFormGroupInput = IContactoEmergenciaPaciente | PartialWithRequiredKeyOf<NewContactoEmergenciaPaciente>;

type ContactoEmergenciaPacienteFormDefaults = Pick<NewContactoEmergenciaPaciente, 'id'>;

type ContactoEmergenciaPacienteFormGroupContent = {
  id: FormControl<IContactoEmergenciaPaciente['id'] | NewContactoEmergenciaPaciente['id']>;
  nombre: FormControl<IContactoEmergenciaPaciente['nombre']>;
  telefono: FormControl<IContactoEmergenciaPaciente['telefono']>;
  direccion: FormControl<IContactoEmergenciaPaciente['direccion']>;
  paciente: FormControl<IContactoEmergenciaPaciente['paciente']>;
  parentezco: FormControl<IContactoEmergenciaPaciente['parentezco']>;
};

export type ContactoEmergenciaPacienteFormGroup = FormGroup<ContactoEmergenciaPacienteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContactoEmergenciaPacienteFormService {
  createContactoEmergenciaPacienteFormGroup(
    contactoEmergenciaPaciente: ContactoEmergenciaPacienteFormGroupInput = { id: null },
  ): ContactoEmergenciaPacienteFormGroup {
    const contactoEmergenciaPacienteRawValue = {
      ...this.getFormDefaults(),
      ...contactoEmergenciaPaciente,
    };
    return new FormGroup<ContactoEmergenciaPacienteFormGroupContent>({
      id: new FormControl(
        { value: contactoEmergenciaPacienteRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nombre: new FormControl(contactoEmergenciaPacienteRawValue.nombre, {
        validators: [Validators.required],
      }),
      telefono: new FormControl(contactoEmergenciaPacienteRawValue.telefono),
      direccion: new FormControl(contactoEmergenciaPacienteRawValue.direccion),
      paciente: new FormControl(contactoEmergenciaPacienteRawValue.paciente, {
        validators: [Validators.required],
      }),
      parentezco: new FormControl(contactoEmergenciaPacienteRawValue.parentezco, {
        validators: [Validators.required],
      }),
    });
  }

  getContactoEmergenciaPaciente(form: ContactoEmergenciaPacienteFormGroup): IContactoEmergenciaPaciente | NewContactoEmergenciaPaciente {
    return form.getRawValue() as IContactoEmergenciaPaciente | NewContactoEmergenciaPaciente;
  }

  resetForm(form: ContactoEmergenciaPacienteFormGroup, contactoEmergenciaPaciente: ContactoEmergenciaPacienteFormGroupInput): void {
    const contactoEmergenciaPacienteRawValue = { ...this.getFormDefaults(), ...contactoEmergenciaPaciente };
    form.reset(
      {
        ...contactoEmergenciaPacienteRawValue,
        id: { value: contactoEmergenciaPacienteRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ContactoEmergenciaPacienteFormDefaults {
    return {
      id: null,
    };
  }
}
