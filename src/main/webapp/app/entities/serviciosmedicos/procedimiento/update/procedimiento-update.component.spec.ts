import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ITramite } from 'app/entities/serviciosmedicos/tramite/tramite.model';
import { TramiteService } from 'app/entities/serviciosmedicos/tramite/service/tramite.service';
import { ProcedimientoService } from '../service/procedimiento.service';
import { IProcedimiento } from '../procedimiento.model';
import { ProcedimientoFormService } from './procedimiento-form.service';

import { ProcedimientoUpdateComponent } from './procedimiento-update.component';

describe('Procedimiento Management Update Component', () => {
  let comp: ProcedimientoUpdateComponent;
  let fixture: ComponentFixture<ProcedimientoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let procedimientoFormService: ProcedimientoFormService;
  let procedimientoService: ProcedimientoService;
  let tramiteService: TramiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ProcedimientoUpdateComponent],
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
      .overrideTemplate(ProcedimientoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProcedimientoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    procedimientoFormService = TestBed.inject(ProcedimientoFormService);
    procedimientoService = TestBed.inject(ProcedimientoService);
    tramiteService = TestBed.inject(TramiteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Tramite query and add missing value', () => {
      const procedimiento: IProcedimiento = { id: 456 };
      const tramite: ITramite = { id: 882 };
      procedimiento.tramite = tramite;

      const tramiteCollection: ITramite[] = [{ id: 2650 }];
      jest.spyOn(tramiteService, 'query').mockReturnValue(of(new HttpResponse({ body: tramiteCollection })));
      const additionalTramites = [tramite];
      const expectedCollection: ITramite[] = [...additionalTramites, ...tramiteCollection];
      jest.spyOn(tramiteService, 'addTramiteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ procedimiento });
      comp.ngOnInit();

      expect(tramiteService.query).toHaveBeenCalled();
      expect(tramiteService.addTramiteToCollectionIfMissing).toHaveBeenCalledWith(
        tramiteCollection,
        ...additionalTramites.map(expect.objectContaining),
      );
      expect(comp.tramitesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const procedimiento: IProcedimiento = { id: 456 };
      const tramite: ITramite = { id: 12182 };
      procedimiento.tramite = tramite;

      activatedRoute.data = of({ procedimiento });
      comp.ngOnInit();

      expect(comp.tramitesSharedCollection).toContain(tramite);
      expect(comp.procedimiento).toEqual(procedimiento);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProcedimiento>>();
      const procedimiento = { id: 123 };
      jest.spyOn(procedimientoFormService, 'getProcedimiento').mockReturnValue(procedimiento);
      jest.spyOn(procedimientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ procedimiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: procedimiento }));
      saveSubject.complete();

      // THEN
      expect(procedimientoFormService.getProcedimiento).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(procedimientoService.update).toHaveBeenCalledWith(expect.objectContaining(procedimiento));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProcedimiento>>();
      const procedimiento = { id: 123 };
      jest.spyOn(procedimientoFormService, 'getProcedimiento').mockReturnValue({ id: null });
      jest.spyOn(procedimientoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ procedimiento: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: procedimiento }));
      saveSubject.complete();

      // THEN
      expect(procedimientoFormService.getProcedimiento).toHaveBeenCalled();
      expect(procedimientoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProcedimiento>>();
      const procedimiento = { id: 123 };
      jest.spyOn(procedimientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ procedimiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(procedimientoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
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
