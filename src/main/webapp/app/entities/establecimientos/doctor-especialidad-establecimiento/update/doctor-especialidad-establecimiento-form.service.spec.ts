import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../doctor-especialidad-establecimiento.test-samples';

import { DoctorEspecialidadEstablecimientoFormService } from './doctor-especialidad-establecimiento-form.service';

describe('DoctorEspecialidadEstablecimiento Form Service', () => {
  let service: DoctorEspecialidadEstablecimientoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorEspecialidadEstablecimientoFormService);
  });

  describe('Service methods', () => {
    describe('createDoctorEspecialidadEstablecimientoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDoctorEspecialidadEstablecimientoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            doctorId: expect.any(Object),
            especialidadId: expect.any(Object),
            establecimiento: expect.any(Object),
          }),
        );
      });

      it('passing IDoctorEspecialidadEstablecimiento should create a new form with FormGroup', () => {
        const formGroup = service.createDoctorEspecialidadEstablecimientoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            doctorId: expect.any(Object),
            especialidadId: expect.any(Object),
            establecimiento: expect.any(Object),
          }),
        );
      });
    });

    describe('getDoctorEspecialidadEstablecimiento', () => {
      it('should return NewDoctorEspecialidadEstablecimiento for default DoctorEspecialidadEstablecimiento initial value', () => {
        const formGroup = service.createDoctorEspecialidadEstablecimientoFormGroup(sampleWithNewData);

        const doctorEspecialidadEstablecimiento = service.getDoctorEspecialidadEstablecimiento(formGroup) as any;

        expect(doctorEspecialidadEstablecimiento).toMatchObject(sampleWithNewData);
      });

      it('should return NewDoctorEspecialidadEstablecimiento for empty DoctorEspecialidadEstablecimiento initial value', () => {
        const formGroup = service.createDoctorEspecialidadEstablecimientoFormGroup();

        const doctorEspecialidadEstablecimiento = service.getDoctorEspecialidadEstablecimiento(formGroup) as any;

        expect(doctorEspecialidadEstablecimiento).toMatchObject({});
      });

      it('should return IDoctorEspecialidadEstablecimiento', () => {
        const formGroup = service.createDoctorEspecialidadEstablecimientoFormGroup(sampleWithRequiredData);

        const doctorEspecialidadEstablecimiento = service.getDoctorEspecialidadEstablecimiento(formGroup) as any;

        expect(doctorEspecialidadEstablecimiento).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDoctorEspecialidadEstablecimiento should not enable id FormControl', () => {
        const formGroup = service.createDoctorEspecialidadEstablecimientoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDoctorEspecialidadEstablecimiento should disable id FormControl', () => {
        const formGroup = service.createDoctorEspecialidadEstablecimientoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
