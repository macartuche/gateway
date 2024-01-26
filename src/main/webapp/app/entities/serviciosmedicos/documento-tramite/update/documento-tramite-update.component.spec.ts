import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IDocumento } from 'app/entities/serviciosmedicos/documento/documento.model';
import { DocumentoService } from 'app/entities/serviciosmedicos/documento/service/documento.service';
import { ITramite } from 'app/entities/serviciosmedicos/tramite/tramite.model';
import { TramiteService } from 'app/entities/serviciosmedicos/tramite/service/tramite.service';
import { IDocumentoTramite } from '../documento-tramite.model';
import { DocumentoTramiteService } from '../service/documento-tramite.service';
import { DocumentoTramiteFormService } from './documento-tramite-form.service';

import { DocumentoTramiteUpdateComponent } from './documento-tramite-update.component';

describe('DocumentoTramite Management Update Component', () => {
  let comp: DocumentoTramiteUpdateComponent;
  let fixture: ComponentFixture<DocumentoTramiteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let documentoTramiteFormService: DocumentoTramiteFormService;
  let documentoTramiteService: DocumentoTramiteService;
  let documentoService: DocumentoService;
  let tramiteService: TramiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), DocumentoTramiteUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(DocumentoTramiteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DocumentoTramiteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    documentoTramiteFormService = TestBed.inject(DocumentoTramiteFormService);
    documentoTramiteService = TestBed.inject(DocumentoTramiteService);
    documentoService = TestBed.inject(DocumentoService);
    tramiteService = TestBed.inject(TramiteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Documento query and add missing value', () => {
      const documentoTramite: IDocumentoTramite = { id: 456 };
      const documento: IDocumento = { id: 22538 };
      documentoTramite.documento = documento;

      const documentoCollection: IDocumento[] = [{ id: 11640 }];
      jest.spyOn(documentoService, 'query').mockReturnValue(of(new HttpResponse({ body: documentoCollection })));
      const additionalDocumentos = [documento];
      const expectedCollection: IDocumento[] = [...additionalDocumentos, ...documentoCollection];
      jest.spyOn(documentoService, 'addDocumentoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ documentoTramite });
      comp.ngOnInit();

      expect(documentoService.query).toHaveBeenCalled();
      expect(documentoService.addDocumentoToCollectionIfMissing).toHaveBeenCalledWith(
        documentoCollection,
        ...additionalDocumentos.map(expect.objectContaining),
      );
      expect(comp.documentosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Tramite query and add missing value', () => {
      const documentoTramite: IDocumentoTramite = { id: 456 };
      const tramite: ITramite = { id: 23179 };
      documentoTramite.tramite = tramite;

      const tramiteCollection: ITramite[] = [{ id: 3233 }];
      jest.spyOn(tramiteService, 'query').mockReturnValue(of(new HttpResponse({ body: tramiteCollection })));
      const additionalTramites = [tramite];
      const expectedCollection: ITramite[] = [...additionalTramites, ...tramiteCollection];
      jest.spyOn(tramiteService, 'addTramiteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ documentoTramite });
      comp.ngOnInit();

      expect(tramiteService.query).toHaveBeenCalled();
      expect(tramiteService.addTramiteToCollectionIfMissing).toHaveBeenCalledWith(
        tramiteCollection,
        ...additionalTramites.map(expect.objectContaining),
      );
      expect(comp.tramitesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const documentoTramite: IDocumentoTramite = { id: 456 };
      const documento: IDocumento = { id: 23347 };
      documentoTramite.documento = documento;
      const tramite: ITramite = { id: 11865 };
      documentoTramite.tramite = tramite;

      activatedRoute.data = of({ documentoTramite });
      comp.ngOnInit();

      expect(comp.documentosSharedCollection).toContain(documento);
      expect(comp.tramitesSharedCollection).toContain(tramite);
      expect(comp.documentoTramite).toEqual(documentoTramite);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocumentoTramite>>();
      const documentoTramite = { id: 123 };
      jest.spyOn(documentoTramiteFormService, 'getDocumentoTramite').mockReturnValue(documentoTramite);
      jest.spyOn(documentoTramiteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentoTramite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: documentoTramite }));
      saveSubject.complete();

      // THEN
      expect(documentoTramiteFormService.getDocumentoTramite).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(documentoTramiteService.update).toHaveBeenCalledWith(expect.objectContaining(documentoTramite));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocumentoTramite>>();
      const documentoTramite = { id: 123 };
      jest.spyOn(documentoTramiteFormService, 'getDocumentoTramite').mockReturnValue({ id: null });
      jest.spyOn(documentoTramiteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentoTramite: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: documentoTramite }));
      saveSubject.complete();

      // THEN
      expect(documentoTramiteFormService.getDocumentoTramite).toHaveBeenCalled();
      expect(documentoTramiteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocumentoTramite>>();
      const documentoTramite = { id: 123 };
      jest.spyOn(documentoTramiteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentoTramite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(documentoTramiteService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDocumento', () => {
      it('Should forward to documentoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(documentoService, 'compareDocumento');
        comp.compareDocumento(entity, entity2);
        expect(documentoService.compareDocumento).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTramite', () => {
      it('Should forward to tramiteService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tramiteService, 'compareTramite');
        comp.compareTramite(entity, entity2);
        expect(tramiteService.compareTramite).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
