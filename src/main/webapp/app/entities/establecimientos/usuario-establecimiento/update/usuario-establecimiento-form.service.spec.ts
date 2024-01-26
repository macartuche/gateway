import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../usuario-establecimiento.test-samples';

import { UsuarioEstablecimientoFormService } from './usuario-establecimiento-form.service';

describe('UsuarioEstablecimiento Form Service', () => {
  let service: UsuarioEstablecimientoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioEstablecimientoFormService);
  });

  describe('Service methods', () => {
    describe('createUsuarioEstablecimientoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUsuarioEstablecimientoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            usuarioId: expect.any(Object),
            tipoId: expect.any(Object),
            establecimiento: expect.any(Object),
          }),
        );
      });

      it('passing IUsuarioEstablecimiento should create a new form with FormGroup', () => {
        const formGroup = service.createUsuarioEstablecimientoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            usuarioId: expect.any(Object),
            tipoId: expect.any(Object),
            establecimiento: expect.any(Object),
          }),
        );
      });
    });

    describe('getUsuarioEstablecimiento', () => {
      it('should return NewUsuarioEstablecimiento for default UsuarioEstablecimiento initial value', () => {
        const formGroup = service.createUsuarioEstablecimientoFormGroup(sampleWithNewData);

        const usuarioEstablecimiento = service.getUsuarioEstablecimiento(formGroup) as any;

        expect(usuarioEstablecimiento).toMatchObject(sampleWithNewData);
      });

      it('should return NewUsuarioEstablecimiento for empty UsuarioEstablecimiento initial value', () => {
        const formGroup = service.createUsuarioEstablecimientoFormGroup();

        const usuarioEstablecimiento = service.getUsuarioEstablecimiento(formGroup) as any;

        expect(usuarioEstablecimiento).toMatchObject({});
      });

      it('should return IUsuarioEstablecimiento', () => {
        const formGroup = service.createUsuarioEstablecimientoFormGroup(sampleWithRequiredData);

        const usuarioEstablecimiento = service.getUsuarioEstablecimiento(formGroup) as any;

        expect(usuarioEstablecimiento).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUsuarioEstablecimiento should not enable id FormControl', () => {
        const formGroup = service.createUsuarioEstablecimientoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUsuarioEstablecimiento should disable id FormControl', () => {
        const formGroup = service.createUsuarioEstablecimientoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
