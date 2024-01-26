import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../detalle-cronograma.test-samples';

import { DetalleCronogramaFormService } from './detalle-cronograma-form.service';

describe('DetalleCronograma Form Service', () => {
  let service: DetalleCronogramaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleCronogramaFormService);
  });

  describe('Service methods', () => {
    describe('createDetalleCronogramaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDetalleCronogramaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fecha: expect.any(Object),
            cantidad: expect.any(Object),
            activo: expect.any(Object),
            fechaDesactivacion: expect.any(Object),
            tipoId: expect.any(Object),
            cronograma: expect.any(Object),
          }),
        );
      });

      it('passing IDetalleCronograma should create a new form with FormGroup', () => {
        const formGroup = service.createDetalleCronogramaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fecha: expect.any(Object),
            cantidad: expect.any(Object),
            activo: expect.any(Object),
            fechaDesactivacion: expect.any(Object),
            tipoId: expect.any(Object),
            cronograma: expect.any(Object),
          }),
        );
      });
    });

    describe('getDetalleCronograma', () => {
      it('should return NewDetalleCronograma for default DetalleCronograma initial value', () => {
        const formGroup = service.createDetalleCronogramaFormGroup(sampleWithNewData);

        const detalleCronograma = service.getDetalleCronograma(formGroup) as any;

        expect(detalleCronograma).toMatchObject(sampleWithNewData);
      });

      it('should return NewDetalleCronograma for empty DetalleCronograma initial value', () => {
        const formGroup = service.createDetalleCronogramaFormGroup();

        const detalleCronograma = service.getDetalleCronograma(formGroup) as any;

        expect(detalleCronograma).toMatchObject({});
      });

      it('should return IDetalleCronograma', () => {
        const formGroup = service.createDetalleCronogramaFormGroup(sampleWithRequiredData);

        const detalleCronograma = service.getDetalleCronograma(formGroup) as any;

        expect(detalleCronograma).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDetalleCronograma should not enable id FormControl', () => {
        const formGroup = service.createDetalleCronogramaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDetalleCronograma should disable id FormControl', () => {
        const formGroup = service.createDetalleCronogramaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
