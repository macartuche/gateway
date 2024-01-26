import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../parroquia-territorio.test-samples';

import { ParroquiaTerritorioFormService } from './parroquia-territorio-form.service';

describe('ParroquiaTerritorio Form Service', () => {
  let service: ParroquiaTerritorioFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParroquiaTerritorioFormService);
  });

  describe('Service methods', () => {
    describe('createParroquiaTerritorioFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createParroquiaTerritorioFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            canton: expect.any(Object),
          }),
        );
      });

      it('passing IParroquiaTerritorio should create a new form with FormGroup', () => {
        const formGroup = service.createParroquiaTerritorioFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            canton: expect.any(Object),
          }),
        );
      });
    });

    describe('getParroquiaTerritorio', () => {
      it('should return NewParroquiaTerritorio for default ParroquiaTerritorio initial value', () => {
        const formGroup = service.createParroquiaTerritorioFormGroup(sampleWithNewData);

        const parroquiaTerritorio = service.getParroquiaTerritorio(formGroup) as any;

        expect(parroquiaTerritorio).toMatchObject(sampleWithNewData);
      });

      it('should return NewParroquiaTerritorio for empty ParroquiaTerritorio initial value', () => {
        const formGroup = service.createParroquiaTerritorioFormGroup();

        const parroquiaTerritorio = service.getParroquiaTerritorio(formGroup) as any;

        expect(parroquiaTerritorio).toMatchObject({});
      });

      it('should return IParroquiaTerritorio', () => {
        const formGroup = service.createParroquiaTerritorioFormGroup(sampleWithRequiredData);

        const parroquiaTerritorio = service.getParroquiaTerritorio(formGroup) as any;

        expect(parroquiaTerritorio).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IParroquiaTerritorio should not enable id FormControl', () => {
        const formGroup = service.createParroquiaTerritorioFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewParroquiaTerritorio should disable id FormControl', () => {
        const formGroup = service.createParroquiaTerritorioFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
