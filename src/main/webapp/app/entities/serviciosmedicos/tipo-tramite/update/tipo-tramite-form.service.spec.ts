import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tipo-tramite.test-samples';

import { TipoTramiteFormService } from './tipo-tramite-form.service';

describe('TipoTramite Form Service', () => {
  let service: TipoTramiteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoTramiteFormService);
  });

  describe('Service methods', () => {
    describe('createTipoTramiteFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoTramiteFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            codigo: expect.any(Object),
            estadosId: expect.any(Object),
          }),
        );
      });

      it('passing ITipoTramite should create a new form with FormGroup', () => {
        const formGroup = service.createTipoTramiteFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            codigo: expect.any(Object),
            estadosId: expect.any(Object),
          }),
        );
      });
    });

    describe('getTipoTramite', () => {
      it('should return NewTipoTramite for default TipoTramite initial value', () => {
        const formGroup = service.createTipoTramiteFormGroup(sampleWithNewData);

        const tipoTramite = service.getTipoTramite(formGroup) as any;

        expect(tipoTramite).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoTramite for empty TipoTramite initial value', () => {
        const formGroup = service.createTipoTramiteFormGroup();

        const tipoTramite = service.getTipoTramite(formGroup) as any;

        expect(tipoTramite).toMatchObject({});
      });

      it('should return ITipoTramite', () => {
        const formGroup = service.createTipoTramiteFormGroup(sampleWithRequiredData);

        const tipoTramite = service.getTipoTramite(formGroup) as any;

        expect(tipoTramite).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoTramite should not enable id FormControl', () => {
        const formGroup = service.createTipoTramiteFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoTramite should disable id FormControl', () => {
        const formGroup = service.createTipoTramiteFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
