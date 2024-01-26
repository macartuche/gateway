import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../horario-establecimiento.test-samples';

import { HorarioEstablecimientoFormService } from './horario-establecimiento-form.service';

describe('HorarioEstablecimiento Form Service', () => {
  let service: HorarioEstablecimientoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioEstablecimientoFormService);
  });

  describe('Service methods', () => {
    describe('createHorarioEstablecimientoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createHorarioEstablecimientoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            numeroHoras: expect.any(Object),
            descripcion: expect.any(Object),
            horaInicio: expect.any(Object),
            horaFin: expect.any(Object),
          }),
        );
      });

      it('passing IHorarioEstablecimiento should create a new form with FormGroup', () => {
        const formGroup = service.createHorarioEstablecimientoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            numeroHoras: expect.any(Object),
            descripcion: expect.any(Object),
            horaInicio: expect.any(Object),
            horaFin: expect.any(Object),
          }),
        );
      });
    });

    describe('getHorarioEstablecimiento', () => {
      it('should return NewHorarioEstablecimiento for default HorarioEstablecimiento initial value', () => {
        const formGroup = service.createHorarioEstablecimientoFormGroup(sampleWithNewData);

        const horarioEstablecimiento = service.getHorarioEstablecimiento(formGroup) as any;

        expect(horarioEstablecimiento).toMatchObject(sampleWithNewData);
      });

      it('should return NewHorarioEstablecimiento for empty HorarioEstablecimiento initial value', () => {
        const formGroup = service.createHorarioEstablecimientoFormGroup();

        const horarioEstablecimiento = service.getHorarioEstablecimiento(formGroup) as any;

        expect(horarioEstablecimiento).toMatchObject({});
      });

      it('should return IHorarioEstablecimiento', () => {
        const formGroup = service.createHorarioEstablecimientoFormGroup(sampleWithRequiredData);

        const horarioEstablecimiento = service.getHorarioEstablecimiento(formGroup) as any;

        expect(horarioEstablecimiento).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IHorarioEstablecimiento should not enable id FormControl', () => {
        const formGroup = service.createHorarioEstablecimientoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewHorarioEstablecimiento should disable id FormControl', () => {
        const formGroup = service.createHorarioEstablecimientoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
