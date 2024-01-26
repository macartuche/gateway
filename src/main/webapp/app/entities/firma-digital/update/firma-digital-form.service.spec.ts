import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../firma-digital.test-samples';

import { FirmaDigitalFormService } from './firma-digital-form.service';

describe('FirmaDigital Form Service', () => {
  let service: FirmaDigitalFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirmaDigitalFormService);
  });

  describe('Service methods', () => {
    describe('createFirmaDigitalFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFirmaDigitalFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fechaDesde: expect.any(Object),
            fechaHasta: expect.any(Object),
            path: expect.any(Object),
            tipo: expect.any(Object),
            persona: expect.any(Object),
          }),
        );
      });

      it('passing IFirmaDigital should create a new form with FormGroup', () => {
        const formGroup = service.createFirmaDigitalFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fechaDesde: expect.any(Object),
            fechaHasta: expect.any(Object),
            path: expect.any(Object),
            tipo: expect.any(Object),
            persona: expect.any(Object),
          }),
        );
      });
    });

    describe('getFirmaDigital', () => {
      it('should return NewFirmaDigital for default FirmaDigital initial value', () => {
        const formGroup = service.createFirmaDigitalFormGroup(sampleWithNewData);

        const firmaDigital = service.getFirmaDigital(formGroup) as any;

        expect(firmaDigital).toMatchObject(sampleWithNewData);
      });

      it('should return NewFirmaDigital for empty FirmaDigital initial value', () => {
        const formGroup = service.createFirmaDigitalFormGroup();

        const firmaDigital = service.getFirmaDigital(formGroup) as any;

        expect(firmaDigital).toMatchObject({});
      });

      it('should return IFirmaDigital', () => {
        const formGroup = service.createFirmaDigitalFormGroup(sampleWithRequiredData);

        const firmaDigital = service.getFirmaDigital(formGroup) as any;

        expect(firmaDigital).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFirmaDigital should not enable id FormControl', () => {
        const formGroup = service.createFirmaDigitalFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFirmaDigital should disable id FormControl', () => {
        const formGroup = service.createFirmaDigitalFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
