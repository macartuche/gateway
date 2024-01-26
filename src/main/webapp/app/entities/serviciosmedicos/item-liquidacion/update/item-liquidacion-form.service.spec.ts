import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../item-liquidacion.test-samples';

import { ItemLiquidacionFormService } from './item-liquidacion-form.service';

describe('ItemLiquidacion Form Service', () => {
  let service: ItemLiquidacionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemLiquidacionFormService);
  });

  describe('Service methods', () => {
    describe('createItemLiquidacionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createItemLiquidacionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fecha: expect.any(Object),
            habilitado: expect.any(Object),
            continuidad: expect.any(Object),
          }),
        );
      });

      it('passing IItemLiquidacion should create a new form with FormGroup', () => {
        const formGroup = service.createItemLiquidacionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fecha: expect.any(Object),
            habilitado: expect.any(Object),
            continuidad: expect.any(Object),
          }),
        );
      });
    });

    describe('getItemLiquidacion', () => {
      it('should return NewItemLiquidacion for default ItemLiquidacion initial value', () => {
        const formGroup = service.createItemLiquidacionFormGroup(sampleWithNewData);

        const itemLiquidacion = service.getItemLiquidacion(formGroup) as any;

        expect(itemLiquidacion).toMatchObject(sampleWithNewData);
      });

      it('should return NewItemLiquidacion for empty ItemLiquidacion initial value', () => {
        const formGroup = service.createItemLiquidacionFormGroup();

        const itemLiquidacion = service.getItemLiquidacion(formGroup) as any;

        expect(itemLiquidacion).toMatchObject({});
      });

      it('should return IItemLiquidacion', () => {
        const formGroup = service.createItemLiquidacionFormGroup(sampleWithRequiredData);

        const itemLiquidacion = service.getItemLiquidacion(formGroup) as any;

        expect(itemLiquidacion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IItemLiquidacion should not enable id FormControl', () => {
        const formGroup = service.createItemLiquidacionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewItemLiquidacion should disable id FormControl', () => {
        const formGroup = service.createItemLiquidacionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
