import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CronogramaService } from '../service/cronograma.service';
import { ICronograma } from '../cronograma.model';
import { CronogramaFormService } from './cronograma-form.service';

import { CronogramaUpdateComponent } from './cronograma-update.component';

describe('Cronograma Management Update Component', () => {
  let comp: CronogramaUpdateComponent;
  let fixture: ComponentFixture<CronogramaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cronogramaFormService: CronogramaFormService;
  let cronogramaService: CronogramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CronogramaUpdateComponent],
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
      .overrideTemplate(CronogramaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CronogramaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cronogramaFormService = TestBed.inject(CronogramaFormService);
    cronogramaService = TestBed.inject(CronogramaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cronograma: ICronograma = { id: 456 };

      activatedRoute.data = of({ cronograma });
      comp.ngOnInit();

      expect(comp.cronograma).toEqual(cronograma);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICronograma>>();
      const cronograma = { id: 123 };
      jest.spyOn(cronogramaFormService, 'getCronograma').mockReturnValue(cronograma);
      jest.spyOn(cronogramaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cronograma });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cronograma }));
      saveSubject.complete();

      // THEN
      expect(cronogramaFormService.getCronograma).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cronogramaService.update).toHaveBeenCalledWith(expect.objectContaining(cronograma));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICronograma>>();
      const cronograma = { id: 123 };
      jest.spyOn(cronogramaFormService, 'getCronograma').mockReturnValue({ id: null });
      jest.spyOn(cronogramaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cronograma: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cronograma }));
      saveSubject.complete();

      // THEN
      expect(cronogramaFormService.getCronograma).toHaveBeenCalled();
      expect(cronogramaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICronograma>>();
      const cronograma = { id: 123 };
      jest.spyOn(cronogramaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cronograma });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cronogramaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
