import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EntidadService } from '../service/entidad.service';
import { IEntidad } from '../entidad.model';
import { EntidadFormService } from './entidad-form.service';

import { EntidadUpdateComponent } from './entidad-update.component';

describe('Entidad Management Update Component', () => {
  let comp: EntidadUpdateComponent;
  let fixture: ComponentFixture<EntidadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let entidadFormService: EntidadFormService;
  let entidadService: EntidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), EntidadUpdateComponent],
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
      .overrideTemplate(EntidadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntidadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    entidadFormService = TestBed.inject(EntidadFormService);
    entidadService = TestBed.inject(EntidadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const entidad: IEntidad = { id: 456 };

      activatedRoute.data = of({ entidad });
      comp.ngOnInit();

      expect(comp.entidad).toEqual(entidad);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntidad>>();
      const entidad = { id: 123 };
      jest.spyOn(entidadFormService, 'getEntidad').mockReturnValue(entidad);
      jest.spyOn(entidadService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entidad });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entidad }));
      saveSubject.complete();

      // THEN
      expect(entidadFormService.getEntidad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(entidadService.update).toHaveBeenCalledWith(expect.objectContaining(entidad));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntidad>>();
      const entidad = { id: 123 };
      jest.spyOn(entidadFormService, 'getEntidad').mockReturnValue({ id: null });
      jest.spyOn(entidadService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entidad: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entidad }));
      saveSubject.complete();

      // THEN
      expect(entidadFormService.getEntidad).toHaveBeenCalled();
      expect(entidadService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntidad>>();
      const entidad = { id: 123 };
      jest.spyOn(entidadService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entidad });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(entidadService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
