import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../provincia-territorio.test-samples';

import { ProvinciaTerritorioFormService } from './provincia-territorio-form.service';

describe('ProvinciaTerritorio Form Service', () => {
  let service: ProvinciaTerritorioFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvinciaTerritorioFormService);
  });

  describe('Service methods', () => {
    describe('createProvinciaTerritorioFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProvinciaTerritorioFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            pais: expect.any(Object),
          }),
        );
      });

      it('passing IProvinciaTerritorio should create a new form with FormGroup', () => {
        const formGroup = service.createProvinciaTerritorioFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            pais: expect.any(Object),
          }),
        );
      });
    });

    describe('getProvinciaTerritorio', () => {
      it('should return NewProvinciaTerritorio for default ProvinciaTerritorio initial value', () => {
        const formGroup = service.createProvinciaTerritorioFormGroup(sampleWithNewData);

        const provinciaTerritorio = service.getProvinciaTerritorio(formGroup) as any;

        expect(provinciaTerritorio).toMatchObject(sampleWithNewData);
      });

      it('should return NewProvinciaTerritorio for empty ProvinciaTerritorio initial value', () => {
        const formGroup = service.createProvinciaTerritorioFormGroup();

        const provinciaTerritorio = service.getProvinciaTerritorio(formGroup) as any;

        expect(provinciaTerritorio).toMatchObject({});
      });

      it('should return IProvinciaTerritorio', () => {
        const formGroup = service.createProvinciaTerritorioFormGroup(sampleWithRequiredData);

        const provinciaTerritorio = service.getProvinciaTerritorio(formGroup) as any;

        expect(provinciaTerritorio).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProvinciaTerritorio should not enable id FormControl', () => {
        const formGroup = service.createProvinciaTerritorioFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProvinciaTerritorio should disable id FormControl', () => {
        const formGroup = service.createProvinciaTerritorioFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
