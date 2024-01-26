import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../motivo-referencia.test-samples';

import { MotivoReferenciaFormService } from './motivo-referencia-form.service';

describe('MotivoReferencia Form Service', () => {
  let service: MotivoReferenciaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotivoReferenciaFormService);
  });

  describe('Service methods', () => {
    describe('createMotivoReferenciaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMotivoReferenciaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            detalle: expect.any(Object),
            tipoId: expect.any(Object),
            referencia: expect.any(Object),
          }),
        );
      });

      it('passing IMotivoReferencia should create a new form with FormGroup', () => {
        const formGroup = service.createMotivoReferenciaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            detalle: expect.any(Object),
            tipoId: expect.any(Object),
            referencia: expect.any(Object),
          }),
        );
      });
    });

    describe('getMotivoReferencia', () => {
      it('should return NewMotivoReferencia for default MotivoReferencia initial value', () => {
        const formGroup = service.createMotivoReferenciaFormGroup(sampleWithNewData);

        const motivoReferencia = service.getMotivoReferencia(formGroup) as any;

        expect(motivoReferencia).toMatchObject(sampleWithNewData);
      });

      it('should return NewMotivoReferencia for empty MotivoReferencia initial value', () => {
        const formGroup = service.createMotivoReferenciaFormGroup();

        const motivoReferencia = service.getMotivoReferencia(formGroup) as any;

        expect(motivoReferencia).toMatchObject({});
      });

      it('should return IMotivoReferencia', () => {
        const formGroup = service.createMotivoReferenciaFormGroup(sampleWithRequiredData);

        const motivoReferencia = service.getMotivoReferencia(formGroup) as any;

        expect(motivoReferencia).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMotivoReferencia should not enable id FormControl', () => {
        const formGroup = service.createMotivoReferenciaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMotivoReferencia should disable id FormControl', () => {
        const formGroup = service.createMotivoReferenciaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
