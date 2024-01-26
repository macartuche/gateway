import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cronograma.test-samples';

import { CronogramaFormService } from './cronograma-form.service';

describe('Cronograma Form Service', () => {
  let service: CronogramaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CronogramaFormService);
  });

  describe('Service methods', () => {
    describe('createCronogramaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCronogramaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fechaInicio: expect.any(Object),
            fechaFin: expect.any(Object),
            activo: expect.any(Object),
            especialidadId: expect.any(Object),
            doctorId: expect.any(Object),
            establecimientoId: expect.any(Object),
          }),
        );
      });

      it('passing ICronograma should create a new form with FormGroup', () => {
        const formGroup = service.createCronogramaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fechaInicio: expect.any(Object),
            fechaFin: expect.any(Object),
            activo: expect.any(Object),
            especialidadId: expect.any(Object),
            doctorId: expect.any(Object),
            establecimientoId: expect.any(Object),
          }),
        );
      });
    });

    describe('getCronograma', () => {
      it('should return NewCronograma for default Cronograma initial value', () => {
        const formGroup = service.createCronogramaFormGroup(sampleWithNewData);

        const cronograma = service.getCronograma(formGroup) as any;

        expect(cronograma).toMatchObject(sampleWithNewData);
      });

      it('should return NewCronograma for empty Cronograma initial value', () => {
        const formGroup = service.createCronogramaFormGroup();

        const cronograma = service.getCronograma(formGroup) as any;

        expect(cronograma).toMatchObject({});
      });

      it('should return ICronograma', () => {
        const formGroup = service.createCronogramaFormGroup(sampleWithRequiredData);

        const cronograma = service.getCronograma(formGroup) as any;

        expect(cronograma).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICronograma should not enable id FormControl', () => {
        const formGroup = service.createCronogramaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCronograma should disable id FormControl', () => {
        const formGroup = service.createCronogramaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
