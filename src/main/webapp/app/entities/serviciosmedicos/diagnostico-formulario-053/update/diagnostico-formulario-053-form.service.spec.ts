import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../diagnostico-formulario-053.test-samples';

import { DiagnosticoFormulario053FormService } from './diagnostico-formulario-053-form.service';

describe('DiagnosticoFormulario053 Form Service', () => {
  let service: DiagnosticoFormulario053FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosticoFormulario053FormService);
  });

  describe('Service methods', () => {
    describe('createDiagnosticoFormulario053FormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDiagnosticoFormulario053FormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dep: expect.any(Object),
            pre: expect.any(Object),
            referencia: expect.any(Object),
            contrareferencia: expect.any(Object),
            itemCie: expect.any(Object),
          }),
        );
      });

      it('passing IDiagnosticoFormulario053 should create a new form with FormGroup', () => {
        const formGroup = service.createDiagnosticoFormulario053FormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dep: expect.any(Object),
            pre: expect.any(Object),
            referencia: expect.any(Object),
            contrareferencia: expect.any(Object),
            itemCie: expect.any(Object),
          }),
        );
      });
    });

    describe('getDiagnosticoFormulario053', () => {
      it('should return NewDiagnosticoFormulario053 for default DiagnosticoFormulario053 initial value', () => {
        const formGroup = service.createDiagnosticoFormulario053FormGroup(sampleWithNewData);

        const diagnosticoFormulario053 = service.getDiagnosticoFormulario053(formGroup) as any;

        expect(diagnosticoFormulario053).toMatchObject(sampleWithNewData);
      });

      it('should return NewDiagnosticoFormulario053 for empty DiagnosticoFormulario053 initial value', () => {
        const formGroup = service.createDiagnosticoFormulario053FormGroup();

        const diagnosticoFormulario053 = service.getDiagnosticoFormulario053(formGroup) as any;

        expect(diagnosticoFormulario053).toMatchObject({});
      });

      it('should return IDiagnosticoFormulario053', () => {
        const formGroup = service.createDiagnosticoFormulario053FormGroup(sampleWithRequiredData);

        const diagnosticoFormulario053 = service.getDiagnosticoFormulario053(formGroup) as any;

        expect(diagnosticoFormulario053).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDiagnosticoFormulario053 should not enable id FormControl', () => {
        const formGroup = service.createDiagnosticoFormulario053FormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDiagnosticoFormulario053 should disable id FormControl', () => {
        const formGroup = service.createDiagnosticoFormulario053FormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
