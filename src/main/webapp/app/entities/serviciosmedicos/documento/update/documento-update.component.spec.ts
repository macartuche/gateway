import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ITipoTramite } from 'app/entities/serviciosmedicos/tipo-tramite/tipo-tramite.model';
import { TipoTramiteService } from 'app/entities/serviciosmedicos/tipo-tramite/service/tipo-tramite.service';
import { DocumentoService } from '../service/documento.service';
import { IDocumento } from '../documento.model';
import { DocumentoFormService } from './documento-form.service';

import { DocumentoUpdateComponent } from './documento-update.component';

describe('Documento Management Update Component', () => {
  let comp: DocumentoUpdateComponent;
  let fixture: ComponentFixture<DocumentoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let documentoFormService: DocumentoFormService;
  let documentoService: DocumentoService;
  let tipoTramiteService: TipoTramiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), DocumentoUpdateComponent],
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
      .overrideTemplate(DocumentoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DocumentoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    documentoFormService = TestBed.inject(DocumentoFormService);
    documentoService = TestBed.inject(DocumentoService);
    tipoTramiteService = TestBed.inject(TipoTramiteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TipoTramite query and add missing value', () => {
      const documento: IDocumento = { id: 456 };
      const tipoTramite: ITipoTramite = { id: 1348 };
      documento.tipoTramite = tipoTramite;

      const tipoTramiteCollection: ITipoTramite[] = [{ id: 25137 }];
      jest.spyOn(tipoTramiteService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoTramiteCollection })));
      const additionalTipoTramites = [tipoTramite];
      const expectedCollection: ITipoTramite[] = [...additionalTipoTramites, ...tipoTramiteCollection];
      jest.spyOn(tipoTramiteService, 'addTipoTramiteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ documento });
      comp.ngOnInit();

      expect(tipoTramiteService.query).toHaveBeenCalled();
      expect(tipoTramiteService.addTipoTramiteToCollectionIfMissing).toHaveBeenCalledWith(
        tipoTramiteCollection,
        ...additionalTipoTramites.map(expect.objectContaining),
      );
      expect(comp.tipoTramitesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const documento: IDocumento = { id: 456 };
      const tipoTramite: ITipoTramite = { id: 6978 };
      documento.tipoTramite = tipoTramite;

      activatedRoute.data = of({ documento });
      comp.ngOnInit();

      expect(comp.tipoTramitesSharedCollection).toContain(tipoTramite);
      expect(comp.documento).toEqual(documento);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocumento>>();
      const documento = { id: 123 };
      jest.spyOn(documentoFormService, 'getDocumento').mockReturnValue(documento);
      jest.spyOn(documentoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: documento }));
      saveSubject.complete();

      // THEN
      expect(documentoFormService.getDocumento).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(documentoService.update).toHaveBeenCalledWith(expect.objectContaining(documento));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocumento>>();
      const documento = { id: 123 };
      jest.spyOn(documentoFormService, 'getDocumento').mockReturnValue({ id: null });
      jest.spyOn(documentoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documento: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: documento }));
      saveSubject.complete();

      // THEN
      expect(documentoFormService.getDocumento).toHaveBeenCalled();
      expect(documentoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocumento>>();
      const documento = { id: 123 };
      jest.spyOn(documentoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(documentoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTipoTramite', () => {
      it('Should forward to tipoTramiteService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tipoTramiteService, 'compareTipoTramite');
        comp.compareTipoTramite(entity, entity2);
        expect(tipoTramiteService.compareTipoTramite).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
