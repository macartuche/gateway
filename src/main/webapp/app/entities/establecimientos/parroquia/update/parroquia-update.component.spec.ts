import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ICircuito } from 'app/entities/establecimientos/circuito/circuito.model';
import { CircuitoService } from 'app/entities/establecimientos/circuito/service/circuito.service';
import { ParroquiaService } from '../service/parroquia.service';
import { IParroquia } from '../parroquia.model';
import { ParroquiaFormService } from './parroquia-form.service';

import { ParroquiaUpdateComponent } from './parroquia-update.component';

describe('Parroquia Management Update Component', () => {
  let comp: ParroquiaUpdateComponent;
  let fixture: ComponentFixture<ParroquiaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let parroquiaFormService: ParroquiaFormService;
  let parroquiaService: ParroquiaService;
  let circuitoService: CircuitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ParroquiaUpdateComponent],
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
      .overrideTemplate(ParroquiaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ParroquiaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    parroquiaFormService = TestBed.inject(ParroquiaFormService);
    parroquiaService = TestBed.inject(ParroquiaService);
    circuitoService = TestBed.inject(CircuitoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Circuito query and add missing value', () => {
      const parroquia: IParroquia = { id: 456 };
      const circuito: ICircuito = { id: 16262 };
      parroquia.circuito = circuito;

      const circuitoCollection: ICircuito[] = [{ id: 16028 }];
      jest.spyOn(circuitoService, 'query').mockReturnValue(of(new HttpResponse({ body: circuitoCollection })));
      const additionalCircuitos = [circuito];
      const expectedCollection: ICircuito[] = [...additionalCircuitos, ...circuitoCollection];
      jest.spyOn(circuitoService, 'addCircuitoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ parroquia });
      comp.ngOnInit();

      expect(circuitoService.query).toHaveBeenCalled();
      expect(circuitoService.addCircuitoToCollectionIfMissing).toHaveBeenCalledWith(
        circuitoCollection,
        ...additionalCircuitos.map(expect.objectContaining),
      );
      expect(comp.circuitosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const parroquia: IParroquia = { id: 456 };
      const circuito: ICircuito = { id: 20012 };
      parroquia.circuito = circuito;

      activatedRoute.data = of({ parroquia });
      comp.ngOnInit();

      expect(comp.circuitosSharedCollection).toContain(circuito);
      expect(comp.parroquia).toEqual(parroquia);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParroquia>>();
      const parroquia = { id: 123 };
      jest.spyOn(parroquiaFormService, 'getParroquia').mockReturnValue(parroquia);
      jest.spyOn(parroquiaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parroquia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: parroquia }));
      saveSubject.complete();

      // THEN
      expect(parroquiaFormService.getParroquia).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(parroquiaService.update).toHaveBeenCalledWith(expect.objectContaining(parroquia));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParroquia>>();
      const parroquia = { id: 123 };
      jest.spyOn(parroquiaFormService, 'getParroquia').mockReturnValue({ id: null });
      jest.spyOn(parroquiaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parroquia: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: parroquia }));
      saveSubject.complete();

      // THEN
      expect(parroquiaFormService.getParroquia).toHaveBeenCalled();
      expect(parroquiaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParroquia>>();
      const parroquia = { id: 123 };
      jest.spyOn(parroquiaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parroquia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(parroquiaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCircuito', () => {
      it('Should forward to circuitoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(circuitoService, 'compareCircuito');
        comp.compareCircuito(entity, entity2);
        expect(circuitoService.compareCircuito).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
