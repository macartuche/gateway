import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../procedimiento.test-samples';

import { ProcedimientoFormService } from './procedimiento-form.service';

describe('Procedimiento Form Service', () => {
  let service: ProcedimientoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcedimientoFormService);
  });

  describe('Service methods', () => {
    describe('createProcedimientoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProcedimientoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fecha: expect.any(Object),
            observacion: expect.any(Object),
            estadoId: expect.any(Object),
            usuarioId: expect.any(Object),
            tramite: expect.any(Object),
          }),
        );
      });

      it('passing IProcedimiento should create a new form with FormGroup', () => {
        const formGroup = service.createProcedimientoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fecha: expect.any(Object),
            observacion: expect.any(Object),
            estadoId: expect.any(Object),
            usuarioId: expect.any(Object),
            tramite: expect.any(Object),
          }),
        );
      });
    });

    describe('getProcedimiento', () => {
      it('should return NewProcedimiento for default Procedimiento initial value', () => {
        const formGroup = service.createProcedimientoFormGroup(sampleWithNewData);

        const procedimiento = service.getProcedimiento(formGroup) as any;

        expect(procedimiento).toMatchObject(sampleWithNewData);
      });

      it('should return NewProcedimiento for empty Procedimiento initial value', () => {
        const formGroup = service.createProcedimientoFormGroup();

        const procedimiento = service.getProcedimiento(formGroup) as any;

        expect(procedimiento).toMatchObject({});
      });

      it('should return IProcedimiento', () => {
        const formGroup = service.createProcedimientoFormGroup(sampleWithRequiredData);

        const procedimiento = service.getProcedimiento(formGroup) as any;

        expect(procedimiento).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProcedimiento should not enable id FormControl', () => {
        const formGroup = service.createProcedimientoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProcedimiento should disable id FormControl', () => {
        const formGroup = service.createProcedimientoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
