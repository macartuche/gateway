import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IItemCie } from 'app/entities/serviciosmedicos/item-cie/item-cie.model';
import { ItemCieService } from 'app/entities/serviciosmedicos/item-cie/service/item-cie.service';
import { ContinuidadAsistencialService } from '../service/continuidad-asistencial.service';
import { IContinuidadAsistencial } from '../continuidad-asistencial.model';
import { ContinuidadAsistencialFormService } from './continuidad-asistencial-form.service';

import { ContinuidadAsistencialUpdateComponent } from './continuidad-asistencial-update.component';

describe('ContinuidadAsistencial Management Update Component', () => {
  let comp: ContinuidadAsistencialUpdateComponent;
  let fixture: ComponentFixture<ContinuidadAsistencialUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let continuidadAsistencialFormService: ContinuidadAsistencialFormService;
  let continuidadAsistencialService: ContinuidadAsistencialService;
  let itemCieService: ItemCieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ContinuidadAsistencialUpdateComponent],
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
      .overrideTemplate(ContinuidadAsistencialUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ContinuidadAsistencialUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    continuidadAsistencialFormService = TestBed.inject(ContinuidadAsistencialFormService);
    continuidadAsistencialService = TestBed.inject(ContinuidadAsistencialService);
    itemCieService = TestBed.inject(ItemCieService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ItemCie query and add missing value', () => {
      const continuidadAsistencial: IContinuidadAsistencial = { id: 456 };
      const itemCie: IItemCie = { id: 14429 };
      continuidadAsistencial.itemCie = itemCie;

      const itemCieCollection: IItemCie[] = [{ id: 30958 }];
      jest.spyOn(itemCieService, 'query').mockReturnValue(of(new HttpResponse({ body: itemCieCollection })));
      const additionalItemCies = [itemCie];
      const expectedCollection: IItemCie[] = [...additionalItemCies, ...itemCieCollection];
      jest.spyOn(itemCieService, 'addItemCieToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ continuidadAsistencial });
      comp.ngOnInit();

      expect(itemCieService.query).toHaveBeenCalled();
      expect(itemCieService.addItemCieToCollectionIfMissing).toHaveBeenCalledWith(
        itemCieCollection,
        ...additionalItemCies.map(expect.objectContaining),
      );
      expect(comp.itemCiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const continuidadAsistencial: IContinuidadAsistencial = { id: 456 };
      const itemCie: IItemCie = { id: 26248 };
      continuidadAsistencial.itemCie = itemCie;

      activatedRoute.data = of({ continuidadAsistencial });
      comp.ngOnInit();

      expect(comp.itemCiesSharedCollection).toContain(itemCie);
      expect(comp.continuidadAsistencial).toEqual(continuidadAsistencial);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContinuidadAsistencial>>();
      const continuidadAsistencial = { id: 123 };
      jest.spyOn(continuidadAsistencialFormService, 'getContinuidadAsistencial').mockReturnValue(continuidadAsistencial);
      jest.spyOn(continuidadAsistencialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ continuidadAsistencial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: continuidadAsistencial }));
      saveSubject.complete();

      // THEN
      expect(continuidadAsistencialFormService.getContinuidadAsistencial).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(continuidadAsistencialService.update).toHaveBeenCalledWith(expect.objectContaining(continuidadAsistencial));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContinuidadAsistencial>>();
      const continuidadAsistencial = { id: 123 };
      jest.spyOn(continuidadAsistencialFormService, 'getContinuidadAsistencial').mockReturnValue({ id: null });
      jest.spyOn(continuidadAsistencialService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ continuidadAsistencial: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: continuidadAsistencial }));
      saveSubject.complete();

      // THEN
      expect(continuidadAsistencialFormService.getContinuidadAsistencial).toHaveBeenCalled();
      expect(continuidadAsistencialService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContinuidadAsistencial>>();
      const continuidadAsistencial = { id: 123 };
      jest.spyOn(continuidadAsistencialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ continuidadAsistencial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(continuidadAsistencialService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareItemCie', () => {
      it('Should forward to itemCieService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(itemCieService, 'compareItemCie');
        comp.compareItemCie(entity, entity2);
        expect(itemCieService.compareItemCie).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
