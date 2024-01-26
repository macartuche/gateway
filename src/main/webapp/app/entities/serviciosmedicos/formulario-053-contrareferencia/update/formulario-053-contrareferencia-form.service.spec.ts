import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../formulario-053-contrareferencia.test-samples';

import { Formulario053ContrareferenciaFormService } from './formulario-053-contrareferencia-form.service';

describe('Formulario053Contrareferencia Form Service', () => {
  let service: Formulario053ContrareferenciaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Formulario053ContrareferenciaFormService);
  });

  describe('Service methods', () => {
    describe('createFormulario053ContrareferenciaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFormulario053ContrareferenciaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            hallazgosRelevantes: expect.any(Object),
            resumen: expect.any(Object),
            tratamientoProcedimientosRealizados: expect.any(Object),
            tratamientoRecomendado: expect.any(Object),
            referenciaJustificada: expect.any(Object),
            formulario: expect.any(Object),
          }),
        );
      });

      it('passing IFormulario053Contrareferencia should create a new form with FormGroup', () => {
        const formGroup = service.createFormulario053ContrareferenciaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            hallazgosRelevantes: expect.any(Object),
            resumen: expect.any(Object),
            tratamientoProcedimientosRealizados: expect.any(Object),
            tratamientoRecomendado: expect.any(Object),
            referenciaJustificada: expect.any(Object),
            formulario: expect.any(Object),
          }),
        );
      });
    });

    describe('getFormulario053Contrareferencia', () => {
      it('should return NewFormulario053Contrareferencia for default Formulario053Contrareferencia initial value', () => {
        const formGroup = service.createFormulario053ContrareferenciaFormGroup(sampleWithNewData);

        const formulario053Contrareferencia = service.getFormulario053Contrareferencia(formGroup) as any;

        expect(formulario053Contrareferencia).toMatchObject(sampleWithNewData);
      });

      it('should return NewFormulario053Contrareferencia for empty Formulario053Contrareferencia initial value', () => {
        const formGroup = service.createFormulario053ContrareferenciaFormGroup();

        const formulario053Contrareferencia = service.getFormulario053Contrareferencia(formGroup) as any;

        expect(formulario053Contrareferencia).toMatchObject({});
      });

      it('should return IFormulario053Contrareferencia', () => {
        const formGroup = service.createFormulario053ContrareferenciaFormGroup(sampleWithRequiredData);

        const formulario053Contrareferencia = service.getFormulario053Contrareferencia(formGroup) as any;

        expect(formulario053Contrareferencia).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFormulario053Contrareferencia should not enable id FormControl', () => {
        const formGroup = service.createFormulario053ContrareferenciaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFormulario053Contrareferencia should disable id FormControl', () => {
        const formGroup = service.createFormulario053ContrareferenciaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
