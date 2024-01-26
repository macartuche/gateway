import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../formulario-053-referencia.test-samples';

import { Formulario053ReferenciaFormService } from './formulario-053-referencia-form.service';

describe('Formulario053Referencia Form Service', () => {
  let service: Formulario053ReferenciaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Formulario053ReferenciaFormService);
  });

  describe('Service methods', () => {
    describe('createFormulario053ReferenciaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFormulario053ReferenciaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cuadroClinico: expect.any(Object),
            hallazgosRelevantes: expect.any(Object),
            formulario: expect.any(Object),
          }),
        );
      });

      it('passing IFormulario053Referencia should create a new form with FormGroup', () => {
        const formGroup = service.createFormulario053ReferenciaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cuadroClinico: expect.any(Object),
            hallazgosRelevantes: expect.any(Object),
            formulario: expect.any(Object),
          }),
        );
      });
    });

    describe('getFormulario053Referencia', () => {
      it('should return NewFormulario053Referencia for default Formulario053Referencia initial value', () => {
        const formGroup = service.createFormulario053ReferenciaFormGroup(sampleWithNewData);

        const formulario053Referencia = service.getFormulario053Referencia(formGroup) as any;

        expect(formulario053Referencia).toMatchObject(sampleWithNewData);
      });

      it('should return NewFormulario053Referencia for empty Formulario053Referencia initial value', () => {
        const formGroup = service.createFormulario053ReferenciaFormGroup();

        const formulario053Referencia = service.getFormulario053Referencia(formGroup) as any;

        expect(formulario053Referencia).toMatchObject({});
      });

      it('should return IFormulario053Referencia', () => {
        const formGroup = service.createFormulario053ReferenciaFormGroup(sampleWithRequiredData);

        const formulario053Referencia = service.getFormulario053Referencia(formGroup) as any;

        expect(formulario053Referencia).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFormulario053Referencia should not enable id FormControl', () => {
        const formGroup = service.createFormulario053ReferenciaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFormulario053Referencia should disable id FormControl', () => {
        const formGroup = service.createFormulario053ReferenciaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
