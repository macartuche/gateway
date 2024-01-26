import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProvinciaTerritorioService } from '../service/provincia-territorio.service';
import { IProvinciaTerritorio } from '../provincia-territorio.model';
import { ProvinciaTerritorioFormService } from './provincia-territorio-form.service';

import { ProvinciaTerritorioUpdateComponent } from './provincia-territorio-update.component';

describe('ProvinciaTerritorio Management Update Component', () => {
  let comp: ProvinciaTerritorioUpdateComponent;
  let fixture: ComponentFixture<ProvinciaTerritorioUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let provinciaTerritorioFormService: ProvinciaTerritorioFormService;
  let provinciaTerritorioService: ProvinciaTerritorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ProvinciaTerritorioUpdateComponent],
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
      .overrideTemplate(ProvinciaTerritorioUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProvinciaTerritorioUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    provinciaTerritorioFormService = TestBed.inject(ProvinciaTerritorioFormService);
    provinciaTerritorioService = TestBed.inject(ProvinciaTerritorioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const provinciaTerritorio: IProvinciaTerritorio = { id: 456 };

      activatedRoute.data = of({ provinciaTerritorio });
      comp.ngOnInit();

      expect(comp.provinciaTerritorio).toEqual(provinciaTerritorio);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProvinciaTerritorio>>();
      const provinciaTerritorio = { id: 123 };
      jest.spyOn(provinciaTerritorioFormService, 'getProvinciaTerritorio').mockReturnValue(provinciaTerritorio);
      jest.spyOn(provinciaTerritorioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ provinciaTerritorio });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: provinciaTerritorio }));
      saveSubject.complete();

      // THEN
      expect(provinciaTerritorioFormService.getProvinciaTerritorio).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(provinciaTerritorioService.update).toHaveBeenCalledWith(expect.objectContaining(provinciaTerritorio));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProvinciaTerritorio>>();
      const provinciaTerritorio = { id: 123 };
      jest.spyOn(provinciaTerritorioFormService, 'getProvinciaTerritorio').mockReturnValue({ id: null });
      jest.spyOn(provinciaTerritorioService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ provinciaTerritorio: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: provinciaTerritorio }));
      saveSubject.complete();

      // THEN
      expect(provinciaTerritorioFormService.getProvinciaTerritorio).toHaveBeenCalled();
      expect(provinciaTerritorioService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProvinciaTerritorio>>();
      const provinciaTerritorio = { id: 123 };
      jest.spyOn(provinciaTerritorioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ provinciaTerritorio });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(provinciaTerritorioService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
