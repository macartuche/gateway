import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../distrito.test-samples';

import { DistritoFormService } from './distrito-form.service';

describe('Distrito Form Service', () => {
  let service: DistritoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistritoFormService);
  });

  describe('Service methods', () => {
    describe('createDistritoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDistritoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            provincia: expect.any(Object),
          }),
        );
      });

      it('passing IDistrito should create a new form with FormGroup', () => {
        const formGroup = service.createDistritoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            provincia: expect.any(Object),
          }),
        );
      });
    });

    describe('getDistrito', () => {
      it('should return NewDistrito for default Distrito initial value', () => {
        const formGroup = service.createDistritoFormGroup(sampleWithNewData);

        const distrito = service.getDistrito(formGroup) as any;

        expect(distrito).toMatchObject(sampleWithNewData);
      });

      it('should return NewDistrito for empty Distrito initial value', () => {
        const formGroup = service.createDistritoFormGroup();

        const distrito = service.getDistrito(formGroup) as any;

        expect(distrito).toMatchObject({});
      });

      it('should return IDistrito', () => {
        const formGroup = service.createDistritoFormGroup(sampleWithRequiredData);

        const distrito = service.getDistrito(formGroup) as any;

        expect(distrito).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDistrito should not enable id FormControl', () => {
        const formGroup = service.createDistritoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDistrito should disable id FormControl', () => {
        const formGroup = service.createDistritoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
