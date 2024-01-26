import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../nivel-establecimiento.test-samples';

import { NivelEstablecimientoFormService } from './nivel-establecimiento-form.service';

describe('NivelEstablecimiento Form Service', () => {
  let service: NivelEstablecimientoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NivelEstablecimientoFormService);
  });

  describe('Service methods', () => {
    describe('createNivelEstablecimientoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNivelEstablecimientoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            descripcion: expect.any(Object),
          }),
        );
      });

      it('passing INivelEstablecimiento should create a new form with FormGroup', () => {
        const formGroup = service.createNivelEstablecimientoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            descripcion: expect.any(Object),
          }),
        );
      });
    });

    describe('getNivelEstablecimiento', () => {
      it('should return NewNivelEstablecimiento for default NivelEstablecimiento initial value', () => {
        const formGroup = service.createNivelEstablecimientoFormGroup(sampleWithNewData);

        const nivelEstablecimiento = service.getNivelEstablecimiento(formGroup) as any;

        expect(nivelEstablecimiento).toMatchObject(sampleWithNewData);
      });

      it('should return NewNivelEstablecimiento for empty NivelEstablecimiento initial value', () => {
        const formGroup = service.createNivelEstablecimientoFormGroup();

        const nivelEstablecimiento = service.getNivelEstablecimiento(formGroup) as any;

        expect(nivelEstablecimiento).toMatchObject({});
      });

      it('should return INivelEstablecimiento', () => {
        const formGroup = service.createNivelEstablecimientoFormGroup(sampleWithRequiredData);

        const nivelEstablecimiento = service.getNivelEstablecimiento(formGroup) as any;

        expect(nivelEstablecimiento).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INivelEstablecimiento should not enable id FormControl', () => {
        const formGroup = service.createNivelEstablecimientoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNivelEstablecimiento should disable id FormControl', () => {
        const formGroup = service.createNivelEstablecimientoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
