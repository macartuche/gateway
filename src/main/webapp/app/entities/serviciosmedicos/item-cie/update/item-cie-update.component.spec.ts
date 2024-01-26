import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ICie } from 'app/entities/serviciosmedicos/cie/cie.model';
import { CieService } from 'app/entities/serviciosmedicos/cie/service/cie.service';
import { ItemCieService } from '../service/item-cie.service';
import { IItemCie } from '../item-cie.model';
import { ItemCieFormService } from './item-cie-form.service';

import { ItemCieUpdateComponent } from './item-cie-update.component';

describe('ItemCie Management Update Component', () => {
  let comp: ItemCieUpdateComponent;
  let fixture: ComponentFixture<ItemCieUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let itemCieFormService: ItemCieFormService;
  let itemCieService: ItemCieService;
  let cieService: CieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ItemCieUpdateComponent],
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
      .overrideTemplate(ItemCieUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ItemCieUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    itemCieFormService = TestBed.inject(ItemCieFormService);
    itemCieService = TestBed.inject(ItemCieService);
    cieService = TestBed.inject(CieService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ItemCie query and add missing value', () => {
      const itemCie: IItemCie = { id: 456 };
      const padre: IItemCie = { id: 4897 };
      itemCie.padre = padre;

      const itemCieCollection: IItemCie[] = [{ id: 5203 }];
      jest.spyOn(itemCieService, 'query').mockReturnValue(of(new HttpResponse({ body: itemCieCollection })));
      const additionalItemCies = [padre];
      const expectedCollection: IItemCie[] = [...additionalItemCies, ...itemCieCollection];
      jest.spyOn(itemCieService, 'addItemCieToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itemCie });
      comp.ngOnInit();

      expect(itemCieService.query).toHaveBeenCalled();
      expect(itemCieService.addItemCieToCollectionIfMissing).toHaveBeenCalledWith(
        itemCieCollection,
        ...additionalItemCies.map(expect.objectContaining),
      );
      expect(comp.itemCiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Cie query and add missing value', () => {
      const itemCie: IItemCie = { id: 456 };
      const cie: ICie = { id: 3658 };
      itemCie.cie = cie;

      const cieCollection: ICie[] = [{ id: 4952 }];
      jest.spyOn(cieService, 'query').mockReturnValue(of(new HttpResponse({ body: cieCollection })));
      const additionalCies = [cie];
      const expectedCollection: ICie[] = [...additionalCies, ...cieCollection];
      jest.spyOn(cieService, 'addCieToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itemCie });
      comp.ngOnInit();

      expect(cieService.query).toHaveBeenCalled();
      expect(cieService.addCieToCollectionIfMissing).toHaveBeenCalledWith(cieCollection, ...additionalCies.map(expect.objectContaining));
      expect(comp.ciesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const itemCie: IItemCie = { id: 456 };
      const padre: IItemCie = { id: 2825 };
      itemCie.padre = padre;
      const cie: ICie = { id: 6619 };
      itemCie.cie = cie;

      activatedRoute.data = of({ itemCie });
      comp.ngOnInit();

      expect(comp.itemCiesSharedCollection).toContain(padre);
      expect(comp.ciesSharedCollection).toContain(cie);
      expect(comp.itemCie).toEqual(itemCie);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItemCie>>();
      const itemCie = { id: 123 };
      jest.spyOn(itemCieFormService, 'getItemCie').mockReturnValue(itemCie);
      jest.spyOn(itemCieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemCie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itemCie }));
      saveSubject.complete();

      // THEN
      expect(itemCieFormService.getItemCie).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(itemCieService.update).toHaveBeenCalledWith(expect.objectContaining(itemCie));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItemCie>>();
      const itemCie = { id: 123 };
      jest.spyOn(itemCieFormService, 'getItemCie').mockReturnValue({ id: null });
      jest.spyOn(itemCieService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemCie: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itemCie }));
      saveSubject.complete();

      // THEN
      expect(itemCieFormService.getItemCie).toHaveBeenCalled();
      expect(itemCieService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItemCie>>();
      const itemCie = { id: 123 };
      jest.spyOn(itemCieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemCie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(itemCieService.update).toHaveBeenCalled();
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

    describe('compareCie', () => {
      it('Should forward to cieService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cieService, 'compareCie');
        comp.compareCie(entity, entity2);
        expect(cieService.compareCie).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
