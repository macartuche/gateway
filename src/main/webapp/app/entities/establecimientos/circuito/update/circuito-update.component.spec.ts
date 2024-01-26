import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ICanton } from 'app/entities/establecimientos/canton/canton.model';
import { CantonService } from 'app/entities/establecimientos/canton/service/canton.service';
import { CircuitoService } from '../service/circuito.service';
import { ICircuito } from '../circuito.model';
import { CircuitoFormService } from './circuito-form.service';

import { CircuitoUpdateComponent } from './circuito-update.component';

describe('Circuito Management Update Component', () => {
  let comp: CircuitoUpdateComponent;
  let fixture: ComponentFixture<CircuitoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let circuitoFormService: CircuitoFormService;
  let circuitoService: CircuitoService;
  let cantonService: CantonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CircuitoUpdateComponent],
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
      .overrideTemplate(CircuitoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CircuitoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    circuitoFormService = TestBed.inject(CircuitoFormService);
    circuitoService = TestBed.inject(CircuitoService);
    cantonService = TestBed.inject(CantonService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Canton query and add missing value', () => {
      const circuito: ICircuito = { id: 456 };
      const canton: ICanton = { id: 20367 };
      circuito.canton = canton;

      const cantonCollection: ICanton[] = [{ id: 2101 }];
      jest.spyOn(cantonService, 'query').mockReturnValue(of(new HttpResponse({ body: cantonCollection })));
      const additionalCantons = [canton];
      const expectedCollection: ICanton[] = [...additionalCantons, ...cantonCollection];
      jest.spyOn(cantonService, 'addCantonToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ circuito });
      comp.ngOnInit();

      expect(cantonService.query).toHaveBeenCalled();
      expect(cantonService.addCantonToCollectionIfMissing).toHaveBeenCalledWith(
        cantonCollection,
        ...additionalCantons.map(expect.objectContaining),
      );
      expect(comp.cantonsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const circuito: ICircuito = { id: 456 };
      const canton: ICanton = { id: 17256 };
      circuito.canton = canton;

      activatedRoute.data = of({ circuito });
      comp.ngOnInit();

      expect(comp.cantonsSharedCollection).toContain(canton);
      expect(comp.circuito).toEqual(circuito);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICircuito>>();
      const circuito = { id: 123 };
      jest.spyOn(circuitoFormService, 'getCircuito').mockReturnValue(circuito);
      jest.spyOn(circuitoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ circuito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: circuito }));
      saveSubject.complete();

      // THEN
      expect(circuitoFormService.getCircuito).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(circuitoService.update).toHaveBeenCalledWith(expect.objectContaining(circuito));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICircuito>>();
      const circuito = { id: 123 };
      jest.spyOn(circuitoFormService, 'getCircuito').mockReturnValue({ id: null });
      jest.spyOn(circuitoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ circuito: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: circuito }));
      saveSubject.complete();

      // THEN
      expect(circuitoFormService.getCircuito).toHaveBeenCalled();
      expect(circuitoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICircuito>>();
      const circuito = { id: 123 };
      jest.spyOn(circuitoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ circuito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(circuitoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCanton', () => {
      it('Should forward to cantonService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cantonService, 'compareCanton');
        comp.compareCanton(entity, entity2);
        expect(cantonService.compareCanton).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
