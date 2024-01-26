import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../zona.test-samples';

import { ZonaFormService } from './zona-form.service';

describe('Zona Form Service', () => {
  let service: ZonaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZonaFormService);
  });

  describe('Service methods', () => {
    describe('createZonaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createZonaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            estadoId: expect.any(Object),
          }),
        );
      });

      it('passing IZona should create a new form with FormGroup', () => {
        const formGroup = service.createZonaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            estadoId: expect.any(Object),
          }),
        );
      });
    });

    describe('getZona', () => {
      it('should return NewZona for default Zona initial value', () => {
        const formGroup = service.createZonaFormGroup(sampleWithNewData);

        const zona = service.getZona(formGroup) as any;

        expect(zona).toMatchObject(sampleWithNewData);
      });

      it('should return NewZona for empty Zona initial value', () => {
        const formGroup = service.createZonaFormGroup();

        const zona = service.getZona(formGroup) as any;

        expect(zona).toMatchObject({});
      });

      it('should return IZona', () => {
        const formGroup = service.createZonaFormGroup(sampleWithRequiredData);

        const zona = service.getZona(formGroup) as any;

        expect(zona).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IZona should not enable id FormControl', () => {
        const formGroup = service.createZonaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewZona should disable id FormControl', () => {
        const formGroup = service.createZonaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
