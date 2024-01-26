import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../continuidad-asistencial.test-samples';

import { ContinuidadAsistencialFormService } from './continuidad-asistencial-form.service';

describe('ContinuidadAsistencial Form Service', () => {
  let service: ContinuidadAsistencialFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContinuidadAsistencialFormService);
  });

  describe('Service methods', () => {
    describe('createContinuidadAsistencialFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createContinuidadAsistencialFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            observacion: expect.any(Object),
            servicioHospitalario: expect.any(Object),
            itemCie: expect.any(Object),
          }),
        );
      });

      it('passing IContinuidadAsistencial should create a new form with FormGroup', () => {
        const formGroup = service.createContinuidadAsistencialFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            observacion: expect.any(Object),
            servicioHospitalario: expect.any(Object),
            itemCie: expect.any(Object),
          }),
        );
      });
    });

    describe('getContinuidadAsistencial', () => {
      it('should return NewContinuidadAsistencial for default ContinuidadAsistencial initial value', () => {
        const formGroup = service.createContinuidadAsistencialFormGroup(sampleWithNewData);

        const continuidadAsistencial = service.getContinuidadAsistencial(formGroup) as any;

        expect(continuidadAsistencial).toMatchObject(sampleWithNewData);
      });

      it('should return NewContinuidadAsistencial for empty ContinuidadAsistencial initial value', () => {
        const formGroup = service.createContinuidadAsistencialFormGroup();

        const continuidadAsistencial = service.getContinuidadAsistencial(formGroup) as any;

        expect(continuidadAsistencial).toMatchObject({});
      });

      it('should return IContinuidadAsistencial', () => {
        const formGroup = service.createContinuidadAsistencialFormGroup(sampleWithRequiredData);

        const continuidadAsistencial = service.getContinuidadAsistencial(formGroup) as any;

        expect(continuidadAsistencial).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IContinuidadAsistencial should not enable id FormControl', () => {
        const formGroup = service.createContinuidadAsistencialFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewContinuidadAsistencial should disable id FormControl', () => {
        const formGroup = service.createContinuidadAsistencialFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
