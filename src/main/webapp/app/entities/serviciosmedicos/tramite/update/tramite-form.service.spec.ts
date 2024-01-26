import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tramite.test-samples';

import { TramiteFormService } from './tramite-form.service';

describe('Tramite Form Service', () => {
  let service: TramiteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TramiteFormService);
  });

  describe('Service methods', () => {
    describe('createTramiteFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTramiteFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigoValidacion: expect.any(Object),
            numero: expect.any(Object),
            estadoId: expect.any(Object),
            pacienteId: expect.any(Object),
            establecimientoOrigenId: expect.any(Object),
            establecimientoDestinoId: expect.any(Object),
            formulario: expect.any(Object),
            tipoTramite: expect.any(Object),
          }),
        );
      });

      it('passing ITramite should create a new form with FormGroup', () => {
        const formGroup = service.createTramiteFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigoValidacion: expect.any(Object),
            numero: expect.any(Object),
            estadoId: expect.any(Object),
            pacienteId: expect.any(Object),
            establecimientoOrigenId: expect.any(Object),
            establecimientoDestinoId: expect.any(Object),
            formulario: expect.any(Object),
            tipoTramite: expect.any(Object),
          }),
        );
      });
    });

    describe('getTramite', () => {
      it('should return NewTramite for default Tramite initial value', () => {
        const formGroup = service.createTramiteFormGroup(sampleWithNewData);

        const tramite = service.getTramite(formGroup) as any;

        expect(tramite).toMatchObject(sampleWithNewData);
      });

      it('should return NewTramite for empty Tramite initial value', () => {
        const formGroup = service.createTramiteFormGroup();

        const tramite = service.getTramite(formGroup) as any;

        expect(tramite).toMatchObject({});
      });

      it('should return ITramite', () => {
        const formGroup = service.createTramiteFormGroup(sampleWithRequiredData);

        const tramite = service.getTramite(formGroup) as any;

        expect(tramite).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITramite should not enable id FormControl', () => {
        const formGroup = service.createTramiteFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTramite should disable id FormControl', () => {
        const formGroup = service.createTramiteFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
