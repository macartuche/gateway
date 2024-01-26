import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../terapia.test-samples';

import { TerapiaFormService } from './terapia-form.service';

describe('Terapia Form Service', () => {
  let service: TerapiaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerapiaFormService);
  });

  describe('Service methods', () => {
    describe('createTerapiaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTerapiaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cantidad: expect.any(Object),
            descripcion: expect.any(Object),
            habilitado: expect.any(Object),
            valorUnitarioEstablecimiento: expect.any(Object),
            continuidad: expect.any(Object),
            itemLiquidacion: expect.any(Object),
            tarifario: expect.any(Object),
          }),
        );
      });

      it('passing ITerapia should create a new form with FormGroup', () => {
        const formGroup = service.createTerapiaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cantidad: expect.any(Object),
            descripcion: expect.any(Object),
            habilitado: expect.any(Object),
            valorUnitarioEstablecimiento: expect.any(Object),
            continuidad: expect.any(Object),
            itemLiquidacion: expect.any(Object),
            tarifario: expect.any(Object),
          }),
        );
      });
    });

    describe('getTerapia', () => {
      it('should return NewTerapia for default Terapia initial value', () => {
        const formGroup = service.createTerapiaFormGroup(sampleWithNewData);

        const terapia = service.getTerapia(formGroup) as any;

        expect(terapia).toMatchObject(sampleWithNewData);
      });

      it('should return NewTerapia for empty Terapia initial value', () => {
        const formGroup = service.createTerapiaFormGroup();

        const terapia = service.getTerapia(formGroup) as any;

        expect(terapia).toMatchObject({});
      });

      it('should return ITerapia', () => {
        const formGroup = service.createTerapiaFormGroup(sampleWithRequiredData);

        const terapia = service.getTerapia(formGroup) as any;

        expect(terapia).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITerapia should not enable id FormControl', () => {
        const formGroup = service.createTerapiaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTerapia should disable id FormControl', () => {
        const formGroup = service.createTerapiaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
