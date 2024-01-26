import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InstitucionService } from '../service/institucion.service';
import { IInstitucion } from '../institucion.model';
import { InstitucionFormService } from './institucion-form.service';

import { InstitucionUpdateComponent } from './institucion-update.component';

describe('Institucion Management Update Component', () => {
  let comp: InstitucionUpdateComponent;
  let fixture: ComponentFixture<InstitucionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let institucionFormService: InstitucionFormService;
  let institucionService: InstitucionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), InstitucionUpdateComponent],
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
      .overrideTemplate(InstitucionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InstitucionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    institucionFormService = TestBed.inject(InstitucionFormService);
    institucionService = TestBed.inject(InstitucionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const institucion: IInstitucion = { id: 456 };

      activatedRoute.data = of({ institucion });
      comp.ngOnInit();

      expect(comp.institucion).toEqual(institucion);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstitucion>>();
      const institucion = { id: 123 };
      jest.spyOn(institucionFormService, 'getInstitucion').mockReturnValue(institucion);
      jest.spyOn(institucionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ institucion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: institucion }));
      saveSubject.complete();

      // THEN
      expect(institucionFormService.getInstitucion).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(institucionService.update).toHaveBeenCalledWith(expect.objectContaining(institucion));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstitucion>>();
      const institucion = { id: 123 };
      jest.spyOn(institucionFormService, 'getInstitucion').mockReturnValue({ id: null });
      jest.spyOn(institucionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ institucion: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: institucion }));
      saveSubject.complete();

      // THEN
      expect(institucionFormService.getInstitucion).toHaveBeenCalled();
      expect(institucionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInstitucion>>();
      const institucion = { id: 123 };
      jest.spyOn(institucionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ institucion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(institucionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
