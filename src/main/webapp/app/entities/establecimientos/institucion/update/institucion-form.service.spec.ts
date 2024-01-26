import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../institucion.test-samples';

import { InstitucionFormService } from './institucion-form.service';

describe('Institucion Form Service', () => {
  let service: InstitucionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitucionFormService);
  });

  describe('Service methods', () => {
    describe('createInstitucionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInstitucionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            permiteDerivacion: expect.any(Object),
            permiteReferencia: expect.any(Object),
            permiteContrareferencia: expect.any(Object),
            estadoId: expect.any(Object),
          }),
        );
      });

      it('passing IInstitucion should create a new form with FormGroup', () => {
        const formGroup = service.createInstitucionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            permiteDerivacion: expect.any(Object),
            permiteReferencia: expect.any(Object),
            permiteContrareferencia: expect.any(Object),
            estadoId: expect.any(Object),
          }),
        );
      });
    });

    describe('getInstitucion', () => {
      it('should return NewInstitucion for default Institucion initial value', () => {
        const formGroup = service.createInstitucionFormGroup(sampleWithNewData);

        const institucion = service.getInstitucion(formGroup) as any;

        expect(institucion).toMatchObject(sampleWithNewData);
      });

      it('should return NewInstitucion for empty Institucion initial value', () => {
        const formGroup = service.createInstitucionFormGroup();

        const institucion = service.getInstitucion(formGroup) as any;

        expect(institucion).toMatchObject({});
      });

      it('should return IInstitucion', () => {
        const formGroup = service.createInstitucionFormGroup(sampleWithRequiredData);

        const institucion = service.getInstitucion(formGroup) as any;

        expect(institucion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInstitucion should not enable id FormControl', () => {
        const formGroup = service.createInstitucionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInstitucion should disable id FormControl', () => {
        const formGroup = service.createInstitucionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
