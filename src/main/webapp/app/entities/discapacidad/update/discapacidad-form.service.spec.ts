import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../discapacidad.test-samples';

import { DiscapacidadFormService } from './discapacidad-form.service';

describe('Discapacidad Form Service', () => {
  let service: DiscapacidadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscapacidadFormService);
  });

  describe('Service methods', () => {
    describe('createDiscapacidadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDiscapacidadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            porcentaje: expect.any(Object),
            tipo: expect.any(Object),
            estado: expect.any(Object),
          }),
        );
      });

      it('passing IDiscapacidad should create a new form with FormGroup', () => {
        const formGroup = service.createDiscapacidadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            porcentaje: expect.any(Object),
            tipo: expect.any(Object),
            estado: expect.any(Object),
          }),
        );
      });
    });

    describe('getDiscapacidad', () => {
      it('should return NewDiscapacidad for default Discapacidad initial value', () => {
        const formGroup = service.createDiscapacidadFormGroup(sampleWithNewData);

        const discapacidad = service.getDiscapacidad(formGroup) as any;

        expect(discapacidad).toMatchObject(sampleWithNewData);
      });

      it('should return NewDiscapacidad for empty Discapacidad initial value', () => {
        const formGroup = service.createDiscapacidadFormGroup();

        const discapacidad = service.getDiscapacidad(formGroup) as any;

        expect(discapacidad).toMatchObject({});
      });

      it('should return IDiscapacidad', () => {
        const formGroup = service.createDiscapacidadFormGroup(sampleWithRequiredData);

        const discapacidad = service.getDiscapacidad(formGroup) as any;

        expect(discapacidad).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDiscapacidad should not enable id FormControl', () => {
        const formGroup = service.createDiscapacidadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDiscapacidad should disable id FormControl', () => {
        const formGroup = service.createDiscapacidadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
