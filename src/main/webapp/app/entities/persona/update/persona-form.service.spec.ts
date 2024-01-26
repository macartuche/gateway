import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../persona.test-samples';

import { PersonaFormService } from './persona-form.service';

describe('Persona Form Service', () => {
  let service: PersonaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaFormService);
  });

  describe('Service methods', () => {
    describe('createPersonaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPersonaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            identificacion: expect.any(Object),
            primerApellido: expect.any(Object),
            segundoApellido: expect.any(Object),
            primerNombre: expect.any(Object),
            segundoNombre: expect.any(Object),
            celular: expect.any(Object),
            telefonoConvencional: expect.any(Object),
            correo: expect.any(Object),
            tipoIdentificacion: expect.any(Object),
            nacionalidad: expect.any(Object),
            usuario: expect.any(Object),
            genero: expect.any(Object),
            estadoCivil: expect.any(Object),
            nivelEducacion: expect.any(Object),
            estadoNivelEducacion: expect.any(Object),
          }),
        );
      });

      it('passing IPersona should create a new form with FormGroup', () => {
        const formGroup = service.createPersonaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            identificacion: expect.any(Object),
            primerApellido: expect.any(Object),
            segundoApellido: expect.any(Object),
            primerNombre: expect.any(Object),
            segundoNombre: expect.any(Object),
            celular: expect.any(Object),
            telefonoConvencional: expect.any(Object),
            correo: expect.any(Object),
            tipoIdentificacion: expect.any(Object),
            nacionalidad: expect.any(Object),
            usuario: expect.any(Object),
            genero: expect.any(Object),
            estadoCivil: expect.any(Object),
            nivelEducacion: expect.any(Object),
            estadoNivelEducacion: expect.any(Object),
          }),
        );
      });
    });

    describe('getPersona', () => {
      it('should return NewPersona for default Persona initial value', () => {
        const formGroup = service.createPersonaFormGroup(sampleWithNewData);

        const persona = service.getPersona(formGroup) as any;

        expect(persona).toMatchObject(sampleWithNewData);
      });

      it('should return NewPersona for empty Persona initial value', () => {
        const formGroup = service.createPersonaFormGroup();

        const persona = service.getPersona(formGroup) as any;

        expect(persona).toMatchObject({});
      });

      it('should return IPersona', () => {
        const formGroup = service.createPersonaFormGroup(sampleWithRequiredData);

        const persona = service.getPersona(formGroup) as any;

        expect(persona).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPersona should not enable id FormControl', () => {
        const formGroup = service.createPersonaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPersona should disable id FormControl', () => {
        const formGroup = service.createPersonaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
