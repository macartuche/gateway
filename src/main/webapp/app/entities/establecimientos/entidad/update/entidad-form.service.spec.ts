import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../entidad.test-samples';

import { EntidadFormService } from './entidad-form.service';

describe('Entidad Form Service', () => {
  let service: EntidadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadFormService);
  });

  describe('Service methods', () => {
    describe('createEntidadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEntidadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            ruc: expect.any(Object),
          }),
        );
      });

      it('passing IEntidad should create a new form with FormGroup', () => {
        const formGroup = service.createEntidadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            ruc: expect.any(Object),
          }),
        );
      });
    });

    describe('getEntidad', () => {
      it('should return NewEntidad for default Entidad initial value', () => {
        const formGroup = service.createEntidadFormGroup(sampleWithNewData);

        const entidad = service.getEntidad(formGroup) as any;

        expect(entidad).toMatchObject(sampleWithNewData);
      });

      it('should return NewEntidad for empty Entidad initial value', () => {
        const formGroup = service.createEntidadFormGroup();

        const entidad = service.getEntidad(formGroup) as any;

        expect(entidad).toMatchObject({});
      });

      it('should return IEntidad', () => {
        const formGroup = service.createEntidadFormGroup(sampleWithRequiredData);

        const entidad = service.getEntidad(formGroup) as any;

        expect(entidad).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEntidad should not enable id FormControl', () => {
        const formGroup = service.createEntidadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEntidad should disable id FormControl', () => {
        const formGroup = service.createEntidadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
