import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cie.test-samples';

import { CieFormService } from './cie-form.service';

describe('Cie Form Service', () => {
  let service: CieFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CieFormService);
  });

  describe('Service methods', () => {
    describe('createCieFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCieFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            activo: expect.any(Object),
          }),
        );
      });

      it('passing ICie should create a new form with FormGroup', () => {
        const formGroup = service.createCieFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            activo: expect.any(Object),
          }),
        );
      });
    });

    describe('getCie', () => {
      it('should return NewCie for default Cie initial value', () => {
        const formGroup = service.createCieFormGroup(sampleWithNewData);

        const cie = service.getCie(formGroup) as any;

        expect(cie).toMatchObject(sampleWithNewData);
      });

      it('should return NewCie for empty Cie initial value', () => {
        const formGroup = service.createCieFormGroup();

        const cie = service.getCie(formGroup) as any;

        expect(cie).toMatchObject({});
      });

      it('should return ICie', () => {
        const formGroup = service.createCieFormGroup(sampleWithRequiredData);

        const cie = service.getCie(formGroup) as any;

        expect(cie).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICie should not enable id FormControl', () => {
        const formGroup = service.createCieFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCie should disable id FormControl', () => {
        const formGroup = service.createCieFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
