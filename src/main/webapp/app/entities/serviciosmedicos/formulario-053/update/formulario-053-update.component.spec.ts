import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { Formulario053Service } from '../service/formulario-053.service';
import { IFormulario053 } from '../formulario-053.model';
import { Formulario053FormService } from './formulario-053-form.service';

import { Formulario053UpdateComponent } from './formulario-053-update.component';

describe('Formulario053 Management Update Component', () => {
  let comp: Formulario053UpdateComponent;
  let fixture: ComponentFixture<Formulario053UpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let formulario053FormService: Formulario053FormService;
  let formulario053Service: Formulario053Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), Formulario053UpdateComponent],
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
      .overrideTemplate(Formulario053UpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(Formulario053UpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    formulario053FormService = TestBed.inject(Formulario053FormService);
    formulario053Service = TestBed.inject(Formulario053Service);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const formulario053: IFormulario053 = { id: 456 };

      activatedRoute.data = of({ formulario053 });
      comp.ngOnInit();

      expect(comp.formulario053).toEqual(formulario053);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFormulario053>>();
      const formulario053 = { id: 123 };
      jest.spyOn(formulario053FormService, 'getFormulario053').mockReturnValue(formulario053);
      jest.spyOn(formulario053Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ formulario053 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: formulario053 }));
      saveSubject.complete();

      // THEN
      expect(formulario053FormService.getFormulario053).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(formulario053Service.update).toHaveBeenCalledWith(expect.objectContaining(formulario053));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFormulario053>>();
      const formulario053 = { id: 123 };
      jest.spyOn(formulario053FormService, 'getFormulario053').mockReturnValue({ id: null });
      jest.spyOn(formulario053Service, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ formulario053: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: formulario053 }));
      saveSubject.complete();

      // THEN
      expect(formulario053FormService.getFormulario053).toHaveBeenCalled();
      expect(formulario053Service.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFormulario053>>();
      const formulario053 = { id: 123 };
      jest.spyOn(formulario053Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ formulario053 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(formulario053Service.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
