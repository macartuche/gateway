import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../bloqueo-turno.test-samples';

import { BloqueoTurnoFormService } from './bloqueo-turno-form.service';

describe('BloqueoTurno Form Service', () => {
  let service: BloqueoTurnoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloqueoTurnoFormService);
  });

  describe('Service methods', () => {
    describe('createBloqueoTurnoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBloqueoTurnoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fecha: expect.any(Object),
            explicacion: expect.any(Object),
            activo: expect.any(Object),
            turno: expect.any(Object),
          }),
        );
      });

      it('passing IBloqueoTurno should create a new form with FormGroup', () => {
        const formGroup = service.createBloqueoTurnoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fecha: expect.any(Object),
            explicacion: expect.any(Object),
            activo: expect.any(Object),
            turno: expect.any(Object),
          }),
        );
      });
    });

    describe('getBloqueoTurno', () => {
      it('should return NewBloqueoTurno for default BloqueoTurno initial value', () => {
        const formGroup = service.createBloqueoTurnoFormGroup(sampleWithNewData);

        const bloqueoTurno = service.getBloqueoTurno(formGroup) as any;

        expect(bloqueoTurno).toMatchObject(sampleWithNewData);
      });

      it('should return NewBloqueoTurno for empty BloqueoTurno initial value', () => {
        const formGroup = service.createBloqueoTurnoFormGroup();

        const bloqueoTurno = service.getBloqueoTurno(formGroup) as any;

        expect(bloqueoTurno).toMatchObject({});
      });

      it('should return IBloqueoTurno', () => {
        const formGroup = service.createBloqueoTurnoFormGroup(sampleWithRequiredData);

        const bloqueoTurno = service.getBloqueoTurno(formGroup) as any;

        expect(bloqueoTurno).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBloqueoTurno should not enable id FormControl', () => {
        const formGroup = service.createBloqueoTurnoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBloqueoTurno should disable id FormControl', () => {
        const formGroup = service.createBloqueoTurnoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
