import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../canton-territorio.test-samples';

import { CantonTerritorioFormService } from './canton-territorio-form.service';

describe('CantonTerritorio Form Service', () => {
  let service: CantonTerritorioFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CantonTerritorioFormService);
  });

  describe('Service methods', () => {
    describe('createCantonTerritorioFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCantonTerritorioFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            provincia: expect.any(Object),
          }),
        );
      });

      it('passing ICantonTerritorio should create a new form with FormGroup', () => {
        const formGroup = service.createCantonTerritorioFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            provincia: expect.any(Object),
          }),
        );
      });
    });

    describe('getCantonTerritorio', () => {
      it('should return NewCantonTerritorio for default CantonTerritorio initial value', () => {
        const formGroup = service.createCantonTerritorioFormGroup(sampleWithNewData);

        const cantonTerritorio = service.getCantonTerritorio(formGroup) as any;

        expect(cantonTerritorio).toMatchObject(sampleWithNewData);
      });

      it('should return NewCantonTerritorio for empty CantonTerritorio initial value', () => {
        const formGroup = service.createCantonTerritorioFormGroup();

        const cantonTerritorio = service.getCantonTerritorio(formGroup) as any;

        expect(cantonTerritorio).toMatchObject({});
      });

      it('should return ICantonTerritorio', () => {
        const formGroup = service.createCantonTerritorioFormGroup(sampleWithRequiredData);

        const cantonTerritorio = service.getCantonTerritorio(formGroup) as any;

        expect(cantonTerritorio).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICantonTerritorio should not enable id FormControl', () => {
        const formGroup = service.createCantonTerritorioFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCantonTerritorio should disable id FormControl', () => {
        const formGroup = service.createCantonTerritorioFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
