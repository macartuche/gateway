import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cita-medica.test-samples';

import { CitaMedicaFormService } from './cita-medica-form.service';

describe('CitaMedica Form Service', () => {
  let service: CitaMedicaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitaMedicaFormService);
  });

  describe('Service methods', () => {
    describe('createCitaMedicaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCitaMedicaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fechaInicioAtencion: expect.any(Object),
            fechaFinAtencion: expect.any(Object),
            horaInicioAtencion: expect.any(Object),
            horaFinAtencion: expect.any(Object),
            activa: expect.any(Object),
            observacion: expect.any(Object),
            estadoId: expect.any(Object),
            pacienteId: expect.any(Object),
            tramiteId: expect.any(Object),
            turno: expect.any(Object),
          }),
        );
      });

      it('passing ICitaMedica should create a new form with FormGroup', () => {
        const formGroup = service.createCitaMedicaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fechaInicioAtencion: expect.any(Object),
            fechaFinAtencion: expect.any(Object),
            horaInicioAtencion: expect.any(Object),
            horaFinAtencion: expect.any(Object),
            activa: expect.any(Object),
            observacion: expect.any(Object),
            estadoId: expect.any(Object),
            pacienteId: expect.any(Object),
            tramiteId: expect.any(Object),
            turno: expect.any(Object),
          }),
        );
      });
    });

    describe('getCitaMedica', () => {
      it('should return NewCitaMedica for default CitaMedica initial value', () => {
        const formGroup = service.createCitaMedicaFormGroup(sampleWithNewData);

        const citaMedica = service.getCitaMedica(formGroup) as any;

        expect(citaMedica).toMatchObject(sampleWithNewData);
      });

      it('should return NewCitaMedica for empty CitaMedica initial value', () => {
        const formGroup = service.createCitaMedicaFormGroup();

        const citaMedica = service.getCitaMedica(formGroup) as any;

        expect(citaMedica).toMatchObject({});
      });

      it('should return ICitaMedica', () => {
        const formGroup = service.createCitaMedicaFormGroup(sampleWithRequiredData);

        const citaMedica = service.getCitaMedica(formGroup) as any;

        expect(citaMedica).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICitaMedica should not enable id FormControl', () => {
        const formGroup = service.createCitaMedicaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCitaMedica should disable id FormControl', () => {
        const formGroup = service.createCitaMedicaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
