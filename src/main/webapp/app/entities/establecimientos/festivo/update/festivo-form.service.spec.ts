import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../festivo.test-samples';

import { FestivoFormService } from './festivo-form.service';

describe('Festivo Form Service', () => {
  let service: FestivoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FestivoFormService);
  });

  describe('Service methods', () => {
    describe('createFestivoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFestivoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            fechaInicio: expect.any(Object),
            fechaFin: expect.any(Object),
            activo: expect.any(Object),
          }),
        );
      });

      it('passing IFestivo should create a new form with FormGroup', () => {
        const formGroup = service.createFestivoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            fechaInicio: expect.any(Object),
            fechaFin: expect.any(Object),
            activo: expect.any(Object),
          }),
        );
      });
    });

    describe('getFestivo', () => {
      it('should return NewFestivo for default Festivo initial value', () => {
        const formGroup = service.createFestivoFormGroup(sampleWithNewData);

        const festivo = service.getFestivo(formGroup) as any;

        expect(festivo).toMatchObject(sampleWithNewData);
      });

      it('should return NewFestivo for empty Festivo initial value', () => {
        const formGroup = service.createFestivoFormGroup();

        const festivo = service.getFestivo(formGroup) as any;

        expect(festivo).toMatchObject({});
      });

      it('should return IFestivo', () => {
        const formGroup = service.createFestivoFormGroup(sampleWithRequiredData);

        const festivo = service.getFestivo(formGroup) as any;

        expect(festivo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFestivo should not enable id FormControl', () => {
        const formGroup = service.createFestivoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFestivo should disable id FormControl', () => {
        const formGroup = service.createFestivoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
