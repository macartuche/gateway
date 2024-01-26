import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../documento-tramite.test-samples';

import { DocumentoTramiteFormService } from './documento-tramite-form.service';

describe('DocumentoTramite Form Service', () => {
  let service: DocumentoTramiteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentoTramiteFormService);
  });

  describe('Service methods', () => {
    describe('createDocumentoTramiteFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDocumentoTramiteFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            fecha: expect.any(Object),
            url: expect.any(Object),
            documento: expect.any(Object),
            tramite: expect.any(Object),
          }),
        );
      });

      it('passing IDocumentoTramite should create a new form with FormGroup', () => {
        const formGroup = service.createDocumentoTramiteFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            fecha: expect.any(Object),
            url: expect.any(Object),
            documento: expect.any(Object),
            tramite: expect.any(Object),
          }),
        );
      });
    });

    describe('getDocumentoTramite', () => {
      it('should return NewDocumentoTramite for default DocumentoTramite initial value', () => {
        const formGroup = service.createDocumentoTramiteFormGroup(sampleWithNewData);

        const documentoTramite = service.getDocumentoTramite(formGroup) as any;

        expect(documentoTramite).toMatchObject(sampleWithNewData);
      });

      it('should return NewDocumentoTramite for empty DocumentoTramite initial value', () => {
        const formGroup = service.createDocumentoTramiteFormGroup();

        const documentoTramite = service.getDocumentoTramite(formGroup) as any;

        expect(documentoTramite).toMatchObject({});
      });

      it('should return IDocumentoTramite', () => {
        const formGroup = service.createDocumentoTramiteFormGroup(sampleWithRequiredData);

        const documentoTramite = service.getDocumentoTramite(formGroup) as any;

        expect(documentoTramite).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDocumentoTramite should not enable id FormControl', () => {
        const formGroup = service.createDocumentoTramiteFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDocumentoTramite should disable id FormControl', () => {
        const formGroup = service.createDocumentoTramiteFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
