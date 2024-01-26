import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TarifarioService } from '../service/tarifario.service';
import { ITarifario } from '../tarifario.model';
import { TarifarioFormService } from './tarifario-form.service';

import { TarifarioUpdateComponent } from './tarifario-update.component';

describe('Tarifario Management Update Component', () => {
  let comp: TarifarioUpdateComponent;
  let fixture: ComponentFixture<TarifarioUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tarifarioFormService: TarifarioFormService;
  let tarifarioService: TarifarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TarifarioUpdateComponent],
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
      .overrideTemplate(TarifarioUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TarifarioUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tarifarioFormService = TestBed.inject(TarifarioFormService);
    tarifarioService = TestBed.inject(TarifarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tarifario: ITarifario = { id: 456 };

      activatedRoute.data = of({ tarifario });
      comp.ngOnInit();

      expect(comp.tarifario).toEqual(tarifario);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITarifario>>();
      const tarifario = { id: 123 };
      jest.spyOn(tarifarioFormService, 'getTarifario').mockReturnValue(tarifario);
      jest.spyOn(tarifarioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tarifario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tarifario }));
      saveSubject.complete();

      // THEN
      expect(tarifarioFormService.getTarifario).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tarifarioService.update).toHaveBeenCalledWith(expect.objectContaining(tarifario));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITarifario>>();
      const tarifario = { id: 123 };
      jest.spyOn(tarifarioFormService, 'getTarifario').mockReturnValue({ id: null });
      jest.spyOn(tarifarioService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tarifario: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tarifario }));
      saveSubject.complete();

      // THEN
      expect(tarifarioFormService.getTarifario).toHaveBeenCalled();
      expect(tarifarioService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITarifario>>();
      const tarifario = { id: 123 };
      jest.spyOn(tarifarioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tarifario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tarifarioService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
