import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { NivelEstablecimientoService } from '../service/nivel-establecimiento.service';
import { INivelEstablecimiento } from '../nivel-establecimiento.model';
import { NivelEstablecimientoFormService } from './nivel-establecimiento-form.service';

import { NivelEstablecimientoUpdateComponent } from './nivel-establecimiento-update.component';

describe('NivelEstablecimiento Management Update Component', () => {
  let comp: NivelEstablecimientoUpdateComponent;
  let fixture: ComponentFixture<NivelEstablecimientoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let nivelEstablecimientoFormService: NivelEstablecimientoFormService;
  let nivelEstablecimientoService: NivelEstablecimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), NivelEstablecimientoUpdateComponent],
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
      .overrideTemplate(NivelEstablecimientoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NivelEstablecimientoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    nivelEstablecimientoFormService = TestBed.inject(NivelEstablecimientoFormService);
    nivelEstablecimientoService = TestBed.inject(NivelEstablecimientoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const nivelEstablecimiento: INivelEstablecimiento = { id: 456 };

      activatedRoute.data = of({ nivelEstablecimiento });
      comp.ngOnInit();

      expect(comp.nivelEstablecimiento).toEqual(nivelEstablecimiento);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INivelEstablecimiento>>();
      const nivelEstablecimiento = { id: 123 };
      jest.spyOn(nivelEstablecimientoFormService, 'getNivelEstablecimiento').mockReturnValue(nivelEstablecimiento);
      jest.spyOn(nivelEstablecimientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nivelEstablecimiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nivelEstablecimiento }));
      saveSubject.complete();

      // THEN
      expect(nivelEstablecimientoFormService.getNivelEstablecimiento).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(nivelEstablecimientoService.update).toHaveBeenCalledWith(expect.objectContaining(nivelEstablecimiento));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INivelEstablecimiento>>();
      const nivelEstablecimiento = { id: 123 };
      jest.spyOn(nivelEstablecimientoFormService, 'getNivelEstablecimiento').mockReturnValue({ id: null });
      jest.spyOn(nivelEstablecimientoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nivelEstablecimiento: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nivelEstablecimiento }));
      saveSubject.complete();

      // THEN
      expect(nivelEstablecimientoFormService.getNivelEstablecimiento).toHaveBeenCalled();
      expect(nivelEstablecimientoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INivelEstablecimiento>>();
      const nivelEstablecimiento = { id: 123 };
      jest.spyOn(nivelEstablecimientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nivelEstablecimiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(nivelEstablecimientoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
