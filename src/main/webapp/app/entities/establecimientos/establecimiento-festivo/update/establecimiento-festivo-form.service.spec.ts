import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../establecimiento-festivo.test-samples';

import { EstablecimientoFestivoFormService } from './establecimiento-festivo-form.service';

describe('EstablecimientoFestivo Form Service', () => {
  let service: EstablecimientoFestivoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstablecimientoFestivoFormService);
  });

  describe('Service methods', () => {
    describe('createEstablecimientoFestivoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEstablecimientoFestivoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            establecimiento: expect.any(Object),
            festivo: expect.any(Object),
          }),
        );
      });

      it('passing IEstablecimientoFestivo should create a new form with FormGroup', () => {
        const formGroup = service.createEstablecimientoFestivoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            establecimiento: expect.any(Object),
            festivo: expect.any(Object),
          }),
        );
      });
    });

    describe('getEstablecimientoFestivo', () => {
      it('should return NewEstablecimientoFestivo for default EstablecimientoFestivo initial value', () => {
        const formGroup = service.createEstablecimientoFestivoFormGroup(sampleWithNewData);

        const establecimientoFestivo = service.getEstablecimientoFestivo(formGroup) as any;

        expect(establecimientoFestivo).toMatchObject(sampleWithNewData);
      });

      it('should return NewEstablecimientoFestivo for empty EstablecimientoFestivo initial value', () => {
        const formGroup = service.createEstablecimientoFestivoFormGroup();

        const establecimientoFestivo = service.getEstablecimientoFestivo(formGroup) as any;

        expect(establecimientoFestivo).toMatchObject({});
      });

      it('should return IEstablecimientoFestivo', () => {
        const formGroup = service.createEstablecimientoFestivoFormGroup(sampleWithRequiredData);

        const establecimientoFestivo = service.getEstablecimientoFestivo(formGroup) as any;

        expect(establecimientoFestivo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEstablecimientoFestivo should not enable id FormControl', () => {
        const formGroup = service.createEstablecimientoFestivoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEstablecimientoFestivo should disable id FormControl', () => {
        const formGroup = service.createEstablecimientoFestivoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
