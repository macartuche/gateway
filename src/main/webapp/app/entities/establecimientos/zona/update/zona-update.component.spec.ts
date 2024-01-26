import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ZonaService } from '../service/zona.service';
import { IZona } from '../zona.model';
import { ZonaFormService } from './zona-form.service';

import { ZonaUpdateComponent } from './zona-update.component';

describe('Zona Management Update Component', () => {
  let comp: ZonaUpdateComponent;
  let fixture: ComponentFixture<ZonaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let zonaFormService: ZonaFormService;
  let zonaService: ZonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ZonaUpdateComponent],
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
      .overrideTemplate(ZonaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ZonaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    zonaFormService = TestBed.inject(ZonaFormService);
    zonaService = TestBed.inject(ZonaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const zona: IZona = { id: 456 };

      activatedRoute.data = of({ zona });
      comp.ngOnInit();

      expect(comp.zona).toEqual(zona);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IZona>>();
      const zona = { id: 123 };
      jest.spyOn(zonaFormService, 'getZona').mockReturnValue(zona);
      jest.spyOn(zonaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ zona });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: zona }));
      saveSubject.complete();

      // THEN
      expect(zonaFormService.getZona).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(zonaService.update).toHaveBeenCalledWith(expect.objectContaining(zona));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IZona>>();
      const zona = { id: 123 };
      jest.spyOn(zonaFormService, 'getZona').mockReturnValue({ id: null });
      jest.spyOn(zonaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ zona: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: zona }));
      saveSubject.complete();

      // THEN
      expect(zonaFormService.getZona).toHaveBeenCalled();
      expect(zonaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IZona>>();
      const zona = { id: 123 };
      jest.spyOn(zonaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ zona });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(zonaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
