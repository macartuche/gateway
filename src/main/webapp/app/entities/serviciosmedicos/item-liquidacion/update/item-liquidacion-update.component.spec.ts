import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IContinuidadAsistencial } from 'app/entities/serviciosmedicos/continuidad-asistencial/continuidad-asistencial.model';
import { ContinuidadAsistencialService } from 'app/entities/serviciosmedicos/continuidad-asistencial/service/continuidad-asistencial.service';
import { ItemLiquidacionService } from '../service/item-liquidacion.service';
import { IItemLiquidacion } from '../item-liquidacion.model';
import { ItemLiquidacionFormService } from './item-liquidacion-form.service';

import { ItemLiquidacionUpdateComponent } from './item-liquidacion-update.component';

describe('ItemLiquidacion Management Update Component', () => {
  let comp: ItemLiquidacionUpdateComponent;
  let fixture: ComponentFixture<ItemLiquidacionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let itemLiquidacionFormService: ItemLiquidacionFormService;
  let itemLiquidacionService: ItemLiquidacionService;
  let continuidadAsistencialService: ContinuidadAsistencialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ItemLiquidacionUpdateComponent],
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
      .overrideTemplate(ItemLiquidacionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ItemLiquidacionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    itemLiquidacionFormService = TestBed.inject(ItemLiquidacionFormService);
    itemLiquidacionService = TestBed.inject(ItemLiquidacionService);
    continuidadAsistencialService = TestBed.inject(ContinuidadAsistencialService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ContinuidadAsistencial query and add missing value', () => {
      const itemLiquidacion: IItemLiquidacion = { id: 456 };
      const continuidad: IContinuidadAsistencial = { id: 10524 };
      itemLiquidacion.continuidad = continuidad;

      const continuidadAsistencialCollection: IContinuidadAsistencial[] = [{ id: 30742 }];
      jest.spyOn(continuidadAsistencialService, 'query').mockReturnValue(of(new HttpResponse({ body: continuidadAsistencialCollection })));
      const additionalContinuidadAsistencials = [continuidad];
      const expectedCollection: IContinuidadAsistencial[] = [...additionalContinuidadAsistencials, ...continuidadAsistencialCollection];
      jest.spyOn(continuidadAsistencialService, 'addContinuidadAsistencialToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itemLiquidacion });
      comp.ngOnInit();

      expect(continuidadAsistencialService.query).toHaveBeenCalled();
      expect(continuidadAsistencialService.addContinuidadAsistencialToCollectionIfMissing).toHaveBeenCalledWith(
        continuidadAsistencialCollection,
        ...additionalContinuidadAsistencials.map(expect.objectContaining),
      );
      expect(comp.continuidadAsistencialsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const itemLiquidacion: IItemLiquidacion = { id: 456 };
      const continuidad: IContinuidadAsistencial = { id: 16843 };
      itemLiquidacion.continuidad = continuidad;

      activatedRoute.data = of({ itemLiquidacion });
      comp.ngOnInit();

      expect(comp.continuidadAsistencialsSharedCollection).toContain(continuidad);
      expect(comp.itemLiquidacion).toEqual(itemLiquidacion);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItemLiquidacion>>();
      const itemLiquidacion = { id: 123 };
      jest.spyOn(itemLiquidacionFormService, 'getItemLiquidacion').mockReturnValue(itemLiquidacion);
      jest.spyOn(itemLiquidacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemLiquidacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itemLiquidacion }));
      saveSubject.complete();

      // THEN
      expect(itemLiquidacionFormService.getItemLiquidacion).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(itemLiquidacionService.update).toHaveBeenCalledWith(expect.objectContaining(itemLiquidacion));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItemLiquidacion>>();
      const itemLiquidacion = { id: 123 };
      jest.spyOn(itemLiquidacionFormService, 'getItemLiquidacion').mockReturnValue({ id: null });
      jest.spyOn(itemLiquidacionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemLiquidacion: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itemLiquidacion }));
      saveSubject.complete();

      // THEN
      expect(itemLiquidacionFormService.getItemLiquidacion).toHaveBeenCalled();
      expect(itemLiquidacionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItemLiquidacion>>();
      const itemLiquidacion = { id: 123 };
      jest.spyOn(itemLiquidacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemLiquidacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(itemLiquidacionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareContinuidadAsistencial', () => {
      it('Should forward to continuidadAsistencialService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(continuidadAsistencialService, 'compareContinuidadAsistencial');
        comp.compareContinuidadAsistencial(entity, entity2);
        expect(continuidadAsistencialService.compareContinuidadAsistencial).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
