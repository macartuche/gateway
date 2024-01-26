import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IProvinciaTerritorio } from 'app/entities/provincia-territorio/provincia-territorio.model';
import { ProvinciaTerritorioService } from 'app/entities/provincia-territorio/service/provincia-territorio.service';
import { CantonTerritorioService } from '../service/canton-territorio.service';
import { ICantonTerritorio } from '../canton-territorio.model';
import { CantonTerritorioFormService } from './canton-territorio-form.service';

import { CantonTerritorioUpdateComponent } from './canton-territorio-update.component';

describe('CantonTerritorio Management Update Component', () => {
  let comp: CantonTerritorioUpdateComponent;
  let fixture: ComponentFixture<CantonTerritorioUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cantonTerritorioFormService: CantonTerritorioFormService;
  let cantonTerritorioService: CantonTerritorioService;
  let provinciaTerritorioService: ProvinciaTerritorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CantonTerritorioUpdateComponent],
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
      .overrideTemplate(CantonTerritorioUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CantonTerritorioUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cantonTerritorioFormService = TestBed.inject(CantonTerritorioFormService);
    cantonTerritorioService = TestBed.inject(CantonTerritorioService);
    provinciaTerritorioService = TestBed.inject(ProvinciaTerritorioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ProvinciaTerritorio query and add missing value', () => {
      const cantonTerritorio: ICantonTerritorio = { id: 456 };
      const provincia: IProvinciaTerritorio = { id: 7513 };
      cantonTerritorio.provincia = provincia;

      const provinciaTerritorioCollection: IProvinciaTerritorio[] = [{ id: 6658 }];
      jest.spyOn(provinciaTerritorioService, 'query').mockReturnValue(of(new HttpResponse({ body: provinciaTerritorioCollection })));
      const additionalProvinciaTerritorios = [provincia];
      const expectedCollection: IProvinciaTerritorio[] = [...additionalProvinciaTerritorios, ...provinciaTerritorioCollection];
      jest.spyOn(provinciaTerritorioService, 'addProvinciaTerritorioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cantonTerritorio });
      comp.ngOnInit();

      expect(provinciaTerritorioService.query).toHaveBeenCalled();
      expect(provinciaTerritorioService.addProvinciaTerritorioToCollectionIfMissing).toHaveBeenCalledWith(
        provinciaTerritorioCollection,
        ...additionalProvinciaTerritorios.map(expect.objectContaining),
      );
      expect(comp.provinciaTerritoriosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const cantonTerritorio: ICantonTerritorio = { id: 456 };
      const provincia: IProvinciaTerritorio = { id: 5127 };
      cantonTerritorio.provincia = provincia;

      activatedRoute.data = of({ cantonTerritorio });
      comp.ngOnInit();

      expect(comp.provinciaTerritoriosSharedCollection).toContain(provincia);
      expect(comp.cantonTerritorio).toEqual(cantonTerritorio);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICantonTerritorio>>();
      const cantonTerritorio = { id: 123 };
      jest.spyOn(cantonTerritorioFormService, 'getCantonTerritorio').mockReturnValue(cantonTerritorio);
      jest.spyOn(cantonTerritorioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cantonTerritorio });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cantonTerritorio }));
      saveSubject.complete();

      // THEN
      expect(cantonTerritorioFormService.getCantonTerritorio).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cantonTerritorioService.update).toHaveBeenCalledWith(expect.objectContaining(cantonTerritorio));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICantonTerritorio>>();
      const cantonTerritorio = { id: 123 };
      jest.spyOn(cantonTerritorioFormService, 'getCantonTerritorio').mockReturnValue({ id: null });
      jest.spyOn(cantonTerritorioService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cantonTerritorio: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cantonTerritorio }));
      saveSubject.complete();

      // THEN
      expect(cantonTerritorioFormService.getCantonTerritorio).toHaveBeenCalled();
      expect(cantonTerritorioService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICantonTerritorio>>();
      const cantonTerritorio = { id: 123 };
      jest.spyOn(cantonTerritorioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cantonTerritorio });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cantonTerritorioService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProvinciaTerritorio', () => {
      it('Should forward to provinciaTerritorioService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(provinciaTerritorioService, 'compareProvinciaTerritorio');
        comp.compareProvinciaTerritorio(entity, entity2);
        expect(provinciaTerritorioService.compareProvinciaTerritorio).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
