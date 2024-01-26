import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IProvincia } from 'app/entities/establecimientos/provincia/provincia.model';
import { ProvinciaService } from 'app/entities/establecimientos/provincia/service/provincia.service';
import { DistritoService } from '../service/distrito.service';
import { IDistrito } from '../distrito.model';
import { DistritoFormService } from './distrito-form.service';

import { DistritoUpdateComponent } from './distrito-update.component';

describe('Distrito Management Update Component', () => {
  let comp: DistritoUpdateComponent;
  let fixture: ComponentFixture<DistritoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let distritoFormService: DistritoFormService;
  let distritoService: DistritoService;
  let provinciaService: ProvinciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), DistritoUpdateComponent],
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
      .overrideTemplate(DistritoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DistritoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    distritoFormService = TestBed.inject(DistritoFormService);
    distritoService = TestBed.inject(DistritoService);
    provinciaService = TestBed.inject(ProvinciaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Provincia query and add missing value', () => {
      const distrito: IDistrito = { id: 456 };
      const provincia: IProvincia = { id: 11809 };
      distrito.provincia = provincia;

      const provinciaCollection: IProvincia[] = [{ id: 403 }];
      jest.spyOn(provinciaService, 'query').mockReturnValue(of(new HttpResponse({ body: provinciaCollection })));
      const additionalProvincias = [provincia];
      const expectedCollection: IProvincia[] = [...additionalProvincias, ...provinciaCollection];
      jest.spyOn(provinciaService, 'addProvinciaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ distrito });
      comp.ngOnInit();

      expect(provinciaService.query).toHaveBeenCalled();
      expect(provinciaService.addProvinciaToCollectionIfMissing).toHaveBeenCalledWith(
        provinciaCollection,
        ...additionalProvincias.map(expect.objectContaining),
      );
      expect(comp.provinciasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const distrito: IDistrito = { id: 456 };
      const provincia: IProvincia = { id: 12132 };
      distrito.provincia = provincia;

      activatedRoute.data = of({ distrito });
      comp.ngOnInit();

      expect(comp.provinciasSharedCollection).toContain(provincia);
      expect(comp.distrito).toEqual(distrito);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDistrito>>();
      const distrito = { id: 123 };
      jest.spyOn(distritoFormService, 'getDistrito').mockReturnValue(distrito);
      jest.spyOn(distritoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ distrito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: distrito }));
      saveSubject.complete();

      // THEN
      expect(distritoFormService.getDistrito).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(distritoService.update).toHaveBeenCalledWith(expect.objectContaining(distrito));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDistrito>>();
      const distrito = { id: 123 };
      jest.spyOn(distritoFormService, 'getDistrito').mockReturnValue({ id: null });
      jest.spyOn(distritoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ distrito: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: distrito }));
      saveSubject.complete();

      // THEN
      expect(distritoFormService.getDistrito).toHaveBeenCalled();
      expect(distritoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDistrito>>();
      const distrito = { id: 123 };
      jest.spyOn(distritoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ distrito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(distritoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProvincia', () => {
      it('Should forward to provinciaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(provinciaService, 'compareProvincia');
        comp.compareProvincia(entity, entity2);
        expect(provinciaService.compareProvincia).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
