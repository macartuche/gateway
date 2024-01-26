import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IFormulario053 } from 'app/entities/serviciosmedicos/formulario-053/formulario-053.model';
import { Formulario053Service } from 'app/entities/serviciosmedicos/formulario-053/service/formulario-053.service';
import { ITipoTramite } from 'app/entities/serviciosmedicos/tipo-tramite/tipo-tramite.model';
import { TipoTramiteService } from 'app/entities/serviciosmedicos/tipo-tramite/service/tipo-tramite.service';
import { ITramite } from '../tramite.model';
import { TramiteService } from '../service/tramite.service';
import { TramiteFormService } from './tramite-form.service';

import { TramiteUpdateComponent } from './tramite-update.component';

describe('Tramite Management Update Component', () => {
  let comp: TramiteUpdateComponent;
  let fixture: ComponentFixture<TramiteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tramiteFormService: TramiteFormService;
  let tramiteService: TramiteService;
  let formulario053Service: Formulario053Service;
  let tipoTramiteService: TipoTramiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TramiteUpdateComponent],
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
      .overrideTemplate(TramiteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TramiteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tramiteFormService = TestBed.inject(TramiteFormService);
    tramiteService = TestBed.inject(TramiteService);
    formulario053Service = TestBed.inject(Formulario053Service);
    tipoTramiteService = TestBed.inject(TipoTramiteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Formulario053 query and add missing value', () => {
      const tramite: ITramite = { id: 456 };
      const formulario: IFormulario053 = { id: 27747 };
      tramite.formulario = formulario;

      const formulario053Collection: IFormulario053[] = [{ id: 4163 }];
      jest.spyOn(formulario053Service, 'query').mockReturnValue(of(new HttpResponse({ body: formulario053Collection })));
      const additionalFormulario053s = [formulario];
      const expectedCollection: IFormulario053[] = [...additionalFormulario053s, ...formulario053Collection];
      jest.spyOn(formulario053Service, 'addFormulario053ToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tramite });
      comp.ngOnInit();

      expect(formulario053Service.query).toHaveBeenCalled();
      expect(formulario053Service.addFormulario053ToCollectionIfMissing).toHaveBeenCalledWith(
        formulario053Collection,
        ...additionalFormulario053s.map(expect.objectContaining),
      );
      expect(comp.formulario053sSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TipoTramite query and add missing value', () => {
      const tramite: ITramite = { id: 456 };
      const tipoTramite: ITipoTramite = { id: 18722 };
      tramite.tipoTramite = tipoTramite;

      const tipoTramiteCollection: ITipoTramite[] = [{ id: 11015 }];
      jest.spyOn(tipoTramiteService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoTramiteCollection })));
      const additionalTipoTramites = [tipoTramite];
      const expectedCollection: ITipoTramite[] = [...additionalTipoTramites, ...tipoTramiteCollection];
      jest.spyOn(tipoTramiteService, 'addTipoTramiteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tramite });
      comp.ngOnInit();

      expect(tipoTramiteService.query).toHaveBeenCalled();
      expect(tipoTramiteService.addTipoTramiteToCollectionIfMissing).toHaveBeenCalledWith(
        tipoTramiteCollection,
        ...additionalTipoTramites.map(expect.objectContaining),
      );
      expect(comp.tipoTramitesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tramite: ITramite = { id: 456 };
      const formulario: IFormulario053 = { id: 12021 };
      tramite.formulario = formulario;
      const tipoTramite: ITipoTramite = { id: 7559 };
      tramite.tipoTramite = tipoTramite;

      activatedRoute.data = of({ tramite });
      comp.ngOnInit();

      expect(comp.formulario053sSharedCollection).toContain(formulario);
      expect(comp.tipoTramitesSharedCollection).toContain(tipoTramite);
      expect(comp.tramite).toEqual(tramite);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITramite>>();
      const tramite = { id: 123 };
      jest.spyOn(tramiteFormService, 'getTramite').mockReturnValue(tramite);
      jest.spyOn(tramiteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tramite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tramite }));
      saveSubject.complete();

      // THEN
      expect(tramiteFormService.getTramite).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tramiteService.update).toHaveBeenCalledWith(expect.objectContaining(tramite));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITramite>>();
      const tramite = { id: 123 };
      jest.spyOn(tramiteFormService, 'getTramite').mockReturnValue({ id: null });
      jest.spyOn(tramiteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tramite: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tramite }));
      saveSubject.complete();

      // THEN
      expect(tramiteFormService.getTramite).toHaveBeenCalled();
      expect(tramiteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITramite>>();
      const tramite = { id: 123 };
      jest.spyOn(tramiteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tramite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tramiteService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareFormulario053', () => {
      it('Should forward to formulario053Service', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(formulario053Service, 'compareFormulario053');
        comp.compareFormulario053(entity, entity2);
        expect(formulario053Service.compareFormulario053).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
