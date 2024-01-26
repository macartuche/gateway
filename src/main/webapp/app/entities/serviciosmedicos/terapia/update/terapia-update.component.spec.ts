import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IContinuidadAsistencial } from 'app/entities/serviciosmedicos/continuidad-asistencial/continuidad-asistencial.model';
import { ContinuidadAsistencialService } from 'app/entities/serviciosmedicos/continuidad-asistencial/service/continuidad-asistencial.service';
import { IItemLiquidacion } from 'app/entities/serviciosmedicos/item-liquidacion/item-liquidacion.model';
import { ItemLiquidacionService } from 'app/entities/serviciosmedicos/item-liquidacion/service/item-liquidacion.service';
import { ITarifario } from 'app/entities/serviciosmedicos/tarifario/tarifario.model';
import { TarifarioService } from 'app/entities/serviciosmedicos/tarifario/service/tarifario.service';
import { ITerapia } from '../terapia.model';
import { TerapiaService } from '../service/terapia.service';
import { TerapiaFormService } from './terapia-form.service';

import { TerapiaUpdateComponent } from './terapia-update.component';

describe('Terapia Management Update Component', () => {
  let comp: TerapiaUpdateComponent;
  let fixture: ComponentFixture<TerapiaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let terapiaFormService: TerapiaFormService;
  let terapiaService: TerapiaService;
  let continuidadAsistencialService: ContinuidadAsistencialService;
  let itemLiquidacionService: ItemLiquidacionService;
  let tarifarioService: TarifarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TerapiaUpdateComponent],
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
      .overrideTemplate(TerapiaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TerapiaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    terapiaFormService = TestBed.inject(TerapiaFormService);
    terapiaService = TestBed.inject(TerapiaService);
    continuidadAsistencialService = TestBed.inject(ContinuidadAsistencialService);
    itemLiquidacionService = TestBed.inject(ItemLiquidacionService);
    tarifarioService = TestBed.inject(TarifarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ContinuidadAsistencial query and add missing value', () => {
      const terapia: ITerapia = { id: 456 };
      const continuidad: IContinuidadAsistencial = { id: 16765 };
      terapia.continuidad = continuidad;

      const continuidadAsistencialCollection: IContinuidadAsistencial[] = [{ id: 5100 }];
      jest.spyOn(continuidadAsistencialService, 'query').mockReturnValue(of(new HttpResponse({ body: continuidadAsistencialCollection })));
      const additionalContinuidadAsistencials = [continuidad];
      const expectedCollection: IContinuidadAsistencial[] = [...additionalContinuidadAsistencials, ...continuidadAsistencialCollection];
      jest.spyOn(continuidadAsistencialService, 'addContinuidadAsistencialToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ terapia });
      comp.ngOnInit();

      expect(continuidadAsistencialService.query).toHaveBeenCalled();
      expect(continuidadAsistencialService.addContinuidadAsistencialToCollectionIfMissing).toHaveBeenCalledWith(
        continuidadAsistencialCollection,
        ...additionalContinuidadAsistencials.map(expect.objectContaining),
      );
      expect(comp.continuidadAsistencialsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ItemLiquidacion query and add missing value', () => {
      const terapia: ITerapia = { id: 456 };
      const itemLiquidacion: IItemLiquidacion = { id: 21970 };
      terapia.itemLiquidacion = itemLiquidacion;

      const itemLiquidacionCollection: IItemLiquidacion[] = [{ id: 16686 }];
      jest.spyOn(itemLiquidacionService, 'query').mockReturnValue(of(new HttpResponse({ body: itemLiquidacionCollection })));
      const additionalItemLiquidacions = [itemLiquidacion];
      const expectedCollection: IItemLiquidacion[] = [...additionalItemLiquidacions, ...itemLiquidacionCollection];
      jest.spyOn(itemLiquidacionService, 'addItemLiquidacionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ terapia });
      comp.ngOnInit();

      expect(itemLiquidacionService.query).toHaveBeenCalled();
      expect(itemLiquidacionService.addItemLiquidacionToCollectionIfMissing).toHaveBeenCalledWith(
        itemLiquidacionCollection,
        ...additionalItemLiquidacions.map(expect.objectContaining),
      );
      expect(comp.itemLiquidacionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Tarifario query and add missing value', () => {
      const terapia: ITerapia = { id: 456 };
      const tarifario: ITarifario = { id: 20124 };
      terapia.tarifario = tarifario;

      const tarifarioCollection: ITarifario[] = [{ id: 28663 }];
      jest.spyOn(tarifarioService, 'query').mockReturnValue(of(new HttpResponse({ body: tarifarioCollection })));
      const additionalTarifarios = [tarifario];
      const expectedCollection: ITarifario[] = [...additionalTarifarios, ...tarifarioCollection];
      jest.spyOn(tarifarioService, 'addTarifarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ terapia });
      comp.ngOnInit();

      expect(tarifarioService.query).toHaveBeenCalled();
      expect(tarifarioService.addTarifarioToCollectionIfMissing).toHaveBeenCalledWith(
        tarifarioCollection,
        ...additionalTarifarios.map(expect.objectContaining),
      );
      expect(comp.tarifariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const terapia: ITerapia = { id: 456 };
      const continuidad: IContinuidadAsistencial = { id: 5759 };
      terapia.continuidad = continuidad;
      const itemLiquidacion: IItemLiquidacion = { id: 31262 };
      terapia.itemLiquidacion = itemLiquidacion;
      const tarifario: ITarifario = { id: 18441 };
      terapia.tarifario = tarifario;

      activatedRoute.data = of({ terapia });
      comp.ngOnInit();

      expect(comp.continuidadAsistencialsSharedCollection).toContain(continuidad);
      expect(comp.itemLiquidacionsSharedCollection).toContain(itemLiquidacion);
      expect(comp.tarifariosSharedCollection).toContain(tarifario);
      expect(comp.terapia).toEqual(terapia);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITerapia>>();
      const terapia = { id: 123 };
      jest.spyOn(terapiaFormService, 'getTerapia').mockReturnValue(terapia);
      jest.spyOn(terapiaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terapia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: terapia }));
      saveSubject.complete();

      // THEN
      expect(terapiaFormService.getTerapia).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(terapiaService.update).toHaveBeenCalledWith(expect.objectContaining(terapia));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITerapia>>();
      const terapia = { id: 123 };
      jest.spyOn(terapiaFormService, 'getTerapia').mockReturnValue({ id: null });
      jest.spyOn(terapiaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terapia: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: terapia }));
      saveSubject.complete();

      // THEN
      expect(terapiaFormService.getTerapia).toHaveBeenCalled();
      expect(terapiaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITerapia>>();
      const terapia = { id: 123 };
      jest.spyOn(terapiaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terapia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(terapiaService.update).toHaveBeenCalled();
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

    describe('compareItemLiquidacion', () => {
      it('Should forward to itemLiquidacionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(itemLiquidacionService, 'compareItemLiquidacion');
        comp.compareItemLiquidacion(entity, entity2);
        expect(itemLiquidacionService.compareItemLiquidacion).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTarifario', () => {
      it('Should forward to tarifarioService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tarifarioService, 'compareTarifario');
        comp.compareTarifario(entity, entity2);
        expect(tarifarioService.compareTarifario).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
