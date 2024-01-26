import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IDistrito } from 'app/entities/establecimientos/distrito/distrito.model';
import { DistritoService } from 'app/entities/establecimientos/distrito/service/distrito.service';
import { CantonService } from '../service/canton.service';
import { ICanton } from '../canton.model';
import { CantonFormService } from './canton-form.service';

import { CantonUpdateComponent } from './canton-update.component';

describe('Canton Management Update Component', () => {
  let comp: CantonUpdateComponent;
  let fixture: ComponentFixture<CantonUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cantonFormService: CantonFormService;
  let cantonService: CantonService;
  let distritoService: DistritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CantonUpdateComponent],
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
      .overrideTemplate(CantonUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CantonUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cantonFormService = TestBed.inject(CantonFormService);
    cantonService = TestBed.inject(CantonService);
    distritoService = TestBed.inject(DistritoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Distrito query and add missing value', () => {
      const canton: ICanton = { id: 456 };
      const distrito: IDistrito = { id: 14068 };
      canton.distrito = distrito;

      const distritoCollection: IDistrito[] = [{ id: 12110 }];
      jest.spyOn(distritoService, 'query').mockReturnValue(of(new HttpResponse({ body: distritoCollection })));
      const additionalDistritos = [distrito];
      const expectedCollection: IDistrito[] = [...additionalDistritos, ...distritoCollection];
      jest.spyOn(distritoService, 'addDistritoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ canton });
      comp.ngOnInit();

      expect(distritoService.query).toHaveBeenCalled();
      expect(distritoService.addDistritoToCollectionIfMissing).toHaveBeenCalledWith(
        distritoCollection,
        ...additionalDistritos.map(expect.objectContaining),
      );
      expect(comp.distritosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const canton: ICanton = { id: 456 };
      const distrito: IDistrito = { id: 32050 };
      canton.distrito = distrito;

      activatedRoute.data = of({ canton });
      comp.ngOnInit();

      expect(comp.distritosSharedCollection).toContain(distrito);
      expect(comp.canton).toEqual(canton);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICanton>>();
      const canton = { id: 123 };
      jest.spyOn(cantonFormService, 'getCanton').mockReturnValue(canton);
      jest.spyOn(cantonService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ canton });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: canton }));
      saveSubject.complete();

      // THEN
      expect(cantonFormService.getCanton).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cantonService.update).toHaveBeenCalledWith(expect.objectContaining(canton));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICanton>>();
      const canton = { id: 123 };
      jest.spyOn(cantonFormService, 'getCanton').mockReturnValue({ id: null });
      jest.spyOn(cantonService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ canton: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: canton }));
      saveSubject.complete();

      // THEN
      expect(cantonFormService.getCanton).toHaveBeenCalled();
      expect(cantonService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICanton>>();
      const canton = { id: 123 };
      jest.spyOn(cantonService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ canton });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cantonService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDistrito', () => {
      it('Should forward to distritoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(distritoService, 'compareDistrito');
        comp.compareDistrito(entity, entity2);
        expect(distritoService.compareDistrito).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
