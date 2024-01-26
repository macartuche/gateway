import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tarifario.test-samples';

import { TarifarioFormService } from './tarifario-form.service';

describe('Tarifario Form Service', () => {
  let service: TarifarioFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifarioFormService);
  });

  describe('Service methods', () => {
    describe('createTarifarioFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTarifarioFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            descripcion: expect.any(Object),
            valor: expect.any(Object),
          }),
        );
      });

      it('passing ITarifario should create a new form with FormGroup', () => {
        const formGroup = service.createTarifarioFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            descripcion: expect.any(Object),
            valor: expect.any(Object),
          }),
        );
      });
    });

    describe('getTarifario', () => {
      it('should return NewTarifario for default Tarifario initial value', () => {
        const formGroup = service.createTarifarioFormGroup(sampleWithNewData);

        const tarifario = service.getTarifario(formGroup) as any;

        expect(tarifario).toMatchObject(sampleWithNewData);
      });

      it('should return NewTarifario for empty Tarifario initial value', () => {
        const formGroup = service.createTarifarioFormGroup();

        const tarifario = service.getTarifario(formGroup) as any;

        expect(tarifario).toMatchObject({});
      });

      it('should return ITarifario', () => {
        const formGroup = service.createTarifarioFormGroup(sampleWithRequiredData);

        const tarifario = service.getTarifario(formGroup) as any;

        expect(tarifario).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITarifario should not enable id FormControl', () => {
        const formGroup = service.createTarifarioFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTarifario should disable id FormControl', () => {
        const formGroup = service.createTarifarioFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
