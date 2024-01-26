import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../item-cie.test-samples';

import { ItemCieFormService } from './item-cie-form.service';

describe('ItemCie Form Service', () => {
  let service: ItemCieFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemCieFormService);
  });

  describe('Service methods', () => {
    describe('createItemCieFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createItemCieFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            codigo: expect.any(Object),
            activo: expect.any(Object),
            padre: expect.any(Object),
            cie: expect.any(Object),
          }),
        );
      });

      it('passing IItemCie should create a new form with FormGroup', () => {
        const formGroup = service.createItemCieFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            codigo: expect.any(Object),
            activo: expect.any(Object),
            padre: expect.any(Object),
            cie: expect.any(Object),
          }),
        );
      });
    });

    describe('getItemCie', () => {
      it('should return NewItemCie for default ItemCie initial value', () => {
        const formGroup = service.createItemCieFormGroup(sampleWithNewData);

        const itemCie = service.getItemCie(formGroup) as any;

        expect(itemCie).toMatchObject(sampleWithNewData);
      });

      it('should return NewItemCie for empty ItemCie initial value', () => {
        const formGroup = service.createItemCieFormGroup();

        const itemCie = service.getItemCie(formGroup) as any;

        expect(itemCie).toMatchObject({});
      });

      it('should return IItemCie', () => {
        const formGroup = service.createItemCieFormGroup(sampleWithRequiredData);

        const itemCie = service.getItemCie(formGroup) as any;

        expect(itemCie).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IItemCie should not enable id FormControl', () => {
        const formGroup = service.createItemCieFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewItemCie should disable id FormControl', () => {
        const formGroup = service.createItemCieFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
