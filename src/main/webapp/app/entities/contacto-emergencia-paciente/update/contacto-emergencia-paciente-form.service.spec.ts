import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../contacto-emergencia-paciente.test-samples';

import { ContactoEmergenciaPacienteFormService } from './contacto-emergencia-paciente-form.service';

describe('ContactoEmergenciaPaciente Form Service', () => {
  let service: ContactoEmergenciaPacienteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactoEmergenciaPacienteFormService);
  });

  describe('Service methods', () => {
    describe('createContactoEmergenciaPacienteFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createContactoEmergenciaPacienteFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            telefono: expect.any(Object),
            direccion: expect.any(Object),
            paciente: expect.any(Object),
            parentezco: expect.any(Object),
          }),
        );
      });

      it('passing IContactoEmergenciaPaciente should create a new form with FormGroup', () => {
        const formGroup = service.createContactoEmergenciaPacienteFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            telefono: expect.any(Object),
            direccion: expect.any(Object),
            paciente: expect.any(Object),
            parentezco: expect.any(Object),
          }),
        );
      });
    });

    describe('getContactoEmergenciaPaciente', () => {
      it('should return NewContactoEmergenciaPaciente for default ContactoEmergenciaPaciente initial value', () => {
        const formGroup = service.createContactoEmergenciaPacienteFormGroup(sampleWithNewData);

        const contactoEmergenciaPaciente = service.getContactoEmergenciaPaciente(formGroup) as any;

        expect(contactoEmergenciaPaciente).toMatchObject(sampleWithNewData);
      });

      it('should return NewContactoEmergenciaPaciente for empty ContactoEmergenciaPaciente initial value', () => {
        const formGroup = service.createContactoEmergenciaPacienteFormGroup();

        const contactoEmergenciaPaciente = service.getContactoEmergenciaPaciente(formGroup) as any;

        expect(contactoEmergenciaPaciente).toMatchObject({});
      });

      it('should return IContactoEmergenciaPaciente', () => {
        const formGroup = service.createContactoEmergenciaPacienteFormGroup(sampleWithRequiredData);

        const contactoEmergenciaPaciente = service.getContactoEmergenciaPaciente(formGroup) as any;

        expect(contactoEmergenciaPaciente).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IContactoEmergenciaPaciente should not enable id FormControl', () => {
        const formGroup = service.createContactoEmergenciaPacienteFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewContactoEmergenciaPaciente should disable id FormControl', () => {
        const formGroup = service.createContactoEmergenciaPacienteFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
