import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { INivelEstablecimiento } from 'app/entities/establecimientos/nivel-establecimiento/nivel-establecimiento.model';
import { NivelEstablecimientoService } from 'app/entities/establecimientos/nivel-establecimiento/service/nivel-establecimiento.service';
import { TipoEstablecimientoService } from '../service/tipo-establecimiento.service';
import { ITipoEstablecimiento } from '../tipo-establecimiento.model';
import { TipoEstablecimientoFormService } from './tipo-establecimiento-form.service';

import { TipoEstablecimientoUpdateComponent } from './tipo-establecimiento-update.component';

describe('TipoEstablecimiento Management Update Component', () => {
  let comp: TipoEstablecimientoUpdateComponent;
  let fixture: ComponentFixture<TipoEstablecimientoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoEstablecimientoFormService: TipoEstablecimientoFormService;
  let tipoEstablecimientoService: TipoEstablecimientoService;
  let nivelEstablecimientoService: NivelEstablecimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TipoEstablecimientoUpdateComponent],
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
      .overrideTemplate(TipoEstablecimientoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoEstablecimientoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoEstablecimientoFormService = TestBed.inject(TipoEstablecimientoFormService);
    tipoEstablecimientoService = TestBed.inject(TipoEstablecimientoService);
    nivelEstablecimientoService = TestBed.inject(NivelEstablecimientoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call NivelEstablecimiento query and add missing value', () => {
      const tipoEstablecimiento: ITipoEstablecimiento = { id: 456 };
      const nivel: INivelEstablecimiento = { id: 3423 };
      tipoEstablecimiento.nivel = nivel;

      const nivelEstablecimientoCollection: INivelEstablecimiento[] = [{ id: 22471 }];
      jest.spyOn(nivelEstablecimientoService, 'query').mockReturnValue(of(new HttpResponse({ body: nivelEstablecimientoCollection })));
      const additionalNivelEstablecimientos = [nivel];
      const expectedCollection: INivelEstablecimiento[] = [...additionalNivelEstablecimientos, ...nivelEstablecimientoCollection];
      jest.spyOn(nivelEstablecimientoService, 'addNivelEstablecimientoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tipoEstablecimiento });
      comp.ngOnInit();

      expect(nivelEstablecimientoService.query).toHaveBeenCalled();
      expect(nivelEstablecimientoService.addNivelEstablecimientoToCollectionIfMissing).toHaveBeenCalledWith(
        nivelEstablecimientoCollection,
        ...additionalNivelEstablecimientos.map(expect.objectContaining),
      );
      expect(comp.nivelEstablecimientosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tipoEstablecimiento: ITipoEstablecimiento = { id: 456 };
      const nivel: INivelEstablecimiento = { id: 20891 };
      tipoEstablecimiento.nivel = nivel;

      activatedRoute.data = of({ tipoEstablecimiento });
      comp.ngOnInit();

      expect(comp.nivelEstablecimientosSharedCollection).toContain(nivel);
      expect(comp.tipoEstablecimiento).toEqual(tipoEstablecimiento);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoEstablecimiento>>();
      const tipoEstablecimiento = { id: 123 };
      jest.spyOn(tipoEstablecimientoFormService, 'getTipoEstablecimiento').mockReturnValue(tipoEstablecimiento);
      jest.spyOn(tipoEstablecimientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoEstablecimiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoEstablecimiento }));
      saveSubject.complete();

      // THEN
      expect(tipoEstablecimientoFormService.getTipoEstablecimiento).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoEstablecimientoService.update).toHaveBeenCalledWith(expect.objectContaining(tipoEstablecimiento));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoEstablecimiento>>();
      const tipoEstablecimiento = { id: 123 };
      jest.spyOn(tipoEstablecimientoFormService, 'getTipoEstablecimiento').mockReturnValue({ id: null });
      jest.spyOn(tipoEstablecimientoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoEstablecimiento: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoEstablecimiento }));
      saveSubject.complete();

      // THEN
      expect(tipoEstablecimientoFormService.getTipoEstablecimiento).toHaveBeenCalled();
      expect(tipoEstablecimientoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoEstablecimiento>>();
      const tipoEstablecimiento = { id: 123 };
      jest.spyOn(tipoEstablecimientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoEstablecimiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoEstablecimientoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareNivelEstablecimiento', () => {
      it('Should forward to nivelEstablecimientoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(nivelEstablecimientoService, 'compareNivelEstablecimiento');
        comp.compareNivelEstablecimiento(entity, entity2);
        expect(nivelEstablecimientoService.compareNivelEstablecimiento).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
