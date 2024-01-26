import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tipo-establecimiento.test-samples';

import { TipoEstablecimientoFormService } from './tipo-establecimiento-form.service';

describe('TipoEstablecimiento Form Service', () => {
  let service: TipoEstablecimientoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEstablecimientoFormService);
  });

  describe('Service methods', () => {
    describe('createTipoEstablecimientoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoEstablecimientoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            descripcion: expect.any(Object),
            nivel: expect.any(Object),
          }),
        );
      });

      it('passing ITipoEstablecimiento should create a new form with FormGroup', () => {
        const formGroup = service.createTipoEstablecimientoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            descripcion: expect.any(Object),
            nivel: expect.any(Object),
          }),
        );
      });
    });

    describe('getTipoEstablecimiento', () => {
      it('should return NewTipoEstablecimiento for default TipoEstablecimiento initial value', () => {
        const formGroup = service.createTipoEstablecimientoFormGroup(sampleWithNewData);

        const tipoEstablecimiento = service.getTipoEstablecimiento(formGroup) as any;

        expect(tipoEstablecimiento).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoEstablecimiento for empty TipoEstablecimiento initial value', () => {
        const formGroup = service.createTipoEstablecimientoFormGroup();

        const tipoEstablecimiento = service.getTipoEstablecimiento(formGroup) as any;

        expect(tipoEstablecimiento).toMatchObject({});
      });

      it('should return ITipoEstablecimiento', () => {
        const formGroup = service.createTipoEstablecimientoFormGroup(sampleWithRequiredData);

        const tipoEstablecimiento = service.getTipoEstablecimiento(formGroup) as any;

        expect(tipoEstablecimiento).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoEstablecimiento should not enable id FormControl', () => {
        const formGroup = service.createTipoEstablecimientoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoEstablecimiento should disable id FormControl', () => {
        const formGroup = service.createTipoEstablecimientoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
