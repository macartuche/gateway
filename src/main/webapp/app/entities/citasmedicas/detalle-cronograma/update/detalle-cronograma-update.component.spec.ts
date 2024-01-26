import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ICronograma } from 'app/entities/citasmedicas/cronograma/cronograma.model';
import { CronogramaService } from 'app/entities/citasmedicas/cronograma/service/cronograma.service';
import { DetalleCronogramaService } from '../service/detalle-cronograma.service';
import { IDetalleCronograma } from '../detalle-cronograma.model';
import { DetalleCronogramaFormService } from './detalle-cronograma-form.service';

import { DetalleCronogramaUpdateComponent } from './detalle-cronograma-update.component';

describe('DetalleCronograma Management Update Component', () => {
  let comp: DetalleCronogramaUpdateComponent;
  let fixture: ComponentFixture<DetalleCronogramaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let detalleCronogramaFormService: DetalleCronogramaFormService;
  let detalleCronogramaService: DetalleCronogramaService;
  let cronogramaService: CronogramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), DetalleCronogramaUpdateComponent],
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
      .overrideTemplate(DetalleCronogramaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DetalleCronogramaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    detalleCronogramaFormService = TestBed.inject(DetalleCronogramaFormService);
    detalleCronogramaService = TestBed.inject(DetalleCronogramaService);
    cronogramaService = TestBed.inject(CronogramaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Cronograma query and add missing value', () => {
      const detalleCronograma: IDetalleCronograma = { id: 456 };
      const cronograma: ICronograma = { id: 13419 };
      detalleCronograma.cronograma = cronograma;

      const cronogramaCollection: ICronograma[] = [{ id: 15474 }];
      jest.spyOn(cronogramaService, 'query').mockReturnValue(of(new HttpResponse({ body: cronogramaCollection })));
      const additionalCronogramas = [cronograma];
      const expectedCollection: ICronograma[] = [...additionalCronogramas, ...cronogramaCollection];
      jest.spyOn(cronogramaService, 'addCronogramaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ detalleCronograma });
      comp.ngOnInit();

      expect(cronogramaService.query).toHaveBeenCalled();
      expect(cronogramaService.addCronogramaToCollectionIfMissing).toHaveBeenCalledWith(
        cronogramaCollection,
        ...additionalCronogramas.map(expect.objectContaining),
      );
      expect(comp.cronogramasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const detalleCronograma: IDetalleCronograma = { id: 456 };
      const cronograma: ICronograma = { id: 29736 };
      detalleCronograma.cronograma = cronograma;

      activatedRoute.data = of({ detalleCronograma });
      comp.ngOnInit();

      expect(comp.cronogramasSharedCollection).toContain(cronograma);
      expect(comp.detalleCronograma).toEqual(detalleCronograma);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDetalleCronograma>>();
      const detalleCronograma = { id: 123 };
      jest.spyOn(detalleCronogramaFormService, 'getDetalleCronograma').mockReturnValue(detalleCronograma);
      jest.spyOn(detalleCronogramaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ detalleCronograma });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: detalleCronograma }));
      saveSubject.complete();

      // THEN
      expect(detalleCronogramaFormService.getDetalleCronograma).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(detalleCronogramaService.update).toHaveBeenCalledWith(expect.objectContaining(detalleCronograma));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDetalleCronograma>>();
      const detalleCronograma = { id: 123 };
      jest.spyOn(detalleCronogramaFormService, 'getDetalleCronograma').mockReturnValue({ id: null });
      jest.spyOn(detalleCronogramaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ detalleCronograma: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: detalleCronograma }));
      saveSubject.complete();

      // THEN
      expect(detalleCronogramaFormService.getDetalleCronograma).toHaveBeenCalled();
      expect(detalleCronogramaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDetalleCronograma>>();
      const detalleCronograma = { id: 123 };
      jest.spyOn(detalleCronogramaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ detalleCronograma });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(detalleCronogramaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCronograma', () => {
      it('Should forward to cronogramaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cronogramaService, 'compareCronograma');
        comp.compareCronograma(entity, entity2);
        expect(cronogramaService.compareCronograma).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
