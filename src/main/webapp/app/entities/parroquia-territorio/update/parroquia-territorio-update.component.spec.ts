import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ICantonTerritorio } from 'app/entities/canton-territorio/canton-territorio.model';
import { CantonTerritorioService } from 'app/entities/canton-territorio/service/canton-territorio.service';
import { ParroquiaTerritorioService } from '../service/parroquia-territorio.service';
import { IParroquiaTerritorio } from '../parroquia-territorio.model';
import { ParroquiaTerritorioFormService } from './parroquia-territorio-form.service';

import { ParroquiaTerritorioUpdateComponent } from './parroquia-territorio-update.component';

describe('ParroquiaTerritorio Management Update Component', () => {
  let comp: ParroquiaTerritorioUpdateComponent;
  let fixture: ComponentFixture<ParroquiaTerritorioUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let parroquiaTerritorioFormService: ParroquiaTerritorioFormService;
  let parroquiaTerritorioService: ParroquiaTerritorioService;
  let cantonTerritorioService: CantonTerritorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ParroquiaTerritorioUpdateComponent],
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
      .overrideTemplate(ParroquiaTerritorioUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ParroquiaTerritorioUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    parroquiaTerritorioFormService = TestBed.inject(ParroquiaTerritorioFormService);
    parroquiaTerritorioService = TestBed.inject(ParroquiaTerritorioService);
    cantonTerritorioService = TestBed.inject(CantonTerritorioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CantonTerritorio query and add missing value', () => {
      const parroquiaTerritorio: IParroquiaTerritorio = { id: 456 };
      const canton: ICantonTerritorio = { id: 29735 };
      parroquiaTerritorio.canton = canton;

      const cantonTerritorioCollection: ICantonTerritorio[] = [{ id: 1113 }];
      jest.spyOn(cantonTerritorioService, 'query').mockReturnValue(of(new HttpResponse({ body: cantonTerritorioCollection })));
      const additionalCantonTerritorios = [canton];
      const expectedCollection: ICantonTerritorio[] = [...additionalCantonTerritorios, ...cantonTerritorioCollection];
      jest.spyOn(cantonTerritorioService, 'addCantonTerritorioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ parroquiaTerritorio });
      comp.ngOnInit();

      expect(cantonTerritorioService.query).toHaveBeenCalled();
      expect(cantonTerritorioService.addCantonTerritorioToCollectionIfMissing).toHaveBeenCalledWith(
        cantonTerritorioCollection,
        ...additionalCantonTerritorios.map(expect.objectContaining),
      );
      expect(comp.cantonTerritoriosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const parroquiaTerritorio: IParroquiaTerritorio = { id: 456 };
      const canton: ICantonTerritorio = { id: 30878 };
      parroquiaTerritorio.canton = canton;

      activatedRoute.data = of({ parroquiaTerritorio });
      comp.ngOnInit();

      expect(comp.cantonTerritoriosSharedCollection).toContain(canton);
      expect(comp.parroquiaTerritorio).toEqual(parroquiaTerritorio);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParroquiaTerritorio>>();
      const parroquiaTerritorio = { id: 123 };
      jest.spyOn(parroquiaTerritorioFormService, 'getParroquiaTerritorio').mockReturnValue(parroquiaTerritorio);
      jest.spyOn(parroquiaTerritorioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parroquiaTerritorio });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: parroquiaTerritorio }));
      saveSubject.complete();

      // THEN
      expect(parroquiaTerritorioFormService.getParroquiaTerritorio).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(parroquiaTerritorioService.update).toHaveBeenCalledWith(expect.objectContaining(parroquiaTerritorio));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParroquiaTerritorio>>();
      const parroquiaTerritorio = { id: 123 };
      jest.spyOn(parroquiaTerritorioFormService, 'getParroquiaTerritorio').mockReturnValue({ id: null });
      jest.spyOn(parroquiaTerritorioService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parroquiaTerritorio: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: parroquiaTerritorio }));
      saveSubject.complete();

      // THEN
      expect(parroquiaTerritorioFormService.getParroquiaTerritorio).toHaveBeenCalled();
      expect(parroquiaTerritorioService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParroquiaTerritorio>>();
      const parroquiaTerritorio = { id: 123 };
      jest.spyOn(parroquiaTerritorioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parroquiaTerritorio });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(parroquiaTerritorioService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCantonTerritorio', () => {
      it('Should forward to cantonTerritorioService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cantonTerritorioService, 'compareCantonTerritorio');
        comp.compareCantonTerritorio(entity, entity2);
        expect(cantonTerritorioService.compareCantonTerritorio).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
