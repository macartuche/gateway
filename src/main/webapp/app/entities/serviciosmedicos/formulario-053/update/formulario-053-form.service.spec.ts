import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../formulario-053.test-samples';

import { Formulario053FormService } from './formulario-053-form.service';

describe('Formulario053 Form Service', () => {
  let service: Formulario053FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Formulario053FormService);
  });

  describe('Service methods', () => {
    describe('createFormulario053FormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFormulario053FormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fecha: expect.any(Object),
            numeroHistoriaClinica: expect.any(Object),
            servicioEspecialidad: expect.any(Object),
            tipoId: expect.any(Object),
            pacienteId: expect.any(Object),
            doctorId: expect.any(Object),
            establecimientoOrigenId: expect.any(Object),
            establecimientoDestinoId: expect.any(Object),
            especialidadId: expect.any(Object),
          }),
        );
      });

      it('passing IFormulario053 should create a new form with FormGroup', () => {
        const formGroup = service.createFormulario053FormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fecha: expect.any(Object),
            numeroHistoriaClinica: expect.any(Object),
            servicioEspecialidad: expect.any(Object),
            tipoId: expect.any(Object),
            pacienteId: expect.any(Object),
            doctorId: expect.any(Object),
            establecimientoOrigenId: expect.any(Object),
            establecimientoDestinoId: expect.any(Object),
            especialidadId: expect.any(Object),
          }),
        );
      });
    });

    describe('getFormulario053', () => {
      it('should return NewFormulario053 for default Formulario053 initial value', () => {
        const formGroup = service.createFormulario053FormGroup(sampleWithNewData);

        const formulario053 = service.getFormulario053(formGroup) as any;

        expect(formulario053).toMatchObject(sampleWithNewData);
      });

      it('should return NewFormulario053 for empty Formulario053 initial value', () => {
        const formGroup = service.createFormulario053FormGroup();

        const formulario053 = service.getFormulario053(formGroup) as any;

        expect(formulario053).toMatchObject({});
      });

      it('should return IFormulario053', () => {
        const formGroup = service.createFormulario053FormGroup(sampleWithRequiredData);

        const formulario053 = service.getFormulario053(formGroup) as any;

        expect(formulario053).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFormulario053 should not enable id FormControl', () => {
        const formGroup = service.createFormulario053FormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFormulario053 should disable id FormControl', () => {
        const formGroup = service.createFormulario053FormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
